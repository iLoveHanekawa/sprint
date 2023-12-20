"use strict";
exports.__esModule = true;
var http = require("http");
var fs = require("fs");
http.createServer(function (req, res) {
    console.log({ way: import.meta.url + '/index.html' });
    if (req.url === '/') {
        fs.readFile(import.meta.url + '/index.html', function (err, data) {
            if (err) {
                // console.log(err.message);
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
        });
    }
}).listen(3000);
