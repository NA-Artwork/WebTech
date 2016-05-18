module.exports.insertUser=function insertUser(query, db){
  if(query!=null){
    var querySplit = query.split('&');
    console.log(querySplit);
    var index = querySplit[0].indexOf('=');
    var uName = querySplit[0].substring(index+1,querySplit[0].length);
    console.log(uName);
    index = querySplit[1].indexOf('=');
    uName = uName + " " + querySplit[1].substring(index+1,querySplit[1].length);
    console.log(uName);
    index = querySplit[2].indexOf('=');
    var email = deleteAtSymbol(querySplit[2].substring(index+1,querySplit[2].length));
    console.log(email);
    index = querySplit[3].indexOf('=');
    var message = deleteAtSymbol(querySplit[3].substring(index+1,querySplit[3].length));
    console.log(message);
    var strtemp = "INSERT INTO User(name,email) Values ('"+ uName +"','"+email+"')";
    console.log(strtemp);
    db.run(strtemp);
    // insertMessage(message, db);
  }
}

function deleteAtSymbol(email){
  var re = /%40/g;
  return email.replace(re, "@");
}

function insertMessage(message, db){
  if(query!=null){
    var lastMessageSQL = "select messageID from User order by messageID desc limit 1;" //returns the last user in the list
    // var lastMessage = db.run(lastMessageSQL);

    var unixTime = new Date().getTime();
    // var strtemp = "INSERT INTO Message(messageId, body, tstamp ) Values ('"+ userId +"','"+message+"','" + unixTime +"')";
    // var consoleOUT="\n" + message + " time= " + unixTime + " " + " lastMessageID= " + lastMessage;
    // console.log(consoleOUT);
    // db.run(strtemp);
  }
}



// module.exports.insertMessage=function insertMessage(query, db){
//   if(query!=null){
//     var querySplit = query.split('&');
//     var lastUser = "select messageID from User order by messageID desc limit 1;" //returns the last user in the list
//     var userId = db.run(lastUser);
//     index = querySplit[3].indexOf('=');
//     var message = deleteAtSymbol(querySplit[3].substring(index+1,querySplit[3].length));
//     console.log(email);
//     var unixTime = new Date().getTime();
//     var strtemp = "INSERT INTO Message(messageId, body, tstamp ) Values ('"+ userId +"','"+message+"','" + unixTime +"')";
//     console.log(strtemp);
//     db.run(strtemp);
//   }
// }
