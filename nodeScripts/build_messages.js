
module.exports.buildMessagesPage = function buildMessagesPage(db, fs){
  var rows;
  db.all("SELECT * FROM Message m LEFT JOIN User u ON m.userId = u.userId",buildMessageError.bind(null,fs));
    return "/admin/messagestemp.html";
}

function buildMessageError(fs, err, rows){
  var file = "./admin/messages.html";
  var fileOut = "./admin/messagestemp.html";
  var index = fs.readFileSync(file,'utf8');
  var list = "";
  if(index === null) throw err;
  rows.forEach(function (row) {
      console.log(row.body, row.name, row.email, row.tstamp);
      list = addListItem("" + row.name +" "+ row.email, list, "details");
      list = addListItem(row.body, list, "message");
      list = addListItem("", list, "");
  })
  // list = addListItem(rows[1].body, list);
  index = index.replace(/replaceThis/g, list);
  console.log(index);
  fs.writeFileSync(fileOut,index);
}
function addListItem(item, list, classId){
  list = list + "<li class='"+classId+"'>"+item+"</li>\n";
  return list;
}
function addlineBreak(list){
  return list +"<br>";

}
