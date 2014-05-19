ARGOS - Contradictory/complementary categorisations management
==============================================================

License: [GNU Affero General Public License](http://www.gnu.org/licenses/agpl.html)

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

* In any folder:

        git clone https://github.com/Hypertopic/Argos.git
        cd Argos
        couchapp init
        couchapp push http://127.0.0.1:5984/argos
