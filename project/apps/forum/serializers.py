# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from machina.core.db.models import get_model
from rest_framework import serializers

Forum = get_model('forum', 'Forum')


class ForumSerializer(serializers.ModelSerializer):
    description = serializers.SerializerMethodField()

    class Meta:
        model = Forum
        fields = [
            'id', 'name', 'slug', 'type', 'description', 'image', 'link', 'link_redirects',
            'posts_count', 'topics_count', 'link_redirects_count', 'last_post_on',
            'display_sub_forum_list', 'lft', 'rght', 'tree_id', 'level', 'parent',
        ]

    def get_description(self, obj):
        return obj.description.rendered
