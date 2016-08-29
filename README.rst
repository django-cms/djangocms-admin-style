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


Settings
========

* ``CMS_ENABLE_UPDATE_CHECK = True``
  Set to ``False`` to disable the update notification.
* ``CMS_UPDATE_CHECK_TYPE = ('minor')``
  Set to ``('patch')`` to get only patch notifications.
  (minor = 3.x.x, patch = 3.4.x)


Compiling CSS
=============

* Command line

::

    gulp


* for compiling the sass file, you need to ``npm install``


Integration tests
=================

In order to run integration tests you need to have Docker installed.
They can be run using `make test18` and `make test19` commands for Django 1.8
and Django 1.9. The integration tests are written using Casperjs, phantomcss and
djangocms-casper-helpers.
