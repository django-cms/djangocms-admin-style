======================
django CMS Admin Style
======================

Adds pretty CSS styles for the django CMS admin interface.

.. image:: https://cloud.githubusercontent.com/assets/2270884/10393456/533bad9c-6e90-11e5-8e01-3ec8a23f0991.png

.. image:: https://cloud.githubusercontent.com/assets/2270884/10393457/534ff0c2-6e90-11e5-9a08-a4797f9a6a04.png

.. image:: https://cloud.githubusercontent.com/assets/2270884/10393459/535b49b8-6e90-11e5-9b55-fccba1de870d.png

.. image:: https://cloud.githubusercontent.com/assets/2270884/10393458/535a84ba-6e90-11e5-99a7-0c2b615fb55a.png


* the shortcuts you see on top of the dashboard are from `django-admin-shortcuts <https://github.com/alesdotio/django-admin-shortcuts/>`_

Installation
============

* add ``'djangocms_admin_style'`` to your INSTALLED_APPS just before ``'django.contrib.admin'``


Customization
=============

The django CMS Admin Style overrides django admin's ``base_site.html``, but you can still partially customize this page.
Look at the source of ``templates/admin/base_site.html`` and override the templates that are included in various blocks.
For example, you can add your own CSS in ``templates/admin/extrastyle.html``.


Compiling CSS
=============

* Command line

::

    gulp


* for compiling the sass file, you need to ``npm install``
