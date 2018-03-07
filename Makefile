PORT = 8000

build:
	docker build -t djangocms-admin-style-test:base -f Dockerfile .

run18:
	make build
	docker build -t djangocms-admin-style-test:django18 -f Dockerfile.django18 .
	docker run -t --rm -p $(PORT):8000 -v `pwd`:/app djangocms-admin-style-test:django18 bash -c "pip install -r tests/requirements/django-1.8.txt && python tests/testserver.py"

run19:
	make build
	docker build -t djangocms-admin-style-test:django19 -f Dockerfile.django19 .
	docker run -t --rm -p $(PORT):8000 -v `pwd`:/app djangocms-admin-style-test:django19 bash -c "pip install -r tests/requirements/django-1.9.txt && python tests/testserver.py"

run111:
	make build
	docker build -t djangocms-admin-style-test:django111 -f Dockerfile.django111 .
	docker run -t --rm -p $(PORT):8000 -v `pwd`:/app djangocms-admin-style-test:django111 bash -c "pip install -r tests/requirements/django-1.11.txt && python tests/testserver.py"

test18:
	make build
	docker build -t djangocms-admin-style-test:django18 -f Dockerfile.django18 .
	docker run -t --rm -v `pwd`/tests/screenshots/django18:/app/tests/screenshots/results djangocms-admin-style-test:django18

test19:
	make build
	docker build -t djangocms-admin-style-test:django19 -f Dockerfile.django19 .
	docker run -t --rm -v `pwd`/tests/screenshots/django19:/app/tests/screenshots/results djangocms-admin-style-test:django19

test111:
	make build
	docker build -t djangocms-admin-style-test:django111 -f Dockerfile.django111 .
	docker run -t --rm -v `pwd`/tests/screenshots/django111:/app/tests/screenshots/results djangocms-admin-style-test:django111
