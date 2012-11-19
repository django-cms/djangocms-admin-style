======================
django CMS Admin Style
======================

Adds pretty CSS styles for the django CMS admin interface.

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

    sass --watch djangocms_admin_style/sass/:djangocms_admin_style/static/djangocms_admin_style/css/ --style compact


* If you keep getting this http://stackoverflow.com/questions/8723475/compass-add-compact-to-css-files try using something like ScoutApp.