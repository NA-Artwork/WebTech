// Run a node.js web server for local development of a static web site.
// Put this program in a site folder and start with "node server.js".
// Then visit the site at the address printed on the console.
// The server is configured to encourage portable web sites.
// In particular, URLs are lower cased so the server is case insensitive even
// on Linux, and paths containing upper case letters are banned so that the
// file system is treated as case sensitive, even on Windows.

// Load the library modules, and define the response codes:
// see http://en.wikipedia.org/wiki/List_of_HTTP_status_codes.
// Define the list of banned urls, and the table of file types, and run tests.
// Then start the server on the given port: use the default 80, or use 8080 to
// avoid privilege or port number clash problems or to add firewall protection.
var http = require('http');
var https = require('https');
var fs = require('fs');
var cry = require("crypto");
var auth = require("basic-auth");
var authenticate = require('./nodeScripts/authenticate.js')
var sql = require('sqlite3');
sql.verbose();
//redirect directly
//
// var createDB = require('./database/setup/create.js');
// create.startup();

var db = new sql.Database("./database/database.sqlite3");

var t = require("./nodeScripts/test.js");
var commentFormSql = require("./nodeScripts/comments_form.js");
var buildInfo = require("./nodeScripts/build_info.js");
var buildMessgP = require("./nodeScripts/build_messages.js");

var OK = 200, Redirect = 307, NotFound = 404, BadType = 415, Error = 500;
var banned = defineBanned();
var types = defineTypes();
//global variable ipaddress
//
//or send a session cookie
//
userName = null;
password = null;
// Start the http service.  Accept only requests from localhost, for security.
// Print out the server address to visit.
function start(port, options) {
  test();
  commentFormSql.test();
  buildInfo.test();
  buildMessgP.test();
  // var options = options;//{ key: key, cert: cert };
  console.log(options);
  var httpService = https.createServer(options, handle);
  httpService.listen(port, 'localhost');
  var address = "https://localhost";
  if (port != 80 || port != 443) address = address + ":" + port;
  console.log("Server running at", address);
}

// Serve a request.  Process and validate the url, then deliver the file.
function handle(request, response) {
    var url = request.url;
    var method = request.method;
    var query = retrieveQuery(url);
    url = removeQuery(url);
    url = lower(url);
    url = addIndex(url);
    executeQuery(query,url);
    if (! valid(url)) return fail(response, NotFound, "Invalid URL");
    if (! safe(url))  return fail(response, NotFound, "Unsafe URL");
    if (!free(url)){
      if (userName =="Nikos" && password == "2108"){}
      else url = "/login.html";// return fail(response, NotFound, "Administrator access only");
    }
    if (! open(url))  return fail(response, NotFound, "URL has been banned");
    var type = findType(url);
    if (type == null) return fail(response, BadType, "File type unsupported");
    if (type == "text/html") type = negotiate(request.headers.accept);
    if(method == 'POST') handlePostRequest(request,url);
    url = redirects(url);
    reply(response, url, type);
}

function handlePostRequest(request,url){
    var body="";
    request.on('data', function (data) {
      body += data;
    });
    request.on('end',function(){
      console.log(body + " url " +url);
      if(body.indexOf("foo=logout")==0){
        console.log(body+" logged Out");
        userName = null;
        password = null;
      }
      if(url == "/client/contact.html"){
        commentFormSql.insertMessage(body, db, fs);
      }else if(url == "/login.html"){
        var cred = body.split('&');
        var i1 = cred[0].indexOf('=');
        userName = cred[0].substring(i1+1,cred[0].length);
        i1 = cred[1].indexOf('=');
        password = cred[1].substring(i1+1, cred[1].length);
        console.log(cred +"\n"+userName+"\n"+password );
      }
    });
}

function redirects(url){
  if(url === "/client/info.html"){
    url = "/client/infotemp.html";
  }else if(url === "/admin/messages.html"){
    url = "/admin/messagestemp.html";
  } else if (url === '/client/login.html'){
    url = "/admin/messages.html";
  }
  return url;
}
// Remove the query part of a url.
function removeQuery(url) {
    var n = url.indexOf('?');
    if (n >= 0) url = url.substring(0, n);
    return url;
}

