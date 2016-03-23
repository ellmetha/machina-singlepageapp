# -*- coding:utf-8 -*-

from __future__ import unicode_literals
import datetime
import pathlib

from machina import get_apps as get_machina_apps
from machina import MACHINA_MAIN_STATIC_DIR

PROJECT_PATH = pathlib.Path(__file__).parents[2]

DEBUG = False
TEMPLATE_DEBUG = DEBUG

ALLOWED_HOSTS = []

SITE_ID = 1

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# In a Windows environment this must be set to your system time zone.
TIME_ZONE = 'Europe/Paris'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en'

LANGUAGES = (
    ('en', 'English'),
)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': str(PROJECT_PATH / 'machina-singlepageapp.db'),
    }
}

LOCALE_PATHS = (
    str(PROJECT_PATH / 'project' / 'locale'),
)

USE_I18N = True
USE_L10N = True
USE_TZ = True

# URL of the admin page
ADMIN_URL = 'admin/'

MEDIA_ROOT = str(PROJECT_PATH / 'public' / 'media')

MEDIA_URL = '/media/'

STATIC_ROOT = str(PROJECT_PATH / 'public' / 'static')

STATIC_URL = '/static/'

STATICFILES_DIRS = (
    MACHINA_MAIN_STATIC_DIR,
)

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

SECRET_KEY = 'dummy-key'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'OPTIONS': {
            'context_processors': [
                'django.contrib.auth.context_processors.auth',
                'django.core.context_processors.debug',
                'django.core.context_processors.i18n',
                'django.core.context_processors.media',
                'django.core.context_processors.static',
                'django.contrib.messages.context_processors.messages',
                'django.core.context_processors.request',
                # Machina
                'machina.core.context_processors.metadata',
            ],
            'loaders': [
                'django.template.loaders.filesystem.Loader',
                'django.template.loaders.app_directories.Loader',
            ]
        },
    },
]

MIDDLEWARE_CLASSES = (
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.gzip.GZipMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # Machina
    'machina.apps.forum_permission.middleware.ForumPermissionMiddleware',
)

ROOT_URLCONF = 'project.urls'

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'project.wsgi.application'

INSTALLED_APPS = [
    # Django apps
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.sitemaps',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',

    # Third party apps
    'corsheaders',
    'django_markdown',
    'haystack',
    'mptt',
    'rest_framework',
    'widget_tweaks',

    # Local apps
    'project',
] + get_machina_apps(
    [
        'project.apps.forum'
    ])

TEST_RUNNER = 'django.test.runner.DiscoverRunner'

MIGRATION_MODULES = {
    'forum': 'machina.apps.forum.migrations',
}


# Haystack settings
# --------------------------------------
HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'haystack.backends.whoosh_backend.WhooshEngine',
        'PATH': str(PROJECT_PATH / 'whoosh_index'),
    },
}


# REST Framework settings
# --------------------------------------

REST_FRAMEWORK = {
    'PAGE_SIZE': 10,
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
    ),
}


# REST Framework JWT settings
# --------------------------------------

JWT_AUTH = {
    'JWT_ENCODE_HANDLER':
    'rest_framework_jwt.utils.jwt_encode_handler',

    'JWT_DECODE_HANDLER':
    'rest_framework_jwt.utils.jwt_decode_handler',

    'JWT_PAYLOAD_HANDLER':
    'rest_framework_jwt.utils.jwt_payload_handler',

    'JWT_PAYLOAD_GET_USER_ID_HANDLER':
    'rest_framework_jwt.utils.jwt_get_user_id_from_payload_handler',

    'JWT_RESPONSE_PAYLOAD_HANDLER':
    'rest_framework_jwt.utils.jwt_response_payload_handler',

    'JWT_SECRET_KEY': SECRET_KEY,
    'JWT_ALGORITHM': 'HS256',
    'JWT_VERIFY': True,
    'JWT_VERIFY_EXPIRATION': True,
    'JWT_LEEWAY': 0,
    'JWT_EXPIRATION_DELTA': datetime.timedelta(minutes=60),
    'JWT_AUDIENCE': None,
    'JWT_ISSUER': None,

    'JWT_ALLOW_REFRESH': True,
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=7),

    'JWT_AUTH_HEADER_PREFIX': 'JWT',
}


# Specific machina settings
# --------------------------------------

# Attachment cache backend
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
    },
    'machina_attachments': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': '/tmp',
    }
}

MACHINA_DEFAULT_AUTHENTICATED_USER_FORUM_PERMISSIONS = [
    'can_see_forum',
    'can_read_forum',
    'can_start_new_topics',
    'can_reply_to_topics',
    'can_edit_own_posts',
    'can_post_without_approval',
    'can_create_polls',
    'can_vote_in_polls',
    'can_download_file',
]
