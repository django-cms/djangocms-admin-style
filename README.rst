======================
django CMS Admin Style
======================

Adds pretty CSS styles for the django CMS admin interface.

Installation
============

* add ``'cms_admin_style'`` to your INSTALLED_APPS just before ``'django.contrib.admin'``


Customization
=============

The django CMS Admin Style overrides django admin's ``base_site.html``, but you can still partially customize this page.
Look at the source of ``base_site.html`` and override the templates that are included in various blocks.
For example, you can add your own CSS in ``admin/extrastyle.html``.


Compiling CSS
=============

* Command line

::

    sass --watch cms_admin_style/sass/:cms_admin_style/static/cms/css/ --style compact


* If you keep getting this http://stackoverflow.com/questions/8723475/compass-add-compact-to-css-files try using something like ScoutApp.