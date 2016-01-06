# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.conf import settings
from django.conf.urls import include
from django.conf.urls import url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django_markdown import urls as django_markdown_urls
from machina.app import board


# Admin autodiscover
admin.autodiscover()

# Patterns
urlpatterns = [
    # Admin
    url(r'^' + settings.ADMIN_URL, include(admin.site.urls)),
    url('^markdown/', include(django_markdown_urls)),

    # JWT authentication
    url(r'^api-token-auth/', 'rest_framework_jwt.views.obtain_jwt_token', name='jwt-signin'),

    # Forum board
    url(r'', include(board.urls)),
]

# In DEBUG mode, serve media files through Django.
if settings.DEBUG:
    from django.views.static import serve
    urlpatterns += staticfiles_urlpatterns()
    # Remove leading and trailing slashes so the regex matches.
    media_url = settings.MEDIA_URL.lstrip('/').rstrip('/')
    urlpatterns += [
        url(r'^%s/(?P<path>.*)$' % media_url, serve, {'document_root': settings.MEDIA_ROOT}),
    ]
