PORT = 8000

build:
	docker build -t djangocms-admin-style-test:base -f Dockerfile .

# Django 1.11
run111:
	make build
	docker build -t djangocms-admin-style-test:django111 -f Dockerfile.django111 .
	docker run -t --rm -p $(PORT):8000 -v `pwd`:/app djangocms-admin-style-test:django111 bash -c "pip install -r tests/requirements/django-1.11.txt && python tests/settings-docker.py"

test111:
	make build
	docker build -t djangocms-admin-style-test:django111 -f Dockerfile.django111 .
	docker run -t --rm -v `pwd`/tests/screenshots/django111:/app/tests/screenshots/results djangocms-admin-style-test:django111

# Django 2.1
run21:
	make build
	docker build -t djangocms-admin-style-test:django21 -f Dockerfile.django21 .
	docker run -t --rm -p $(PORT):8000 -v `pwd`:/app djangocms-admin-style-test:django21 bash -c "pip install -r tests/requirements/django-2.1.txt && python tests/settings-docker.py"

test21:
	make build
	docker build -t djangocms-admin-style-test:django21 -f Dockerfile.django21 .
	docker run -t --rm -v `pwd`/tests/screenshots/django21:/app/tests/screenshots/results djangocms-admin-style-test:django21

# Django 2.2
run22:
	make build
	docker build -t djangocms-admin-style-test:django22 -f Dockerfile.django22 .
	docker run -t --rm -p $(PORT):8000 -v `pwd`:/app djangocms-admin-style-test:django22 bash -c "pip install -r tests/requirements/django-2.2.txt && python tests/settings-docker.py"

test22:
	make build
	docker build -t djangocms-admin-style-test:django22 -f Dockerfile.django22 .
	docker run -t --rm -v `pwd`/tests/screenshots/django22:/app/tests/screenshots/results djangocms-admin-style-test:django22
