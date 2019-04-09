FROM djangocms-admin-style-test:base

RUN pip install -r /app/tests/requirements/django-2.1.txt

ENV SCREENSHOT_REFERENCES = "./tests/screenshots/reference_2"

COPY . /app
