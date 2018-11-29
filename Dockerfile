FROM ubuntu:14.04

RUN apt-get -y update && apt-get -y install \
        curl \
        libfreetype6 \
        libfontconfig \
        rlwrap \
        python3 \
        python3-pip \
        python3-dev \
        git \
        # aldryn-jobs deps
        libxml2-dev libxslt-dev \
        # pillow deps
        libtiff5-dev libjpeg8-dev zlib1g-dev libfreetype6-dev liblcms2-dev libwebp-dev tcl8.6-dev tk8.6-dev python-tk && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential
RUN pip3 install --upgrade pip
RUN pip3 install --upgrade setuptools

RUN npm install -g gulp@3
ADD ./package.json /app/package.json
ADD ./package-lock.json /app/package-lock.json
WORKDIR /app
RUN npm install

ADD ./tests/requirements /app/tests/requirements

CMD pip3 install -e . && gulp lint && gulp tests:integration

ENV TZ="Europe/Zurich"
