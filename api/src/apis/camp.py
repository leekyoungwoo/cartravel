# coding=utf-8
import hashlib

from flask import g, current_app
from flask_babel import gettext
from flask_restful import Resource
from passlib.apps import custom_app_context as pwd_context

from util import use_db, use_p, make_response, str_to_snakecase, make_sort_query, keys_to_snakecase

from apis import SQL
from db import QUERY


class Camp(Resource):
    MAIN_CLASS = True

    def __init__(self):
        self.db = use_db()
        self.p = use_p()

    def get(self):
        p = self.p
        sort_filter = [
            'first_image_url',
            'createdtime'
        ]

        params = {
            'sort_sql': make_sort_query(p['sort'] if 'sort' in p and p['sort'] else [], sort_filter,
                                      str_to_snakecase(sort_filter[0])),
            'filter_dic': p['filter'] if 'filter' in p and p['filter'] else {},
            **keys_to_snakecase(p)
        }
        if 'zoom' in p and p['zoom'] < 9:
            sql, bind_param = SQL.prepare_query(QUERY['camp.yaml'], '행정구역별 조회', params)

        elif 'zoom' in p and p['zoom'] < 10:
            sql, bind_param = SQL.prepare_query(QUERY['camp.yaml'], '시군구별 조회', params)

        else:
            sql, bind_param = SQL.prepare_query(QUERY['camp.yaml'], '캠핑장 조회', params)

        ret = self.db.query(sql, bind_param)

        return make_response(200, ret)
        # params = dict()
        # params['user_no'] = g.user['userNo']
        # if 'userEmail' not in p and 'userPasswd' not in p:
        #     return make_response(200, error=[{'errInfo': 'No Parameter'}])

        # if 'userEmail' in p and p['userEmail']:
        #     params['user_email'] = p['userEmail']
        #     # 중복 유저 체크
        #     sql, bind_param = SQL.prepare_query(QUERY['admin.yaml'], '중복 유저 체크', params)
        #     user = self.db.query_one(sql, bind_param)

        #     if user:
        #         return make_response(200, error=[{'result': 'Duplicate User Exist'}])

        # if current_app.config['IS_GS']:
        #     pwd = hashlib.sha512(str(str(g.user['userNo']) + p['userPasswd']).encode('utf-8')).hexdigest()
        # else:
        #     pwd = pwd_context.hash(
        #         str(g.user['userNo']) + p['userPasswd'])

        # res = self.db.update('admin_info', {
        #     'user_email': p['userEmail'],
        #     'user_passwd': pwd,
        # }, where={'user_no': g.user['userNo']}, returning='user_no, user_name')