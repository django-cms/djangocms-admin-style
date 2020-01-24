FROM python:3.6

# Pillow requirements
RUN apt-get update \
    && apt-get -y install libtiff-dev libjpeg62-turbo-dev zlib1g-dev \
    libfreetype6-dev liblcms2-dev libwebp-dev tcl8.6-dev tk8.6-dev libgif-dev

# Node setup
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential
RUN npm install -g gulp@3

# Preparing files
WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tests/requirements /app/tests/requirements

RUN npm i -f

CMD pip install -e . && gulp lint && gulp tests:integration

ENV TZ="Europe/Zurich"
