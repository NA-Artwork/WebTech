#!/bin/bash
npm install basic-auth sqlite3 urlencode
cd ./database/setup
nodejs create.js
cd ../../nodeScripts
nodejs createTestDB.js
