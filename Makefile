##### VARIABLES
ENV18 = env-18
ENV19 = env-19
VENV18 = $(ENV18)/bin/activate
VENV19 = $(ENV19)/bin/activate
PYTHON18 = $(ENV18)/bin/python
PYTHON19 = $(ENV19)/bin/python
PIP18 = $(ENV18)/bin/pip
PIP19 = $(ENV19)/bin/pip

##### REQUIRED COMMANDS
##### https://github.com/divio/divio-architect
##### You need to be within the repository for excecution

install18:
	##### create virtualenv
	. $(VENV18) || virtualenv $(ENV18) --prompt="(`basename \`pwd\``)"
	##### install requirements
	. $(VENV18); $(PIP18) install -r test_requirements/django-1.8.txt
	npm install
	. $(VENV18); $(PIP18) install -e .

install19:
	##### create virtualenvmake run19
	$(VENV19) || virtualenv $(ENV19) --prompt="(`basename \`pwd\``)"
	##### install requirements
	. $(VENV19); $(PIP19) install -r test_requirements/django-1.9.txt
	npm install
	. $(VENV19); $(PIP19) install -e .

run18:
	. $(VENV18); $(PYTHON18) testserver.py

run19:
	. $(VENV19); $(PYTHON19) testserver.py

test18:
	. $(VENV18); gulp test

test18:
	. $(VENV19); gulp test
