# coding=utf-8
from __future__ import unicode_literals

import os
from collections import OrderedDict
from random import Random
from threading import local

from jinja2 import Environment, FileSystemLoader
from jinja2.ext import Extension
from jinja2.lexer import Token
from jinja2.utils import Markup

from config import GLOBAL_CONFIG

_thread_local = local()

# This is mocked in unit tests for deterministic behaviour
random = Random()


class JinjaSqlException(Exception):
    pass


class MissingInClauseException(JinjaSqlException):
    pass


class InvalidBindParameterException(JinjaSqlException):
    pass


class SqlExtension(Extension):

    def extract_param_name(self, tokens):
        name = ""
        for token in tokens:
            if token.test("variable_begin"):
                continue
            elif token.test("name"):
                name += token.value
            elif token.test("dot"):
                name += token.value
            else:
                break
        if not name:
            name = "bind#0"
        return name

    def filter_stream(self, stream):
        """
        We convert
        {{ some.variable | filter1 | filter 2}}
            to
        {{ some.variable | filter1 | filter 2 | bind}}

        ... for all variable declarations in the template

        This function is called by jinja2 immediately
        after the lexing stage, but before the parser is called.
        """
        while not stream.eos:
            token = next(stream)
            if token.test("variable_begin"):
                var_expr = []
                while not token.test("variable_end"):
                    var_expr.append(token)
                    token = next(stream)
                variable_end = token

                last_token = var_expr[-1]
                if (not last_token.test("name")
                        or last_token.value not in ('bind', 'any', 'sqlsafe')):
                    param_name = self.extract_param_name(var_expr)
                    # don't bind twice
                    var_expr.append(Token(10, 'pipe', u'|'))
                    var_expr.append(Token(10, 'name', u'bind'))
                    var_expr.append(Token(2, 'lparen', u'('))
                    var_expr.append(Token(10, 'string', param_name))
                    var_expr.append(Token(2, 'rparen', u')'))

                var_expr.append(variable_end)
                for token in var_expr:
                    yield token
            else:
                yield token


def sql_safe(value):
    """?????? ?????? bind_param ???????????? ???????????? ??????"""
    return Markup(value)


def bind(value, name):
    """A filter that prints %s, and stores the value
    in an array, so that it can be bound using a prepared statement

    ??? ????????? ?????? {{variable}}??? ???????????? ???????????????.
    """
    if isinstance(value, list):
        return bind_in_clause(value)
    elif isinstance(value, Markup):
        return value
    elif requires_in_clause(value):
        raise MissingInClauseException("""Got a list or tuple.
            Did you forget to apply '|any' to your query?""")
    elif is_dictionary(value):
        raise InvalidBindParameterException("""
            Got a dictionary when trying to bind parameter, expected
            a scalar value.
            """)
    else:
        return _bind_param(_thread_local.bind_params, name, value)


def ilike(str_value):
    """
    Ilike Query ????????? ??????
    """
    return '%' + str(str_value) + '%'


def bind_in_clause(value):
    values = list(value)
    results = []
    for v in values:
        results.append(_bind_param(_thread_local.bind_params, "any", v))
    return "({})".format("),(".join(results))


def _bind_param(already_bound, key, value):
    new_key = key
    while new_key in already_bound:
        new_key = "%s_%s" % (key, random.randrange(1, 1000))
    already_bound[new_key] = value

    param_style = _thread_local.param_style
    if param_style == 'qmark':
        return "?"
    elif param_style == 'format':
        return "%s"
    elif param_style == 'numeric':
        _thread_local.param_index += 1
        return ":%s" % _thread_local.param_index
    elif param_style == 'named':
        return ":%s" % new_key
    elif param_style == 'pyformat':
        return "%%(%s)s" % new_key
    else:
        raise AssertionError("Invalid param_style - %s" % param_style)


def requires_in_clause(obj):
    return isinstance(obj, (list, tuple))


def is_dictionary(obj):
    return isinstance(obj, dict)


class JinjaSql(object):
    # See PEP-249 for definition
    # qmark "where name = ?"
    # numeric "where name = :1"
    # named "where name = :name"
    # format "where name = %s"
    # pyformat "where name = %(name)s"
    VALID_PARAM_STYLES = ('qmark', 'numeric', 'named', 'format', 'pyformat')

    def __init__(self, env=None, param_style='format'):
        self.env = env or Environment(loader=FileSystemLoader(os.path.join(GLOBAL_CONFIG.CARTRAVEL_ROOT_DIR, 'query')))
        self._prepare_environment()
        self.param_style = param_style

    def _prepare_environment(self):
        self.env.autoescape = True
        self.env.add_extension(SqlExtension)
        self.env.add_extension('jinja2.ext.autoescape')
        self.env.filters["bind"] = bind
        self.env.filters["sqlsafe"] = sql_safe
        self.env.filters["ilike"] = ilike
        self.env.filters["any"] = bind_in_clause

    def prepare_query(self, source, target, data):
        template = self.env.from_string('\n-- {}\n{}'.format(
            target,
            source[target]
        ) if GLOBAL_CONFIG.PRINT_SQL else source[target])

        return self._prepare_query(template, data)

    def _prepare_query(self, template, data):
        try:
            _thread_local.bind_params = OrderedDict()
            _thread_local.param_style = self.param_style
            _thread_local.param_index = 0
            query = template.render(data)
            bind_params = _thread_local.bind_params
            if self.param_style in ('named', 'pyformat'):
                return query, bind_params
            else:
                return query, bind_params.values()
        finally:
            del _thread_local.bind_params
            del _thread_local.param_style
            del _thread_local.param_index
