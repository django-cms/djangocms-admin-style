FROM python:3.8.12

# Pillow requirements
RUN apt-get update \
    && apt-get -y install libtiff5-dev libjpeg62-turbo-dev zlib1g-dev \
    libfreetype6-dev liblcms2-dev libwebp-dev tcl8.6-dev tk8.6-dev \
    build-essential

# Node setup
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt install -y nodejs
RUN npm install -g gulp@4

# Preparing files
WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tests/requirements /app/tests/requirements

RUN npm install

CMD pip install -e . && gulp lint && gulp tests:integration

ENV TZ="Europe/Zurich"
