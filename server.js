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
var fs = require('fs');
var cry = require("crypto");
var auth = require("basic-auth");
var authenticate = require('./nodeScripts/authenticate.js')
var sql = require("sqlite3");
sql.verbose();
var db = new sql.Database("database/database.sqlite3");

var t = require("./nodeScripts/test.js");
var commentFormSql = require("./nodeScripts/comments_form.js");
var buildInfo = require("./nodeScripts/build_info.js");
var buildMessgP = require("./nodeScripts/build_messages.js");

var OK = 200, NotFound = 404, BadType = 415, Error = 500;
var banned = defineBanned();
var types = defineTypes();

test();
commentFormSql.test();
buildInfo.test();
buildMessgP.test();

start(8080);

// Start the http service.  Accept only requests from localhost, for security.
// Print out the server address to visit.
function start(port) {
    var httpService = http.createServer(handle);
    httpService.listen(port, 'localhost');
    var address = "http://localhost";
    if (port != 80) address = address + ":" + port;
    console.log("Server running at", address);
}

// Serve a request.  Process and validate the url, then deliver the file.
function handle(request, response) {
    var url = request.url;
    var post = request.method;
    var query = retrieveQuery(url);
    url = removeQuery(url);
    url = lower(url);
    url = addIndex(url);
    // if (! free(url))  url = "/client/login.html"// return fail(response, NotFound, "Administrator access only");
    if (! valid(url)) return fail(response, NotFound, "Invalid URL");
    if (! safe(url))  return fail(response, NotFound, "Unsafe URL");
    if (! open(url))  return fail(response, NotFound, "URL has been banned");
    url = executeQuery(query,url);
    var type = findType(url);
    if (type == null) return fail(response, BadType, "File type unsupported");
    if (type == "text/html") type = negotiate(request.headers.accept);

    if(post =='POST') {
            var body='';
            request.on('data', function (data) {
                body +=data;
            });
            request.on('end',function(){
                commentFormSql.insertUser(body, db);
                console.log(body);
            });
    } else if (post === 'login'){
      var body='';
      request.on('data', function (data) {
          body +=data;
      });
      request.on('end',function(){
          url = authenticate.verify(query);
          console.log(body);
      });
    }

    reply(response, url, type);
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

// Retrieve the query part of a url.
function executeQuery(query, url) {
   if(url === "/client/info.html"){
    //  url = "/client/infotemp.html";
     url = buildInfo.buildInfoPage(query,fs);
   }else if(url === "/admin/messages.html"){
     url = buildMessgP.buildMessagesPage(db,fs);
   } else if (url === '/client/login'){
     url = authenticate.veryfy(query);
   }
   return url;
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
