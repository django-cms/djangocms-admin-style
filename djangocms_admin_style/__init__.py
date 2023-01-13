"""
See PEP 440 (https://www.python.org/dev/peps/pep-0440/)

Release logic:
 1. Increase version number (change __version__ below).
 2. Ensure the static bundle is upto date with ``nvm use && gulp icons && gulp sass bundle``
 3. Assure that all changes have been documented in CHANGELOG.rst.
 4. In setup.py check that
   - versions from all third party packages are pinned in ``REQUIREMENTS``.
   - the list of ``CLASSIFIERS`` is up-to-date.
 5. git add djangocms_admin_style/__init__.py CHANGELOG.rst setup.py
 6. git commit -m 'Bump to {new version}'
 7. git push
 8. Assure that all tests pass on https://github.com/django-cms/djangocms-admin-style/actions
 9. Create a new release on https://github.com/django-cms/djangocms-admin-style/releases/new
10. Publish the release when ready
11. Github actions will publish the new package to pypi
"""
__version__ = '3.2.3'
