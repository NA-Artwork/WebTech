"use strict";
// var sql = require('sqlite3');
// var db = new sql.Database("./database/database.sqlite3");
// verify("alex", "password1");

var returnval=false;
module.exports.verify=function verify(un, p, db){
  var userName;
  var passWord;
  var ps = db.prepare("SELECT userName as username from User where username=?");
  ps.get(un, function(err, row) {
    if(row!=undefined){
      userName=row.username;
      console.log("un=" + un + "username=" + userName);
    }
    });
  var pspass = db.prepare("SELECT pass AS password from User where password=?");
  pspass.get(p, function(err, row) {
    if(row!=undefined){
      passWord=row.password;
      console.log("!!!!!!!!!!!!!!!!!!!!!!p=" + p + "password=" + passWord);
    }
  });
  setTimeout(function () {
    if(p===passWord && un===userName){
      console.log("full match");
      returnval= true;
    }
    else{
      console.log("fail");
      returnval= false;
    }
  }, 2000);
}




  module.exports.getValue=function getValue(){
    return returnval;
  }

  //
  // function passMatch(passWordMatch, userNameMatch){
  //   // console.log("passWordMatch userNameMatch=" + passWordMatch + " " + userNameMatch)
  //   if(passWordMatch==true && userNameMatch==true){
  //     console.log("full match");
  //     return true;
  //   }
  //   else{
  //     console.log("fail match");
  //     return false;
  //   }

  // if(passWordMatch==true && userNameMatch==true){
  //   console.log("full match");
  //   return true;
  // }
  // else{
  //   console.log("fail");
  //   return false;
  // }
  // if(un==="Nikos"&&p==="pa") return true;
  // else return false;





// db.run("CREATE TABLE IF NOT EXISTS" +
//        "User (usId INTEGER," +
//         "userName VARCHAR(100) NOT NULL UNIQUE, pass VARCHAR(100) NOT NULL)"+
//         "CONSTRAINT pkUid PRIMARY KEY(usId))", err);
