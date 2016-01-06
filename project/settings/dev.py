# -*- coding:utf-8 -*-

from __future__ import unicode_literals

from .base import *  # noqa

DEBUG = True

ALLOWED_HOSTS = [
    'localhost:8000',
]

INTERNAL_IPS = (
    '127.0.0.1',
)

MIDDLEWARE_CLASSES += (
    'debug_toolbar.middleware.DebugToolbarMiddleware',
)

INSTALLED_APPS += (
    'debug_toolbar',
)

CORS_ORIGIN_ALLOW_ALL = True
