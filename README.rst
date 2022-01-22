======================
django CMS Admin Style
======================

|pypi| |build| |coverage|

Adds pretty CSS styles for the django CMS admin interface.


.. note::

    This project is considered 3rd party (no supervision by the `django CMS Association <https://www.django-cms.org/en/about-us/>`_). Join us on `Slack                 <https://www.django-cms.org/slack/>`_ for more information.

+---------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------+
| .. image:: https://raw.githubusercontent.com/divio/djangocms-admin-style/master/preview/dashboard.png   | .. image:: https://raw.githubusercontent.com/divio/djangocms-admin-style/master/preview/listview.png   |
+---------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------+
| .. image:: https://raw.githubusercontent.com/divio/djangocms-admin-style/master/preview/datepicker.png  | .. image:: https://raw.githubusercontent.com/divio/djangocms-admin-style/master/preview/shortcuts.png  |
+---------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------+

The shortcuts you see on top of the dashboard are from `django-admin-shortcuts <https://github.com/alesdotio/django-admin-shortcuts/>`_

*******************************************
Contribute to this project and win rewards
*******************************************

Because this is a an open-source project, we welcome everyone to
`get involved in the project <https://www.django-cms.org/en/contribute/>`_ and
`receive a reward <https://www.django-cms.org/en/bounty-program/>`_ for their contribution.
Become part of a fantastic community and help us make django CMS the best CMS in the world.

We'll be delighted to receive your
feedback in the form of issues and pull requests. Before submitting your
pull request, please review our `contribution guidelines
<http://docs.django-cms.org/en/latest/contributing/index.html>`_.

We're grateful to all contributors who have helped create and maintain this package.
Contributors are listed at the `contributors <https://github.com/django-cms/djangocms-admin-style/graphs/contributors>`_
section.


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
    pip install -r tests/requirements/base.txt
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
.. |build| image:: https://travis-ci.org/django-cms/djangocms-admin-style.svg?branch=master
    :target: https://travis-ci.org/django-cms/djangocms-admin-style
.. |coverage| image:: https://codecov.io/gh/django-cms/djangocms-admin-style/branch/master/graph/badge.svg
    :target: https://codecov.io/gh/django-cms/djangocms-admin-style

.. |python| image:: https://img.shields.io/badge/python-3.5+-blue.svg
    :target: https://pypi.org/project/djangocms-admin-style/
.. |django| image:: https://img.shields.io/badge/django-2.2,%203.0,%203.1-blue.svg
    :target: https://www.djangoproject.com/
.. |djangocms| image:: https://img.shields.io/badge/django%20CMS-3.6%2B-blue.svg
    :target: https://www.django-cms.org/
