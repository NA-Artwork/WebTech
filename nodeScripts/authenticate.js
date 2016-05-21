"use strict";
// var sql = require('sqlite3');
// var db = new sql.Database("./database/database.sqlite3");
// verify("alex", "password1");

function verify(un, p, db){
  var returnval=false;
  var userName;
  var passWord;
  console.log("verify un=" + un + " p= " + p);
  var ps = db.prepare("SELECT userName, pass from User where username=? and pass=?");
  ps.get(un, p, function(err, row) {
    if(row!=undefined){
      console.log("full match");
      returnval=true
    }
    else{
      returnval=false;
    }
    });
    return returnval;
}

  module.exports.getValue=function getValue(un, p, db){
    return verify(un, p, db);
  }
