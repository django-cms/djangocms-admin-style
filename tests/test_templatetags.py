from unittest import TestCase

from django.test.client import RequestFactory


class TemplateTagsTestCase(TestCase):
    def setUp(self) -> None:
        self.request_factory = RequestFactory()

    def test_current_site_name(self):
        from djangocms_admin_style.templatetags.admin_style_tags import current_site_name
        site_name = current_site_name(dict())
        self.assertEqual(site_name, "example.com")  # Default name

    def test_render_update_notification(self):
        from djangocms_admin_style.templatetags.admin_style_tags import render_update_notification
        self.assertEqual(render_update_notification(dict()), "")  # No update notification

        from django.urls import reverse
        print(reverse("index"))
        request = self.request_factory.get("/")
        print(request.resolver_match)
        print(render_update_notification(dict(request=request)))
