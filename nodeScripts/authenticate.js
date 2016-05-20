"use strict";
var t = require("./test.js");
var sql = require('sqlite3');
sql.verbose();
var testdb = new sql.Database("./database/testdb.sqlite3");

// testdb.serialize();
// verify("alex", "password1");

module.exports ={
 verify:verify,
 test:test
};

function verify(un,p, db){
  var match = {value:false};
  // var query = "SELECT userName,pass FROM User WHERE username='"+un+"' AND pass='"+p+"'";
  // console.log(query);
  // var ps = db.run(query);
  //
  // var ps = db.prepare("SELECT userName,pass FROM User WHERE username=? AND pass=?");
  // ps.get(un, p, function(err, row) {
  //      throw err;
  //     console.log(row.username + ": " + row.pass);
  // });
  db.serialize(function() {
    var ps = db.prepare("SELECT userName,pass FROM User WHERE username=? AND pass=?");
    ps.get(un, p, function(err, row) {
        if(err) match.value = false;
        if(row.length <= 0) match.value = false;
        console.log(row.username + ": " + row.pass);
        if(row.username == un && row.pass == p) match.value = true;
        match.value = false;
    });
  });
  return match.value;
}
function compareKey(un,p, err, row) {
  console.log("happened");
  if(row){
    console.log("database ussername= " +  row.username );
    if(un === row.username && p === row.pass){
      match.value=true;
      console.log("user match");
      return true;
    } else {
      match.value=false;
      console.log("user not match");
      return false;
    }
  }
  return false;
}
function test(){
  t.check(verify("Nikos", "2108", testdb), true );
  t.check(verify("Nikos", "papar", testdb), false );
}



// db.run("CREATE TABLE IF NOT EXISTS" +
//        "User (usId INTEGER," +
//         "userName VARCHAR(100) NOT NULL UNIQUE, pass VARCHAR(100) NOT NULL)"+
//         "CONSTRAINT pkUid PRIMARY KEY(usId))", err);
