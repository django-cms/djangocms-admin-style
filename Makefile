PORT = 8000

build:
	docker build -t djangocms-admin-style-test:base -f Dockerfile .

run18:
	make build
	docker build -t djangocms-admin-style-test:django18 -f Dockerfile.django18 .
	docker run -t --rm -p $(PORT):8000 -v `pwd`:/app djangocms-admin-style-test:django18 bash -c "pip install -r test_requirements/django-1.8.txt && python testserver.py"

run19:
	make build
	docker build -t djangocms-admin-style-test:django19 -f Dockerfile.django19 .
	docker run -t --rm -p $(PORT):8000 -v `pwd`:/app djangocms-admin-style-test:django19 bash -c "pip install -r test_requirements/django-1.9.txt && python testserver.py"

test18:
	make build
	docker build -t djangocms-admin-style-test:django18 -f Dockerfile.django18 .
	docker run -t --rm -v `pwd`/screenshots-django18:/app/screenshots/results djangocms-admin-style-test:django18

test19:
	make build
	docker build -t djangocms-admin-style-test:django19 -f Dockerfile.django19 .
	docker run -t --rm -v `pwd`/screenshots-django19:/app/screenshots/results djangocms-admin-style-test:django19
