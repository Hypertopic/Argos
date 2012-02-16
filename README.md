ARGOS - Contradictory/complementary categorisations management
==============================================================

License: [GNU Affero General Public License](http://www.gnu.org/licenses/agpl.html)

Contact: <aurelien.benel@utt.fr>

Home page: <http://argos-viewpoint.sf.net/>

Installation requirements
-------------------------

* Git client
* [CouchDB](http://couchdb.apache.org/)
* [CouchApp](https://github.com/jchris/couchapp) 

Installation procedure
----------------------

* Create a database named ``argos`` at <http://127.0.0.1:5984/_utils>.

* In any folder:

        git clone git://github.com/Hypertopic/Argos.git
        couchapp push Argos http://127.0.0.1:5984/argos
