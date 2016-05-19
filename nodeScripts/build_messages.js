var t = require("./test.js");
module.exports.buildMessagesPage = function buildMessagesPage(db, fs){
  var rows;
  db.all("SELECT * FROM Message",buildMessageError.bind(null,fs));
    return "/admin/messagestemp.html";
}

function buildMessageError(fs, err, rows){
  var file = "./admin/messages.html";
  var fileOut = "./admin/messagestemp.html";
  var index = fs.readFileSync(file,'utf8');
  var original = fs.readFileSync(file,'utf8');
  var list = "";
  if(index === null||original==null) throw err;
  if(rows){
    rows.forEach(function (row) {
      console.log(row.body, row.name, row.email, row.tstamp);
      list = addListItem("user name: " + row.name +" email: "+ row.email, list, "details");
      list = addListItem("Message: " + row.body, list, "message");
      list = addListItem("", list, "");
    })
    index = index.replace(/replaceThis/g, list);
    // console.log(index);
    fs.writeFileSync(fileOut,index);
  }else fs.writeFileSync(fileOut,original);
}
function addListItem(item, list, classId){
  list = list + "<li class='"+classId+"'>"+item+"</li>\n";
  return list;
}
function addlineBreak(list){
  return list +"<br>";

}


module.exports.test = function test(){
  t.check(addListItem("nikos","","details"),"<li class='details'>nikos</li>\n");
  t.check(addListItem("nikos","line\n","details"),"line\n<li class='details'>nikos</li>\n");
  t.check(addlineBreak(""), "<br>");
  t.check(addlineBreak("line\n"), "line\n<br>");
}
