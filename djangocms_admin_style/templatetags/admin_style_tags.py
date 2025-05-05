from django import template
from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.template.defaultfilters import conditional_escape
from django.template.loader import render_to_string
from django.utils.translation import gettext

# We follow the Semantic versioning convention
# minor - Refers to the minor release track (3.x.1)
# patch - Refers to the patch release track (3.4.x)
VALID_VERSION_CHECK_TYPES = ("minor", "patch")

register = template.Library()


@register.simple_tag(takes_context=True)
def current_site_name(context):
    request = context.get("request")

    try:
        site_name = get_current_site(request).name
    except AttributeError:
        # This happens if request is None
        # and sites framework is not in INSTALLED_APPS
        site_name = gettext("my site")
    return conditional_escape(site_name)


@register.simple_tag(takes_context=True)
def render_update_notification(context):
    try:
        import cms
    except ImportError:  # pragma: no cover
        check_type = None
        notifications_enabled = False
    else:
        check_type = getattr(settings, "CMS_UPDATE_CHECK_TYPE", "patch")
        notifications_enabled = getattr(settings, "CMS_ENABLE_UPDATE_CHECK", True)

    request = context.get("request")

    try:
        index_page = request.resolver_match.url_name == "index"
    except AttributeError:
        notifications_enabled = False
    else:
        notifications_enabled = index_page and notifications_enabled

    if notifications_enabled and check_type in VALID_VERSION_CHECK_TYPES:
        context = {
            "cms_version": cms.__version__,
            "cms_version_check_type": check_type,
        }
        return render_to_string("admin/inc/cms_upgrade_notification.html", context)
    return ""
