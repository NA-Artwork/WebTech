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
   index = index.replace(/replaceThis/g,fillInfo(query, fs))
   fs.writeFileSync(fileOut,index);
   return "/client/infotemp.html";
}

function fillInfo(query, fs){
  var index=['d','e'];
  var key = query;
  var folder = "./client/images/gallery_pictures/painting/";
  for(var i = 0; i <= 1; i++){
    var img = key+index[i]+".jpg";
    console.log("looking for: "+folder+img);
    console.log(fs.existsSync(folder+img));
    if(fs.existsSync(folder+img)){
      console.log("found: "+folder+img);
      query += addImage(folder,img);
    }
    else query +=" ";
  }
  return query;
}
function addImage(folder,img){
  var div = "<div class="+'"'+"img"+'"'
  var str = div+"><img id="+'"'+"info1"+'"'+" src="+'"'+
  folder.substring(1,folder.length)+img+'"'+"/></div>";
  return str;
}
function test(){
  t.check(addImage("/painting/","k2"),"<divpainting");
}
