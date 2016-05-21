"use strict";
var t = require("./test.js");

module.exports = {
  buildInfoPage:buildInfoPage,
  test:test
}

function buildInfoPage(query, fs){
   var file = "./client/info.html";
   var fileOut ="./client/infotemp.html"
   var index = fs.readFileSync(file, 'utf8');
   if(!index) throw err;
   index = index.replace(/k1/g,query);
   fs.writeFile(fileOut,index);
   return "/client/infotemp.html";
}


function test(){
}
