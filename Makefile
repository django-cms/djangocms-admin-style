build:
	docker build -t djangocms-admin-style-test:base -f Dockerfile .

test18:
	make build
	docker build -t djangocms-admin-style-test:django18 -f Dockerfile.django18 .
	docker run -t --rm -v `pwd`/screenshots-django18:/app/screenshots/results djangocms-admin-style-test:django18

test19:
	make build
	docker build -t djangocms-admin-style-test:django19 -f Dockerfile.django19 .
	docker run -t --rm -v `pwd`/screenshots-django19:/app/screenshots/results djangocms-admin-style-test:django19
