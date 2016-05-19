"use strict";
var t = require("./test.js");
var urlencode = require('urlencode');

module.exports.insertUser=function insertUser(query, db){
  if(query!=null){
    var index;
    var querySplit = query.split('&');
    console.log(querySplit);
    var uName = getStatementFromArray(querySplit, index, 0);
    console.log(uName);
    uName = uName + " " + getStatementFromArray(querySplit, index, 1);
    console.log("\n uname = " + uName);
    var email = getStatementFromArray(querySplit, index, 2);
    console.log("\n EMAIL= " + email);
    var message = getStatementFromArray(querySplit, index, 3);
    console.log("\n message= " + message);
    sqlrun(uName, email, message, db);
  }
}

function getStatementFromArray(array, index, position){
  index = array[position].indexOf('=');
  var word = array[position].substring(index+1,array[position].length);
  word = replacePlusSymbol(word);
  word = urlencode.decode(word);
  console.log("\n getStatementFromArray word= " + word);
  return word;
}

function sqlrun(uName, email, message, db){
  var unixTime = Math.round(new Date().getTime()/1000); // rounded to unix time
  var ps = db.prepare("INSERT INTO Message(name, tstamp, body, email) Values (?, ?, ?, ?)");
  ps.run(uName, unixTime, message, email);
  ps.finalize();
}

function deleteAtSymbol(email){
  var re = /%40/g;
  return email.replace(re, "@");
}
function replacePlusSymbol(str){
  var re = /[\+]/g;
  str = str.replace(re, "%2B");
  str = str.replace(/%2B%2B%2B/g," + ");
  str = str.replace(/%2B/g, " ");
  return str;
}

module.exports.test = function test(){
  t.check(deleteAtSymbol("nikos%40gmail.com"),"nikos@gmail.com");
  t.check(replacePlusSymbol("a+++b+is"), "a + b is");
  t.check(replacePlusSymbol("nikos+40gmail.com"),"nikos 40gmail.com");
}
