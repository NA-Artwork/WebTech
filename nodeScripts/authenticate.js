"use strict";
// var sql = require('sqlite3');
// var db = new sql.Database("./database/database.sqlite3");
// verify("alex", "password1");

var returnval=false;
module.exports.verify=function verify(un,p, db){
// function verify(un,p){
  var userNameMatch;
  var passWordMatch;
  var ps = db.prepare("SELECT userName as username from User where username=?");
  // db.each("SELECT username as username from User", function(err, row) {
  //     console.log("\n" + row.username);
  //     });
  ps.get(un, function(err, row) {
    if(row){
      // console.log("database ussername= " +  row.username );
      if(un===row.username){
        console.log("user match");
        var ps = db.prepare("SELECT pass AS password from User where password=?");

        ps.get(p, function(err, row) {
          if(row){
            if(p===row.password){
              passWordMatch=true;
              console.log("pass match");

                console.log("full match");
                returnval = true;
            }
            else{
              console.log("fail match");
              returnval = false;
            }
          }
        });
      }
      else{
        returnval = false;
      }
    }
  });
    return returnval;
  }

  module.exports.getValue=function getValue(){
    return returnval;
  }


  function passMatch(passWordMatch, userNameMatch){
    // console.log("passWordMatch userNameMatch=" + passWordMatch + " " + userNameMatch)
    if(passWordMatch==true && userNameMatch==true){
      console.log("full match");
      return true;
    }
    else{
      console.log("fail match");
      return false;
    }
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
}




// db.run("CREATE TABLE IF NOT EXISTS" +
//        "User (usId INTEGER," +
//         "userName VARCHAR(100) NOT NULL UNIQUE, pass VARCHAR(100) NOT NULL)"+
//         "CONSTRAINT pkUid PRIMARY KEY(usId))", err);
