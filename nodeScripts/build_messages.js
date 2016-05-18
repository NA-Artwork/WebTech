
module.exports.buildMessagesPage = function buildMessagesPage(fs){
  var file = "./admin/messages.html";
  var file = "./admin/messagestemp.html";
  db.all("SELECT * FROM Message m LEFT JOIN User u ON m.userId = u.userId",function(err, rows) {
        rows.forEach(function (row) {
            console.log(row.body, row.name, row.email, row.tstamp);
        })
    });
    var index = fs.readFileSync(file,'utf8');
    if(!index) throw err;
    index = index.replace(/replaceThis/g,rows[0].body);
    fs.writeFile(fileOut,index);
    return "/admin/messagestemp.html";
}
