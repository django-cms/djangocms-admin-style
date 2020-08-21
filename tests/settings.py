#!/usr/bin/env python
HELPER_SETTINGS = {
    'INSTALLED_APPS': [
        'djangocms_text_ckeditor',
    ],
    'CMS_LANGUAGES': {
        1: [{
            'code': 'en',
            'name': 'English',
        }]
    },
    'LANGUAGE_CODE': 'en',
    'ALLOWED_HOSTS': ['*'],
}


def run():
    from app_helper import runner
    runner.cms('djangocms_admin_style')


if __name__ == '__main__':
    run()
