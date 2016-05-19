"use strict";
var t = require("./test.js");
var urlencode = require('urlencode');

module.exports.insertUser=function insertUser(query, db){
  if(query!=null){
    var querySplit = query.split('&');
    console.log(querySplit);
    var index = querySplit[0].indexOf('=');
    var uName = urlencode.decode(querySplit[0].substring(index+1,querySplit[0].length));
    console.log(uName);
    index = querySplit[1].indexOf('=');
    uName = urlencode.decode(uName + " " + querySplit[1].substring(index+1,querySplit[1].length));
    console.log("\n uname = " + uName);
    index = querySplit[2].indexOf('=');
    var email = urlencode.decode(querySplit[2].substring(index+1,querySplit[2].length));
    console.log("\n EMAIL= " + email);
    index = querySplit[3].indexOf('=');
    var message = urlencode.decode(querySplit[3].substring(index+1,querySplit[3].length));
    console.log("\n message= " +message);
    uName = replacePlusSymbol(uName);
    email = replacePlusSymbol(email);
    message = replacePlusSymbol(message);
    sqlrun(uName, email, message, db);
  }
}

function sqlrun(uName, email, message, db){
  var unixTime = Math.round(new Date().getTime()/1000); // rounded to unix time
  var ps = db.prepare("INSERT INTO Message(name, tstamp, body, email) Values (?, ?, ?, ?)");
  ps.run(uName, unixTime, message, email);
  ps.finalize();
  // var strtemp = "INSERT INTO Message(name, tstamp, body, email) Values ('"+ uName +"','"+ unixTime +"','"+ message +"','"+email+"')";
  // console.log(strtemp);
}

function deleteAtSymbol(email){
  var re = /%40/g;
  return email.replace(re, "@");
}
function replacePlusSymbol(str){
  return str.replace(/[+]/g," ");
}
module.exports.test = function test(){
  t.check(deleteAtSymbol("nikos%40gmail.com"),"nikos@gmail.com");
}
