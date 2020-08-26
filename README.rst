======================
django CMS Admin Style
======================

|pypi| |build| |coverage|

Adds pretty CSS styles for the django CMS admin interface.

+---------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------+
| .. image:: https://raw.githubusercontent.com/divio/djangocms-admin-style/master/preview/dashboard.png   | .. image:: https://raw.githubusercontent.com/divio/djangocms-admin-style/master/preview/listview.png   |
+---------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------+
| .. image:: https://raw.githubusercontent.com/divio/djangocms-admin-style/master/preview/datepicker.png  | .. image:: https://raw.githubusercontent.com/divio/djangocms-admin-style/master/preview/shortcuts.png  |
+---------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------+

The shortcuts you see on top of the dashboard are from `django-admin-shortcuts <https://github.com/alesdotio/django-admin-shortcuts/>`_


Contributing
============

This is a an open-source project. We'll be delighted to receive your
feedback in the form of issues and pull requests. Before submitting your
pull request, please review our `contribution guidelines
<http://docs.django-cms.org/en/latest/contributing/index.html>`_.

We're grateful to all contributors who have helped create and maintain this package.
Contributors are listed at the `contributors <https://github.com/divio/djangocms-admin-style/graphs/contributors>`_
section.

One of the easiest contributions you can make is helping to translate this addon on
`Transifex <https://www.transifex.com/projects/p/djangocms-admin-style/>`_.


Documentation
=============

See ``REQUIREMENTS`` in the `setup.py <https://github.com/divio/djangocms-admin-style/blob/master/setup.py>`_
file for additional dependencies:

|python| |django| |djangocms|


Installation
------------

For a manual install:

* run ``pip install djangocms-admin-style``
* add ``djangocms_admin_style`` to your ``INSTALLED_APPS`` just before ``'django.contrib.admin'``
* run ``python manage.py migrate djangocms_admin_style``


Configuration
-------------

The django CMS Admin Style overrides django admin's ``base_site.html``,
but you can still partially customize this page. Look at the source of
``templates/admin/base_site.html`` and override the templates that are included
in various blocks. For example, you can add your own CSS in
``templates/admin/inc/extrastyle.html``.

The following additional settings can be set:

* ``CMS_ENABLE_UPDATE_CHECK = True``
  Set to ``False`` to disable the update notification.
* ``CMS_UPDATE_CHECK_TYPE = ('minor')``
  Set to ``('patch')`` to get only patch notifications.
  (minor = 3.x.x, patch = 3.4.x)

The update checker does not gather or record any data.

To **compile CSS** run the following commands using **node 8**:

* ``npm install``
* ``gulp``

For further options have a look at the ``gulpfile.js``.


Running Tests
-------------

You can run tests by executing::

    virtualenv env
    source env/bin/activate
    pip install -r tests/base.txt
    python setup.py test

In order to run **integration tests** you need to have Docker installed,
then run the following command::

    make test

To test other Django versions simply append `VERSION=3.1``. You can also
run the test server through::

    make run

The integration tests are written using Casperjs, phantomcss and
djangocms-casper-helpers.


.. |pypi| image:: https://badge.fury.io/py/djangocms-admin-style.svg
    :target: http://badge.fury.io/py/djangocms-admin-style
.. |build| image:: https://travis-ci.org/divio/djangocms-admin-style.svg?branch=master
    :target: https://travis-ci.org/divio/djangocms-admin-style
.. |coverage| image:: https://codecov.io/gh/divio/djangocms-admin-style/branch/master/graph/badge.svg
    :target: https://codecov.io/gh/divio/djangocms-admin-style

.. |python| image:: https://img.shields.io/badge/python-3.5+-blue.svg
    :target: https://pypi.org/project/djangocms-admin-style/
.. |django| image:: https://img.shields.io/badge/django-2.2,%203.0,%203.1-blue.svg
    :target: https://www.djangoproject.com/
.. |djangocms| image:: https://img.shields.io/badge/django%20CMS-3.6%2B-blue.svg
    :target: https://www.django-cms.org/
