"use strict";
var sql = require("sqlite3");
sql.verbose();
var db = new sql.Database("../database.sqlite3");
db.serialize(startup);

function startup() {
  db.run("CREATE TABLE User(messageId INTEGER,"+
                           "name VARCHAR(100) NOT NULL,"+
                           "email VARCHAR(100) NOT NULL,"+
                    "CONSTRAINT pkUid PRIMARY KEY(messageId))",
         err);
  db.run("CREATE TABLE Message (messageId INTEGER,"+
                               "body TEXT NOT NULL,"+
                               "tstamp INTEGER,"+
                               "CONSTRAINT pkPid PRIMARY KEY(messageId)"+
                               "CONSTRAINT fkUid FOREIGN KEY(messageId) REFERENCES User(messageId))",
        err);
  // db.run("insert into pets values ('Odie','dog')", err);
  // db.run("insert into pets values ('Wanda','fish')", err);
  db.close();
}

function err(e) { if (e) throw e; }
