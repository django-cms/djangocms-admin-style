from setuptools import setup, find_packages
import os
import djangocms_admin_style

CLASSIFIERS = [
    'Environment :: Web Environment',
    'Framework :: Django',
    'Intended Audience :: Developers',
    'License :: OSI Approved :: BSD License',
    'Operating System :: OS Independent',
    'Programming Language :: Python',
    'Programming Language :: Python :: 2',
    'Programming Language :: Python :: 3',
    'Topic :: Software Development :: Libraries :: Application Frameworks',
    'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
]

setup(
    author="Ales Kocjancic",
    author_email="alesdotio@gmail.com",
    name='djangocms-admin-style',
    version=djangocms_admin_style.__version__,
    description='Adds pretty CSS styles for the django CMS admin interface.',
    long_description=open(os.path.join(os.path.dirname(__file__), 'README.rst')).read(),
    url='http://www.django-cms.org/',
    license='BSD License',
    platforms=['OS Independent'],
    classifiers=CLASSIFIERS,
    install_requires=[],
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
)

