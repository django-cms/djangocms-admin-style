=========
Changelog
=========


2.0.0 (2020-08-26)
==================

* Added support for Django 3.1
* Dropped support for Python 2.7 and Python 3.4
* Dropped support for Django < 2.2
* Changed ``field-box`` class declarations to ``fieldBox``
* Fixed screenshot tests for Django 2.2 and higher


1.5.0 (2020-01-24)
==================

* Added support for Django 3.0
* Added support for Python 3.8


1.4.0 (2019-04-15)
==================

* Introduced support for Django 2.2 and django CMS 3.7
* Removed support for Django 2.0
* Extended test matrix
* Fixed screenshot tests for Django 2.1 and higher
* Added new classifiers


1.3.0 (2019-01-23)
==================

* Added support for Django 1.11, 2.0 and 2.1
* Removed support for Django 1.8, 1.9
* Adapted testing infrastructure (tox/travis) to incorporate
  django CMS 3.5 and 3.6
* Added isort and adapted imports
* Adapted code base to align with other supported addons


1.2.9 (2018-10-31)
==================

* Fixed a bug where it was possible to submit the same form multiple times


1.2.8 (2018-04-10)
==================

* Added styles for buttons in submit row
* Fixed multiple UI issues with Django 1.11


1.2.7 (2017-04-19)
==================

* Adjusted styles of the new version of django-select2
* Fixes display issues when using django-nested-admin
* Moved testing infrastructure to a centralised location ``/tests``
* Removed object tools background and shadow in modal windows
* Fixed size of "unknown" state icon
* Fixed an issue with tabular inlines restricting the size of <select>


1.2.6 (2016-10-24)
==================

* Fixed an issue with related-widget-links display after filer widgets
* Fixed an issue with related-widget-links when only change link was showing up
  after selects


1.2.5 (2016-10-04)
==================

* Fixed string representation in the tabular inline
* Fixed a regression which caused an error if the
  ``django.core.context_processors.request`` context processor was not configured.
* Fixed a potential security issue if the ``Site.name`` field contains malicious code.


1.2.4 (2016-09-15)
==================

* Fixes input and textarea fields in not aligned inline groups
* Fixes select field width in table
* Added missing labels to datetime fields that are already part of the field box
* Fixes the "Open my site" button in admin views to use Site name
* Set different width for related widget wrapper select field depending on amount of links
* Fixed file inputs appearance in Firefox
* Fixed an issue with oversized table headers
* Fixed an issue with sortable tables
* Fixed an issue with datetime fields
* Fixed an issue with long names and smaller screens in change list
* Fixed an issue with related widget wrappers and selects inside of tables
* Added single js bundle vs many small javascript files


1.2.3 (2016-06-22)
==================

* Added css regression tests framework
* Fixed an issue with datetime fields being displayed incorrectly (#347)
* Fixed a bug with related-widget add/change buttons inside changelist (#348)
* Fixed an issue with login screen on Django 1.9
* Fixed an issue with calendar display in Django 1.9
* Fixed inline grouped field with
* Synced translations with Transifex


1.2.2 (2016-05-25)
==================

* Fixed drag'n'drop on sortedm2m on touch devices
* Fixed mispositioned elements on tablets


1.2.0 (2016-05-19)
==================

* Fix missing border under copy permissions text & paddings/margins of the buttons
* Fix breadcrumbs position when cms debug bar is present
* Fix "take me back" button on delete confirmations
* Added frontend integration tests (written with Casper JS)


1.1.1 (2016-04-26)
==================

* Adds cancel link to delete confirmation page
* Adds documentation link to dropdown
* Fix hidden ckeditor toolbar under the django cms main toolbar
* Floats related widget wrapper links next to select field
* Fix cropped input text
* Adds djangocms-admin-style class to body
* Floats calendar and date pickers next to input field
* Floats calendar and date fields in modal
* Removes disabled action button border
* Adds highlighted area to error messages


1.1.0 (2016-02-01)
==================

* Fix django 1.9 style changes
* Fix selector chooser on mobile view because of django 1.9 style changes
* Fix date and calendar shortcuts because of 1.9 style changes
* Fix h1 styles because of 1.9 style changes
* Resets horizontal form fields to groups
* Removes unnecessary icon files from filer and moves js into static/djangocms_admin_style folder


1.0.9 (2016-01-28)
==================

* Fix that link doesn't break to newline after sortedm2m label
* Fix changelist paginator font size
* Remove admin menu link hover
* Fix related widget wrapper link size
* Fix checkbox-row if first child
* Remove input clear on every input for IE
* Fix add-another button size on advanced settings


1.0.8 (2016-01-05)
==================

* Fix file upload field in file plugin
* Resets input field background color for dark system
* Fix filer clear button size
* Adapt dashboard link color for better visibility
* Fix sortedm2m label and link alignment on firefox
* Fix sortedm2m list width on mobile
* Align sortedm2m label if it breaks to new line
* Remove sortedm2m vertical scrollbar and show full list content
* Fix changelist if no admin actions are visible
* Fix related widget wrapper list styles


1.0.7 (2015-12-03)
==================

* Fix login password field
* Enable sourcemaps generation when using --debug param on Gulp
* Fix restore cancel link height
* Fix image upload clearer image size
* Adds max height on filtered lists and filters to make it more usable for very long lists
* Adds translations


1.0.6 (2015-11-19)
==================

* Fix hover and selected lang link color in changelist table
* Fix paginator width in users list on sideframe
* Fix multiselect icons on mobile view
* Fix missing search icon
* Fix filter position and background color on edit page list window
* Fix calendar and time cancel link color
* Fix result list view on popup
* Fix basic and advanced link hover color
* Shows admin breadcrumbs on side frame
* Fix ui sortable handler
* Fix inline change link icon and position
* Fix required fields label style
* Fix tabular tables inline fields
* Fix add another button size on advanced page settings
* Fix tagged items delete label position
* Fix login password field


1.0.5 (2015-11-10)
==================

* Fix multiselect height
* Fix login screen
* Fix icon position in pagetree
* Fix showing widget icons on file, folder and image fields
* Fix header and header button default text
* Fix link/button plugin font color, button sizes and spaces


1.0.4 (2015-11-04)
==================

* Fix ``extrastyle.html`` link in README.rst
* Fix modal display in django CMS <= 3.1
* Fix multiple select showing dropdown icon
* Fix magnifier icon in django-filer for files
* Fix box-shadow on buttons
* Fix Advance and Basic button styling
* Fix limit search checkbox on filer


1.0.3 (2015-11-04)
==================

* Internal release


1.0.2 (2015-11-04)
==================

* Fix icon sizes being to large on the pagetree


1.0.1 (2015-11-03)
==================

* Fix button and error messages in Django 1.6


1.0.0 (2015-11-03)
==================

* Comprehensive visual overhaul with emphasis on supporting touch-devices
* New header markup on branding.html template.
