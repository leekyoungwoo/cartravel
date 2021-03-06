# coding=utf-8
import os


class Config:

    VERSION = '0.1.1'
    API_VERSION = '0.1.1'

    DUPLICATE_LOGIN = True

    BABEL_TRANSLATION_DIRECTORIES = 'i18n'

    SECRET_KEY = 'asldkhaslkfhalhf@ O@#TRNO@!#NTRONI O@#TRIN#OITN'
    SECURITY_PASSWORD_SALT = 'ssrinc!123qpxkepah!123'
    DATE_FORMAT = '%Y-%m-%d %H:%M:%S'

    DB_NAME = 'cartraveldb'
    DB_USER = 'cartraveladmin'
    DB_PASS = 'inq!123'
    DB_HOST = 'localhost'
    DB_PORT = '5432'

    HOST = '0.0.0.0'
    PORT = 5000

    CARTRAVEL_ROOT_DIR = '/CARTRAVEL/api'
    FILE_ROOT_DIR = '/CARTRAVEL/fdata'

    SWAGGER = {
        'title': 'CARTRAVEL API',
        'uiversion': 2,
        'version': API_VERSION,
        'description': '공개용 CARTRAVEL API',
    }

    SWAGGER_CONFIG = {
        "headers": [
        ],
        "specs": [
            {
                "endpoint": 'api',
                "route": '/api/api.json',
                "rule_filter": lambda rule: True,  # all in
                "model_filter": lambda tag: True,  # all in
            }
        ],
        "static_url_path": "/api/static",
        "specs_route": "/api/docs"
    }

    # 기본 업로드 허용 크기 10MB
    MAX_CONTENT_LENGTH = 1024 * 1024 * 10

    BLOCK_IP_LIST = ['211.249.40.2']
    BLOCK_AGENT_LIST = ['carbon']


class DevelopmentConfig(Config):
    DEBUG = True
    PRINT_SQL = True
    CARTRAVEL_ROOT_DIR = 'C:\\workspace\\cartravel\\api\\src'
    # FILE_ROOT_DIR = 'C:\\workspace\\cartravel\\fdata'
    FILE_ROOT_DIR = 'D:\\fdata'


class ProductionConfig(Config):
    DEBUG = False
    PRINT_SQL = False
    SESSION_COOKIE_SECURE = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    LOG_FILE_PATH = '/var/log/cartravel/api.log'


CONFIG = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': ProductionConfig
}

if os.environ.get('CARTRAVEL_MOD') == 'development':
    GLOBAL_CONFIG = CONFIG['development']
else:
    GLOBAL_CONFIG = CONFIG['production']
