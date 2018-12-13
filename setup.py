#!/usr/bin/env python
# -*- coding: utf-8 -*-
from setuptools import find_packages, setup

from djangocms_admin_style import __version__

REQUIREMENTS = []


CLASSIFIERS = [
    'Environment :: Web Environment',
    'Framework :: Django',
    'Intended Audience :: Developers',
    'License :: OSI Approved :: BSD License',
    'Operating System :: OS Independent',
    'Programming Language :: Python',
    'Programming Language :: Python :: 2',
    'Programming Language :: Python :: 3',
    'Topic :: Software Development :: Libraries :: Application Frameworks',
    'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
]


setup(
    name='djangocms-admin-style',
    version=__version__,
    description='Adds pretty CSS styles for the django CMS admin interface.',
    author='Divio AG',
    author_email='info@divio.ch',
    url='https://github.com/divio/djangocms-admin-style',
    license='BSD',
    long_description=open('README.rst').read(),
    packages=find_packages(exclude=['tests', 'preview']),
    include_package_data=True,
    zip_safe=False,
    install_requires=REQUIREMENTS,
    classifiers=CLASSIFIERS,
    test_suite='tests.settings.run',
)
