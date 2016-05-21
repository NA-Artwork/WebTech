"use strict";
module.exports.verify = function verify(un,p,db){
  console.log(un+p);
  return db.run(
    "SELECT userName,pass from User WHERE username='"+un+"' AND pass='"+p+"'",
     getResults);
  function getResults(err, row,verified){
    if(err) {
      console.error(err);
      return false;
    }
    if(row){
      console.log("row"+row.userName+row.pass);
    }
  }
  function verified(){
    console.log("complete");
  }
}




// db.run("CREATE TABLE IF NOT EXISTS" +
//        "User (usId INTEGER," +
//         "userName VARCHAR(100) NOT NULL UNIQUE, pass VARCHAR(100) NOT NULL)"+
//         "CONSTRAINT pkUid PRIMARY KEY(usId))", err);
