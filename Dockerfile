#Each line in our Dockerfile will generate an image layer which will be cached. 
#The first time we build the image there’s nothing cached, 
#so everything will be run from scratch

FROM mhart/alpine-node:latest
MAINTAINER developadi@gmail.com

#copy our local package.json file into the /tmp directory image
ADD package.json /tmp/package.json
#come in /tmp dir then install dependencies of node
RUN cd /tmp && npm install
#create dir /opt/app and copy dependencies dir of node into /opt/app/
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app

#change our workdir into /opt/app
WORKDIR /opt/app
#copy all files into /opt/app
ADD . /opt/app

EXPOSE 1337

CMD ['npm', 'start']