// Retrieve the query part of a url.
function retrieveQuery(url) {
    var n = url.indexOf('?');
    if (n >= 0){
      var query = url.substring(n+1, url.length);
      console.log(query);
      return query;
    }
    return null;
}

// Build dynamically created pages or request login.
function executeQuery(query, url) {
   if(url === "/client/info.html"){
     buildInfo.buildInfoPage(query,fs);
   }
  //  else if (url === '/client/login'){
  //    authenticate.verify(query);
  //  }
}

// Make the url lower case, so the server is case insensitive, even on Linux.
function lower(url) {
    return url.toLowerCase();
}

// If the url ends with / add index.html.
function addIndex(url) {
    if (ends(url, '/')) url = url + "index.html";
    return url;
}

// Validate the URL.  It must start with / and not contain /. or // so
// that /../ and /./ and file or folder names starting with dot are excluded.
// Also a final name with no extension is rejected.
function valid(url) {
    if (! starts(url, "/")) return false;
    if (url.indexOf("//") >= 0) return false;
    if (url.indexOf("/.") >= 0) return false;
    if (ends(url, "/")) return true;
    if (url.lastIndexOf(".") < url.lastIndexOf("/")) return false;
    return true;
}

function free(url){
    if(url.indexOf("admin") > 0) return false;
    return true;
}
// Restrict the url to visible ascii characters, excluding control characters,
// spaces, and unicode characters beyond ascii.  Such characters aren't
// technically illegal, but (a) need to be escaped which causes confusion for
// users and (b) can be a security risk.
function safe(url) {
    var spaceCode = 32, deleteCode = 127;
    if (url.length > 1000) return false;
    for (var i=0; i<url.length; i++) {
        var code = url.charCodeAt(i);
        if (code > spaceCode && code < deleteCode) continue;
        return false;
    }
    return true;
}

// Protect any resources which shouldn't be delivered to the browser.
function open(url) {
    for (var i=0; i<banned.length; i++) {
        var ban = banned[i];
        if (url == ban || ends(ban, "/") && starts(url, ban)) {
            return false;
        }
    }
    return true;
}

// Find the content type to respond with, or undefined.
function findType(url) {
    var dot = url.lastIndexOf(".");
    var extension = url.substring(dot);
    return types[extension];
}

// Do content negotiation, assuming all pages on the site are XHTML and
// suitable for dual delivery.  Check whether the browser claims to accept the
// XHTML type and, if so, use that instead of the HTML type.
function negotiate(accept) {
    var htmlType = "text/html";
    var xhtmlType = "application/xhtml+xml";
    var accepts = accept.split(",");
    if (accepts.indexOf(xhtmlType) >= 0) return xhtmlType;
    else return htmlType;
}

// Read and deliver the url as a file within the site.
function reply(response, url, type) {
    var file = "." + url;
    console.log(file);
    fs.readFile(file, deliver.bind(null, response, type));
}

// Deliver the file that has been read in to the browser.
function deliver(response, type, err, content) {
    if (err) return fail(response, NotFound, "File not found");
    var typeHeader = { 'Content-Type': type };
    response.writeHead(OK, typeHeader);
    response.write(content);
    response.end();
}

// Give a minimal failure response to the browser
function fail(response, code, text) {
    var textTypeHeader = { 'Content-Type': 'text/plain' };
    response.writeHead(code, textTypeHeader);
    response.write(text, 'utf8');
    response.end();
}

// Check whether a string starts with a prefix, or ends with a suffix.  (The
// starts function uses a well-known efficiency trick.)
function starts(s, x) { return s.lastIndexOf(x, 0) == 0; }
function ends(s, x) { return s.indexOf(x, s.length-x.length) >= 0; }

// Avoid delivering the server source file.  Also call banUpperCase.
function defineBanned() {
    var banned = ["/server.js"];
    banUpperCase(".", banned);
    return banned;
}

