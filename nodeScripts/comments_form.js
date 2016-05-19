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
  word = decodingProcess(word);
  console.log("\n getStatementFromArray word= " + word);
  return word;
}

function sqlrun(uName, email, message, db){
  var unixTime = Math.round(new Date().getTime()/1000); // rounded to unix time
  var ps = db.prepare("INSERT INTO Message(name, tstamp, body, email) Values (?, ?, ?, ?)");
  ps.run(uName, unixTime, message, email);
  ps.finalize();
}

function decodingProcess(str){
  str = str.replace(/%2B/g, "plusSymb");
  str = urlencode.decode(str);
  str = str.replace(/[+]/g, " ");
  str = str.replace(/plusSymb/g,"+");
  return str;
}

module.exports.test = function test(){
  t.check(decodingProcess("a+%2B+b+is"), "a + b is");
  t.check(decodingProcess("nikos+40gmail.com"),"nikos 40gmail.com");
}
