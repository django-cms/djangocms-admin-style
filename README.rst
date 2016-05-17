======================
django CMS Admin Style
======================

Adds pretty CSS styles for the django CMS admin interface.

+-----------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------+
| .. image:: https://raw.githubusercontent.com/divio/djangocms-admin-style/master/djangocms_admin_style/static/preview_images/admin-style-1.png | .. image:: https://raw.githubusercontent.com/divio/djangocms-admin-style/master/djangocms_admin_style/static/preview_images/admin-style-2.png |
+-----------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------+
| .. image:: https://raw.githubusercontent.com/divio/djangocms-admin-style/master/djangocms_admin_style/static/preview_images/admin-style-3.png | .. image:: https://raw.githubusercontent.com/divio/djangocms-admin-style/master/djangocms_admin_style/static/preview_images/admin-style-4.png |
+-----------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------+


* the shortcuts you see on top of the dashboard are from `django-admin-shortcuts <https://github.com/alesdotio/django-admin-shortcuts/>`_

Installation
============

* add ``'djangocms_admin_style'`` to your INSTALLED_APPS just before ``'django.contrib.admin'``


Customization
=============

The django CMS Admin Style overrides django admin's ``base_site.html``, but you can still partially customize this page.
Look at the source of ``templates/admin/base_site.html`` and override the templates that are included in various blocks.
For example, you can add your own CSS in ``templates/admin/inc/extrastyle.html``.


Compiling CSS
=============

* Command line

::

    gulp


* for compiling the sass file, you need to ``npm install``


Integration tests
=================

In order to run integration tests you’ll have to install the testing infrastructure for djangocms admin style.
All commands should be run from the root of the repository.

There are Django version 1.8 and 1.9 provided.

To install 1.8 infrastructure please run ``make install18`` and for 1.9 ``make install19``

After this is done you could run tests with following command ``gulp tests``
Or if you want to run a separate test run ``gulp tests:integration --tests=loginAdmin``
And if you have to clean the database up from your ghost server run ``--clean`` with your test to clean up the database

If you do not have virtualenv yet, create and activate it first:

For Django 1.8 setup  ``. env-18/bin/activate`` and for Django 1.9 setup ``. env-19/bin/activate``
