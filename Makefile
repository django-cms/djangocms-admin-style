PORT = 8000
VERSION = 2.2


build:
	docker build -t djangocms-admin-style-test:base -f Dockerfile .

cleanup:
	rm -rf *testdb.sqlite

run:
	make cleanup
	make build
	docker build -t djangocms-admin-style-test:django-$(VERSION) -f Dockerfile.django-$(VERSION) .
	docker run -t --rm -p $(PORT):8000 -v `pwd`:/app djangocms-admin-style-test:django-$(VERSION) bash -c "pip install -r tests/requirements/django-$(VERSION).txt && python tests/settings-docker.py"

test:
	make build
	docker build -t djangocms-admin-style-test:django-$(VERSION) -f Dockerfile.django-$(VERSION) .
	docker run -t --rm -v `pwd`/tests/screenshots/django-$(VERSION):/app/tests/screenshots/results djangocms-admin-style-test:django-$(VERSION)

local:
	@echo "> The reference files in "tests/screenshots" will differ locally from the Docker version (linux)."
	@echo "> Make sure to run "npm install" using node 8 first."
	@echo ""
	make cleanup
	pip install -r tests/requirements/django-$(VERSION).txt
	pip install -e .
	export SCREENSHOT_REFERENCES="./tests/screenshots/reference-$(VERSION)"; gulp lint && gulp tests:integration
