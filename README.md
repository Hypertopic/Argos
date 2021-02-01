ARGOS - Contradictory/complementary categorisations management
==============================================================

Contact: <aurelien.benel@utt.fr>

Home page: <https://github.com/Hypertopic/Argos>

Notice
------

Argos is a server software. There is no need to install it on your own computer to use it. The usual way is to be "hosted" by one's own institution (ask your system administrator). If your use cases meet our research interests, we can also host your data on our community server.

Installation requirements
-------------------------

* [Docker Engine](https://docs.docker.com/install/)

Installation procedure
----------------------

    docker-compose up -d prod

Two services are now available:

- Argos API endpoint at <http://localhost/> (check the [Hypertopic protocol specification](https://github.com/Hypertopic/Protocol/blob/master/README.md) for usable HTTP resources and methods),
- CouchDB administration interface at <http://localhost:5984/_utils/> (that should be kept accessible only to system administrators).

Authentication settings
-----------------------

### for users managed by an LDAP server

The `ldap` entry of the `conf/aaaforrest.yml` should be:

- updated to match your organization settings,
- or wiped out if you do not use it.

### for users managed by CouchDB

1. Create the `_users` database in [CouchDB administration interface](http://localhost:5984/_utils/#/_all_dbs) and then a user (change values as needed):

    ```yaml
    {
      "_id": "org.couchdb.user:alice",
      "type": "user",
      "name": "alice",
      "password": "wonderland",
      "roles": []
    }
    ```

2. Create an administrator in [CouchDB administration interface](http://localhost:5984/_utils/#createAdmin/nonode@nohost)

