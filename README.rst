======================
django CMS Admin Style
======================

Adds pretty CSS styles for the django CMS admin interface.

.. image:: https://cloud.githubusercontent.com/assets/2270884/10393234/5951554e-6e8e-11e5-9451-86bf8aa198ab.png

.. image:: https://cloud.githubusercontent.com/assets/2270884/10393235/59520ca0-6e8e-11e5-9c6d-2c9664358e26.png

.. image:: https://cloud.githubusercontent.com/assets/2270884/10393233/59478ff0-6e8e-11e5-9db6-9368423dcad5.png

.. image:: https://cloud.githubusercontent.com/assets/2270884/10393231/5933d24e-6e8e-11e5-8f06-ef14bd6c0388.png


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
