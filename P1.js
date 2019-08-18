const httpModule = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
/*function compute(req, res) {
    const queryparam = urlParts.query;
    const queryparts = querystring.parse(queryparam);
    const result = parseFloat(queryparts.number1) + parseFloat(queryparts.number2);
    res.end(result.toString());
}
function onRequest(req,res){
    console.log("Hello everyone");
    fs.readFile(__dirname + '/home.html', 'utf8', function (err, st) {
        console.log('Callback Called');
        res.end(st);
    });
    console.log('returned');*/
function compute(req, res) {
    contentLength = req.headers['content-length'];
    let requestBody = '';
    req.on('data', function (chunk) {
        requestBody = requestBody + chunk.toString();
        if (requestBody.length >= contentLength) {

            const queryparts = querystring.parse(requestBody);
            const result = parseFloat(queryparts.number1) + parseFloat(queryparts.number2);
            res.end(result.toString());
        }
    });
}
function onRequest(req, res) {
    const urlParts = url.parse(req.url);
    if (req.url == '/add') {
        const stream = fs.createReadStream(__dirname + '/satya.html', 'utf8');
        console.log(req.url);
        stream.pipe(res);
    }
    else if (req.url == '/home') {
        const stream = fs.createReadStream(__dirname + '/home.html', 'utf8');
        console.log(req.url);
        stream.pipe(res);
    }
    else if (req.url == '/') {
        const stream = fs.createReadStream(__dirname + '/page1.html', 'utf8');
        console.log(req.url);
        stream.pipe(res);
    }
    else if (urlParts.pathname === "/add/compute")
    {
        compute(req, res);  
    }
    else {
        console.log(req.url);
        res.end('404 file I am so sorry');
    }
}
const server = httpModule.createServer(onRequest);
server.listen(8009);