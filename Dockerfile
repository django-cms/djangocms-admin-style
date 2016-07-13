FROM ubuntu:14.04

ENV nodejs=0.12.7

RUN apt-get -y update && apt-get -y install \
        curl \
        libfreetype6 \
        libfontconfig \
        rlwrap \
        python \
        python-pip \
        git \
        # aldryn-jobs deps
        libxml2-dev libxslt-dev \
        # pillow deps
        libtiff5-dev libjpeg8-dev zlib1g-dev libfreetype6-dev liblcms2-dev libwebp-dev tcl8.6-dev tk8.6-dev python-tk python-dev && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN curl -s -o nodejs.deb https://deb.nodesource.com/node_0.12/pool/main/n/nodejs/nodejs_${nodejs}-1nodesource1~$(lsb_release -cs)1_amd64.deb && \
    dpkg -i nodejs.deb && \
    rm nodejs.deb

RUN npm install -g gulp@3
ADD ./package.json /app/package.json
WORKDIR /app
RUN npm install

ADD ./test_requirements /app/test_requirements

CMD pip install -e . && gulp lint && gulp tests:integration
