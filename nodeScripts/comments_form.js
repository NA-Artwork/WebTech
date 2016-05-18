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
    var strtemp = "INSERT INTO User(name,email) Values ('"+ uName +"','"+email+"')";
    console.log(strtemp);
    db.run(strtemp);
  }
}

function deleteAtSymbol(email){
  var re = /%40/g;
  return email.replace(re, "@");
}



module.exports.insertMessage=function insertMessage(query, db){

}
