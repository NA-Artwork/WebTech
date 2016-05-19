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
    sqlrun(uName, email, message, db);
  }
}

function sqlrun(uName, email, message, db){
  var unixTime = Math.round(new Date().getTime()/1000); // rounded to unix time
  var strtemp = "INSERT INTO Message(name, tstamp, body, email) Values ('"+ uName +"','"+ unixTime +"','"+ message +"','"+email+"')";
  console.log(strtemp);
  db.run(strtemp);
}

function deleteAtSymbol(email){
  var re = /%40/g;
  return email.replace(re, "@");
}
