# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.shortcuts import get_object_or_404
from machina.core.db.models import get_model
from rest_framework.generics import ListAPIView

from project.apps.forum import serializers

Forum = get_model('forum', 'Forum')


class ForumListAPIView(ListAPIView):
    paginate_by = None
    serializer_class = serializers.ForumSerializer

    def get_queryset(self):
        parent_forum_pk = self.kwargs.get('parent_id', None)
        parent_forum = get_object_or_404(Forum, pk=parent_forum_pk) if parent_forum_pk else None
        return self.request.forum_permission_handler.forum_list_filter(
            Forum.objects.displayable_subforums(start_from=parent_forum), self.request.user)
