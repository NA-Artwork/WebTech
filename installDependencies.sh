#!/bin/bash
npm install node-pre-gyp 
npm install urlencode
npm install sqlite3 --build-from-source
cd ./database/setup && node create.js
cd ../../nodeScripts && node createTestDB.js
