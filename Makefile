PORT = 8000
VERSION = 2.2

build:
	docker build -t djangocms-admin-style-test:base -f Dockerfile .

run:
	make build
	docker build -t djangocms-admin-style-test:django-$(VERSION) -f Dockerfile.django-$(VERSION) .
	docker run -t --rm -p $(PORT):8000 -v `pwd`:/app djangocms-admin-style-test:django-$(VERSION) bash -c "pip install -r tests/requirements/django-$(VERSION).txt && python tests/settings-docker.py"

test:
	make build
	docker build -t djangocms-admin-style-test:django-$(VERSION) -f Dockerfile.django-$(VERSION) .
	docker run -t --rm -v `pwd`/tests/screenshots/django-$(VERSION):/app/tests/screenshots/results djangocms-admin-style-test:django-$(VERSION)
