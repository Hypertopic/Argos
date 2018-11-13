ARGOS - Contradictory/complementary categorisations management
==============================================================

Contact: <aurelien.benel@utt.fr>

Home page: <https://github.com/Hypertopic/Argos>

Notice
------

Argos is a server software. There is no need to install it on your own computer to use it. The usual way is to be "hosted" by one's own institution (ask your system administrator). If your use cases meet our research interests, we can also host your data on our community server.

Installation requirements
-------------------------

* Git client
* [CouchDB](http://couchdb.apache.org/)
* [CouchApp](https://github.com/jchris/couchapp)

Installation procedure
----------------------

* Create a database named ``argos`` at <http://127.0.0.1:5984/_utils>.

* In CouchDB settings, set `secure_rewrites` to `false` (needed to use CouchDB sessions as default Argos sessions).

* In any folder:

        git clone https://github.com/Hypertopic/Argos.git
        couchapp push Argos/app http://127.0.0.1:5984/argos

* Your Argos API endpoint is now available at <http://127.0.0.1:5984/argos/_design/argos/_rewrite/> (this URI can be further simplified by the use of CouchDB virtual servers feature or the use of a reverse proxy like [AAAforREST](https://github.com/Hypertopic/AAAforREST)). Check the [Hypertopic protocol specification](https://github.com/Hypertopic/Protocol/blob/master/README.md) for usable HTTP resources and methods.
