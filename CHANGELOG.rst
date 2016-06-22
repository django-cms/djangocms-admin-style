CHANGELOG
=========

1.2.3 (2016-06-22)
------------------

* Added css regression tests framework
* Fixed an issue with datetime fields being displayed incorrectly (#347)
* Fixed a bug with related-widget add/change buttons inside changelist (#348)
* Fixed an issue with login screen on Django 1.9
* Fixed an issue with calendar display in Django 1.9
* Fixed inline grouped field with
* Synced translations with Transifex

1.2.2 (2016-05-25)
------------------

* Fixed drag'n'drop on sortedm2m on touch devices
* Fixed mispositioned elements on tablets

1.2.0 (2016-05-19)
------------------

* Fix missing border under copy permissions text & paddings/margins of the buttons
* Fix breadcrumbs position when cms debug bar is present
* Fix "take me back" button on delete confirmations
* Added frontend integration tests (written with Casper JS)

1.1.1 (2016-04-26)
------------------

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
------------------

* Fix django 1.9 style changes
* Fix selector chooser on mobile view because of django 1.9 style changes
* Fix date and calendar shortcuts because of 1.9 style changes
* Fix h1 styles because of 1.9 style changes
* Resets horizontal form fields to groups
* Removes unnecessary icon files from filer and moves js into static/djangocms_admin_style folder

1.0.9 (2016-01-28)
------------------

* Fix that link doesn't break to newline after sortedm2m label
* Fix changelist paginator font size
* Remove admin menu link hover
* Fix related widget wrapper link size
* Fix checkbox-row if first child
* Remove input clear on every input for IE
* Fix add-another button size on advanced settings

1.0.8 (2016-01-05)
------------------

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
------------------

* Fix login password field
* Enable sourcemaps generation when using --debug param on Gulp
* Fix restore cancel link height
* Fix image upload clearer image size
* Adds max height on filtered lists and filters to make it more usable for very long lists
* Adds translations

1.0.6 (2015-11-19)
------------------

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
------------------

* Fix multiselect height
* Fix login screen
* Fix icon position in pagetree
* Fix showing widget icons on file, folder and image fields
* Fix header and header button default text
* Fix link/button plugin font color, button sizes and spaces

1.0.4 (2015-11-04)
------------------

* Fix ``extrastyle.html`` link in README.rst
* Fix modal display in django CMS <= 3.1
* Fix multiple select showing dropdown icon
* Fix magnifier icon in django-filer for files
* Fix box-shadow on buttons
* Fix Advance and Basic button styling
* Fix limit search checkbox on filer

1.0.3 (2015-11-04)
------------------

* Internal release

1.0.2 (2015-11-04)
------------------

* Fix icon sizes being to large on the pagetree

1.0.1 (2015-11-03)
------------------

* Fix button and error messages in Django 1.6

1.0.0 (2015-11-03)
------------------

* Comprehensive visual overhaul with emphasis on supporting touch-devices
* New header markup on branding.html template.