// Check a folder for files/subfolders with non-lowercase names.  Add them to
// the banned list so they don't get delivered, making the site case sensitive,
// so that it can be moved from Windows to Linux, for example. Synchronous I/O
// is used because this function is only called during startup.  This avoids
// expensive file system operations during normal execution.  A file with a
// non-lowercase name added while the server is running will get delivered, but
// it will be detected and banned when the server is next restarted.
function banUpperCase(folder, banned) {
    var folderBit = 1 << 14;
    var names = fs.readdirSync(folder);
    for (var i=0; i<names.length; i++) {
        var name = names[i];
        var file = folder + "/" + name;
        if (name != name.toLowerCase()) {
            banned.push(file.substring(1));
        }
        var mode = fs.statSync(file).mode;
        if ((mode & folderBit) == 0) continue;
        banUpperCase(file, banned);
    }
}

// The most common standard file extensions are supported.
// Some common non-standard file extensions are explicitly excluded.
// This table is defined using a function rather than just a global variable,
// because otherwise the table would have to appear before calling start().
function defineTypes() {
    return {
    '.html' : 'text/html',    // old browsers only, see negotiate
    '.css'  : 'text/css',
    '.js'   : 'application/javascript',
    '.png'  : 'image/png',
    '.gif'  : 'image/gif',    // for images copied unchanged
    '.jpeg' : 'image/jpeg',   // for images copied unchanged
    '.jpg'  : 'image/jpeg',   // for images copied unchanged
    '.svg'  : 'image/svg+xml',
    '.json' : 'application/json',
    '.pdf'  : 'application/pdf',
    '.txt'  : 'text/plain',
    '.ttf'  : 'application/x-font-ttf',
    '.woff' : 'application/font-woff',
    '.aac'  : 'audio/aac',
    '.mp3'  : 'audio/mpeg',
    '.mp4'  : 'video/mp4',
    '.webm' : 'video/webm',
    '.ico'  : 'image/x-icon', // just for favicon.ico
    '.xhtml': undefined,      // not suitable for dual delivery, use .html
    '.htm'  : undefined,      // non-standard, use .html
    '.rar'  : undefined,      // non-standard, platform dependent, use .zip
    '.doc'  : undefined,      // non-standard, platform dependent, use .pdf
    '.docx' : undefined,      // non-standard, platform dependent, use .pdf
    }
}

// Test the server's logic, and make sure there's an index file.
function test() {
    t.check(removeQuery("/index.html?x=1"), "/index.html");
    t.check(lower("/index.html"), "/index.html");
    t.check(lower("/INDEX.HTML"), "/index.html");
    t.check(addIndex("/index.html"), "/index.html");
    t.check(addIndex("/admin/"), "/admin/index.html");
    t.check(valid("/index.html"), true);
    t.check(valid("../x"), false, "urls must start with /");
    t.check(valid("/x/../y"), false, "urls must not contain /../");
    t.check(valid("/x//y"), false, "urls must not contain //");
    t.check(valid("/x/./y"), false, "urls must not contain /./");
    t.check(valid("/.txt"), false, "urls must not contain /.");
    t.check(valid("/x"), false, "filenames must have extensions");
    t.check(safe("/index.html"), true);
    t.check(safe("/\n/"), false);
    t.check(safe("/x y/"), false);
    t.check(open("/index.html"), true);
    t.check(open("/server.js"), false);
    t.check(findType("/x.txt"), "text/plain");
    t.check(findType("/x"), undefined);
    t.check(findType("/x.abc"), undefined);
    t.check(findType("/x.htm"), undefined);
    t.check(negotiate("xxx,text/html"), "text/html");
    t.check(negotiate("xxx,application/xhtml+xml"), "application/xhtml+xml");
    t.check(fs.existsSync('./index.html'), true, "site contains no index.html");
}
var key =
    "-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIICXAIBAAKBgQDGkGjkLwOG9gkuaBFj12n+dLc+fEFk1ns60vsE1LNTDtqe87vj\n" +
    "3cTMPpsSjzZpzm1+xQs3+ayAM2+wkhdjhthWwiG2v2Ime2afde3iFzA93r4UPlQv\n" +
    "aDVET8AiweE6f092R0riPpaG3zdx6gnsnNfIEzRH3MnPUe5eGJ/TAiwxsQIDAQAB\n" +
    "AoGAGz51JdnNghb/634b5LcJtAAPpGMoFc3X2ppYFrGYaS0Akg6fGQS0m9F7NXCw\n" +
    "5pOMMniWsXdwU6a7DF7/FojJ5d+Y5nWkqyg7FRnrR5QavIdA6IQCIq8by9GRZ0LX\n" +
    "EUpgIqE/hFbbPM2v2YxMe6sO7E63CU2wzSI2aYQtWCUYKAECQQDnfABYbySAJHyR\n" +
    "uxntTeuEahryt5Z/rc0XRluF5yUGkaafiDHoxqjvirN4IJrqT/qBxv6NxvKRu9F0\n" +
    "UsQOzMpJAkEA25ff5UQRGg5IjozuccopTLxLJfTG4Ui/uQKjILGKCuvnTYHYsdaY\n" +
    "cZeVjuSJgtrz5g7EKdOi0H69/dej1cFsKQJBAIkc/wti0ekBM7QScloItH9bZhjs\n" +
    "u71nEjs+FoorDthkP6DxSDbMLVat/n4iOgCeXRCv8SnDdPzzli5js/PcQ9kCQFWX\n" +
    "0DykGGpokN2Hj1WpMAnqBvyneXHMknaB0aXnrd/t7b2nVBiVhdwY8sG80ODBiXnt\n" +
    "3YZUKM1N6a5tBD5IY2kCQDIjsE0c39OLiFFnpBwE64xTNhkptgABWzN6vY7xWRJ/\n" +
    "bbMgeh+dQH20iq+O0dDjXkWUGDfbioqtRClhcyct/qE=\n" +
    "-----END RSA PRIVATE KEY-----\n";

