"use strict";
var t = require("./test.js");
var sql = require('sqlite3').verbose();
var db = new sql.Database("./nodeScripts/test.sqlite3");

module.exports = {
  verify:verify,
  test:test
}

function verify(un,p, db,callback){
  var ps = db.prepare("SELECT userName,pass from User where username=?");
  ps.get(un, getResultsUn.bind(null,un,p,callback));
}
function getResultsUn(un,p,callback, err, row) {
  if(err) console.error(err);
  if(row){
    if(p===row.pass){
      console.log("user match");
      callback();
    }else console.log("Wrong combination of username and password");
  }else console.log("No user found under this user name");

}

function test(){
  verify("Nikos","2108",db,returnValue);
  verify("Nikos","999",db,returnValue);
  function returnValue(){}

  // t.check(verify("Nikos","2108",db,returnValue).callback(), true);
  // t.check(verify("Nikos","9999",db),false);
}
