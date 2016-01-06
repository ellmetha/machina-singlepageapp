# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from machina.core.db.models import get_model
from rest_framework.generics import ListAPIView

from project.apps.forum import serializers

Forum = get_model('forum', 'Forum')


class ForumListAPIView(ListAPIView):
    paginate_by = None
    serializer_class = serializers.ForumSerializer

    def get_queryset(self):
        return self.request.forum_permission_handler.forum_list_filter(
            Forum.objects.displayable_subforums(), self.request.user)