var cert =
    "-----BEGIN CERTIFICATE-----\n" +
    "MIIClTCCAf4CCQDwoLa5kuCqOTANBgkqhkiG9w0BAQUFADCBjjELMAkGA1UEBhMC\n" +
    "VUsxDTALBgNVBAgMBEF2b24xEDAOBgNVBAcMB0JyaXN0b2wxDDAKBgNVBAoMA1VP\n" +
    "QjEZMBcGA1UECwwQQ29tcHV0ZXIgU2NpZW5jZTESMBAGA1UEAwwJbG9jYWxob3N0\n" +
    "MSEwHwYJKoZIhvcNAQkBFhJub25lQGNzLmJyaXMuYWMudWswHhcNMTMwNDA4MDgy\n" +
    "NjE2WhcNMTUwNDA4MDgyNjE2WjCBjjELMAkGA1UEBhMCVUsxDTALBgNVBAgMBEF2\n" +
    "b24xEDAOBgNVBAcMB0JyaXN0b2wxDDAKBgNVBAoMA1VPQjEZMBcGA1UECwwQQ29t\n" +
    "cHV0ZXIgU2NpZW5jZTESMBAGA1UEAwwJbG9jYWxob3N0MSEwHwYJKoZIhvcNAQkB\n" +
    "FhJub25lQGNzLmJyaXMuYWMudWswgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGB\n" +
    "AMaQaOQvA4b2CS5oEWPXaf50tz58QWTWezrS+wTUs1MO2p7zu+PdxMw+mxKPNmnO\n" +
    "bX7FCzf5rIAzb7CSF2OG2FbCIba/YiZ7Zp917eIXMD3evhQ+VC9oNURPwCLB4Tp/\n" +
    "T3ZHSuI+lobfN3HqCeyc18gTNEfcyc9R7l4Yn9MCLDGxAgMBAAEwDQYJKoZIhvcN\n" +
    "AQEFBQADgYEAQo4j5DAC04trL3nKDm54/COAEKmT0PGg87BvC88S5sTsWTF4jZdj\n" +
    "dgxV4FeBF6hW2pnchveJK4Kh56ShKF8SK1P8wiqHqV04O9p1OrkB6GxlIO37eq1U\n" +
    "xQMaMCUsZCWPP3ujKAVL7m3HY2FQ7EJBVoqvSvqSaHfnhog3WpgdyMw=\n" +
    "-----END CERTIFICATE-----\n";

    const options = {
      key: fs.readFileSync('server-key.pem'),
      cert: fs.readFileSync('server-crt.pem'),
      ca: fs.readFileSync('ca-crt.pem'),
      // key: key, //fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
      // cert: cert //fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
    };



    start(443,options);
