var t = require("./test.js");
module.exports.buildMessagesPage = function buildMessagesPage(db, fs){
  var rows;
  db.all("SELECT * FROM Message ORDER BY tstamp DESC",buildMessageError.bind(null,fs));
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
    var i = 0;
    rows.forEach(function (row) {
      var date = new Date(row.tstamp*1000);
      console.log(row.body, row.name, row.email, row.tstamp, date);
      list = addListItem("#"+(rows.length-i++) + " user name: " + row.name, list, "details");
      list = addListItem(" email: "+ row.email, list, "details");
      list = addListItem(date, list, "details");
      list = addListItem(row.body, list, "message");
    })
    index = index.replace(/replaceThis/g, list);
    // console.log(index);
    fs.writeFileSync(fileOut,index);
  }
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