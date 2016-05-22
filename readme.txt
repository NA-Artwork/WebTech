The user first needs to install npm dependencies with npm install basic-auth
sqlite3 urlencode

To run the server file type 	sudo nodejs server.js    The website can then
be accessed from https://localhost


When the server runs the following will appear:
user match
Wrong combination of username and password

This is to be expected and shows that the tests for accessing the database
 have run successfully. The other tests are run in the background.


The database files have been included as part of the upload. However the
/database/setup/create.js and /nodeScripts/createTestDB.js nodejs scripts
 have been included if the databases need to be re-installed.

The webpages are as follows:
https://localhost/admin/messages.html - login with username admin and
password admin if using the supplied database file to view the comments
from the database
https://localhost/client/home.html starts the page and has a javascript
animation
https://localhost/client/painting.html - click on a painting for a server
generated html page
https://localhost/client/mix_tech.html - click on painting for javascript
image enlarging
https://localhost/client/islamic_art.html - spinning svg image
https://localhost/client/contact.html - form for leaving comments -
comments are kept in a database for future viewing
https://localhost/admin/adminpage.html - this is a proof of concept for
adding new photos

All of these web pages apart from  https://localhost/admin/messages.html
can be accessed from links from the other pages

The username admin and password admin can be used to access the website
