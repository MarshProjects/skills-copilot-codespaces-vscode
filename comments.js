// Create web server
// Run: node comments.js
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");

    if (pathname === "/") {
        // Read the file
        fs.readFile("comments.html", function (err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, { 'Content-Type': 'text/html' });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data.toString());
            }
            res.end();
        });
    } else if (pathname === "/getComments") {
        // Read the comments from the file
        fs.readFile("comments.txt", function (err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, { 'Content-Type': 'text/html' });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data.toString());
            }
            res.end();
        });
    } else if (pathname === "/addComment") {
        // Get the data
        var body = '';
        req.on('data', function (chunk) {
            body += chunk.toString();
        });
        req.on('end', function () {
            var comment = qs.parse(body).comment;
            // Append to the file
            fs.appendFile("comments.txt", comment + "\n", function (err) {
                if (err) {
                    console.log(err);
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                }
                res.end();
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end();
    }
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');