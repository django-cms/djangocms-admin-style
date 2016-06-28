# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django import template
from django.contrib.sites.shortcuts import get_current_site

register = template.Library()


@register.simple_tag(takes_context=True)
def current_site_name(context):
    request = context.get('request')
    site = get_current_site(request)
    return site.name
