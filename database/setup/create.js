"use strict";
var sql = require("sqlite3");
sql.verbose();
var db = new sql.Database("../test.db");
db.serialize(startup);

function startup() {
  db.run("CREATE TABLE User(userId INTEGER,"+
                           "name VARCHAR(100) NOT NULL,"+
                           "email VARCHAR(100) NOT NULL,"+
                    "CONSTRAINT pkUid PRIMARY KEY(userId))",
         err);
  db.run("CREATE TABLE Message (mesId INTEGER,"+
                               "userId INTEGER,"+
                               "body TEXT NOT NULL,"+
                               "tstamp INTEGER,"+
                               "CONSTRAINT pkPid PRIMARY KEY(userId)"+
                               "CONSTRAINT fkUid FOREIGN KEY(userId) REFERENCES User(userId))",
        err);       
  // db.run("insert into pets values ('Odie','dog')", err);
  // db.run("insert into pets values ('Wanda','fish')", err);
  db.close();
}

function err(e) { if (e) throw e; }
