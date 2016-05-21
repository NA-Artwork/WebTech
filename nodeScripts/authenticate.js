"use strict";
// var sql = require('sqlite3');
// var db = new sql.Database("./database/database.sqlite3");
// verify("alex", "password1");

var returnval=false;
module.exports.verify=function verify(un, p, db){
  var userName;
  var passWord;
  var ps = db.prepare("SELECT userName, pass from User where username=? and pass=?");
  ps.get(un, p, function(err, row) {
    if(row!=undefined){
      returnval=true
    }
    else{
      returnval=false;
    }
    });
}




  module.exports.getValue=function getValue(){
    return returnval;
  }
