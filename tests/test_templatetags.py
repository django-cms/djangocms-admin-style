from django.test import TestCase
from django.test.client import RequestFactory

import cms


class Object:
    pass


class TemplateTagsTestCase(TestCase):
    def setUp(self) -> None:
        self.request_factory = RequestFactory()

    def test_current_site_name(self):
        from djangocms_admin_style.templatetags.admin_style_tags import (
            current_site_name,
        )
        site_name = current_site_name(dict())
        self.assertEqual(site_name, "example.com")  # Default name

        with self.modify_settings(INSTALLED_APPS={
            'remove': [
                'django.contrib.sites',
            ],
        }):
            site_name = current_site_name(dict())
            self.assertEqual(site_name, "my site")  # Generic name

    def test_render_update_notification(self):
        from djangocms_admin_style.templatetags.admin_style_tags import (
            render_update_notification,
        )
        self.assertEqual(render_update_notification(dict()), "")  # No update notification

        request = self.request_factory.get("/")
        request.resolver_match = Object()
        request.resolver_match.url_name = "index"
        self.assertIn(f'<meta name="djangocms_version" content="{cms.__version__}">',
                      render_update_notification(dict(request=request)))
