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
