#!/usr/bin/env python
import os
import sys


HELPER_SETTINGS = {
    'INSTALLED_APPS': [
        'djangocms_text_ckeditor',
    ],
    'CMS_LANGUAGES': {
        1: [
            {
                'code': 'en',
                'name': 'English',
                'fallbacks': ['de'],
            },
            {
                'code': 'de',
                'name': 'German',
                'fallbacks': ['en'],
            },
            {
                'code': 'it',
                'name': 'Italian',
                'fallbacks': ['en'],
            },
            {
                'code': 'zh-cn',
                'name': 'Chinese Simplified',
                'fallbacks': ['en']
            },
        ],
        'default': {
            'fallbacks': ['en', 'de'],
            'redirect_on_fallback': False,
            'public': True,
            'hide_untranslated': False,
        }
    },
    'LANGUAGES': (
        ('en', 'English'),
        ('de', 'Deutsch'),
        ('it', 'Italiano'),
        ('zh-cn', 'Chinese (Simplified)'),
    ),
    'LANGUAGE_CODE': 'en',
    'ALLOWED_HOSTS': ['*'],
    'USE_TZ': True,
    'TIME_ZONE': 'Europe/Zurich',
    'PARLER_LANGUAGES': {
        1: (
            {'code': 'en', 'fallbacks': ['de']},
            {'code': 'de', 'fallbacks': ['en']},
            {'code': 'it', 'fallbacks': ['en']},
            {'code': 'zh-cn', 'fallbacks': ['en']},
        ),
        'default': {
            'fallback': 'en',
            'hide_untranslated': False,
        },
    },
    'PARLER_ENABLE_CACHING': False,
    'CMS_CACHE_DURATIONS': {
        'menus': 0,
        'content': 0,
        'permissions': 0,
    },
    'CMS_ENABLE_UPDATE_CHECK': False,
    # required for integration tests
    'LOGIN_URL': '/admin/login/?user-login=test',
    'TEMPLATE_DIRS': (
        os.path.join(
            os.path.dirname(__file__),
            'integration'
        ),
    ),
    'CMS_TEMPLATES': (
        ('fullwidth.html', 'Fullwidth'),
        ('page.html', 'Standard page'),
        ('simple.html', 'Simple page'),
    ),
}


def run():
    from app_helper import runner

    os.environ.setdefault('DATABASE_URL', 'sqlite://localhost/testdb.sqlite')

    # we use '.runner()', not '.cms()' nor '.run()' because it does not
    # add 'test' argument implicitly
    runner.runner([sys.argv[0], 'cms', '--cms', 'server', '--bind', '0.0.0.0'])


if __name__ == '__main__':
    run()
