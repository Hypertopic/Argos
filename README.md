# Argos

Argos is a Web Service for cooperative cataloguing, qualitative analysis of images, and qualitative analysis of texts.

## Install CouchDB

You will need CouchDB (version 1.0 or newer). See [Apache CouchDB project](http://couchdb.apache.org/) for more information.

## Install CouchApp

[CouchApp](https://github.com/jchris/couchapp) is a tool for implementing standalone CouchDB application, it makes implementation of Argos much easier.

## Install Argos

First, you should create a database on installed CouchDB. You might also want to set admin access. See [screencast](http://www.youtube.com/watch?v=oHKvV3Nh-CI)

Then, install Argos by issue following commands:

    git clone git://github.com/benel/Argos.git
    cd Argos
    couchapp push . http://user:pass@127.0.0.1:5984/argos

## License

Licensed under GUN GPL: http://www.gnu.org/licenses/gpl.html