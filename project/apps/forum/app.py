# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.conf.urls import url
from machina.core.app import Application

from project.apps.forum import views


class ForumApp(Application):
    name = 'forum'

    forum_list_api_view = views.ForumListAPIView
    forum_retrieve_api_view = views.ForumRetrieveAPIView

    def get_urls(self):
        return [
            url(r'^forums/display/(?:(?P<parent_id>\d+)/)?',
                self.forum_list_api_view.as_view(), name='forum_list'),
            url(r'^forums/(?P<pk>\d+)/',
                self.forum_retrieve_api_view.as_view(), name='forum_retrieve'),
        ]


application = ForumApp()
