"use strict";
var sql = require("sqlite3");
sql.verbose();
var db = new sql.Database("../database.sqlite3");
db.serialize(startup);

function startup() {
  db.run("CREATE TABLE IF NOT EXISTS Message(messageId INTEGER,"+
                           "name VARCHAR(100) NOT NULL,"+
                           "body TEXT ,"+
                           "tstamp INTEGER  ,"+
                           "email VARCHAR(100) NOT NULL,"+
                    "CONSTRAINT pkUid PRIMARY KEY(messageId))",
         err);
  db.close();
}

function err(e) { if (e) throw e; }
