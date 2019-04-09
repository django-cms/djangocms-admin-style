FROM djangocms-admin-style-test:base

RUN pip install -r /app/tests/requirements/django-1.11.txt

ENV SCREENSHOT_REFERENCES = "./tests/screenshots/reference_111"

COPY . /app
