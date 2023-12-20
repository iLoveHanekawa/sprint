import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

http.createServer((req, res) => {
    console.log({ way: import.meta.url + '/index.html'});
    if(req.url === '/') {
        fs.readFile(import.meta.url + '/index.html', (err, data) => {
            if(err) {
                // console.log(err.message);
            }
            res.writeHead(200, {"Content-Type": "text/html"});  
            res.write(data);  
            res.end();
        });
    }
}).listen(3000);
