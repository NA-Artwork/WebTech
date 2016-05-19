"use strict";
module.exports.verify  = function verify(query){
  if(query!=null){
    var querySplit = query.split('&');
    console.log(querySplit);
    var index = querySplit[0].indexOf('=');
    var uName = querySplit[0].substring(index+1,querySplit[0].length);
    console.log(uName);
    index = querySplit[1].indexOf('=');
    var password = deleteAtSymbol(querySplit[1].substring(index+1,querySplit[1].length));
if(uName === "Nikos" && password === "nik")
return "../admin/messages.html";
      }
return null;
  }
