======================
django CMS Admin Style
======================

Adds pretty CSS styles for the django CMS admin interface.

.. image:: https://raw.github.com/divio/djangocms-admin-style/gh-pages/images/img1.png

.. image:: https://raw.github.com/divio/djangocms-admin-style/gh-pages/images/img3.png

* the shortcuts you see on top of the dashboard are from `django-admin-shortcuts <https://github.com/alesdotio/django-admin-shortcuts/>`_

Installation
============

* add ``'djangocms_admin_style'`` to your INSTALLED_APPS just before ``'django.contrib.admin'``


Customization
=============

The django CMS Admin Style overrides django admin's ``base_site.html``, but you can still partially customize this page.
Look at the source of ``templates/admin/base_site.html`` and override the templates that are included in various blocks.
For example, you can add your own CSS in ``templates/admin/extrastyle.html``.

Adding a logo or custom HTML for branding
-----------------------------------------

This is optional, but if you like to replace the "Django administration" text by a customer's logo in the admin's 
header just define ``ADMIN_STYLE_BRANDING`` in your project's settings.py and add 
``djangocms_admin_style.context_processors.admin_style_branding`` to the ``TEMPLATE_CONTEXT_PROCESSORS``.
``ADMIN_STYLE_BRANDING`` must be valid HTML, for example ``<img src="media.tld.com/my-company-logo.png">`` or ``<h1 id="site-name">My Company Ltd.</h1>``.
While rendering, the text will be marked as safe. 

Compiling CSS
=============

* Command line

::

    compass watch .


* for compiling the sass file, you need to ``gem install compass`` or use CodeKit / ScoutApp
