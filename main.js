const http = require('http');
const url = require('url');
const fs = require('fs');
const calculator = require('./caculator'); 

const server = http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    const query = url.parse(req.url, true).query;
    if (path === '/') {
        fs.readFile(__dirname + '/index.html', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('404 Not Found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
        return;
    }
    let result;
    try {
        if (path === '/add') {
            result = calculator.add(parseFloat(query.num1), parseFloat(query.num2));
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Addition of two numbers: ${result}`);
        } else if (path === '/sub') {
            result = calculator.subtract(parseFloat(query.num1), parseFloat(query.num2));
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Subtraction of two numbers: ${result}`);
        } else if (path === '/mul') {
            result = calculator.multiply(parseFloat(query.num1), parseFloat(query.num2));
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Multiplication of two numbers: ${result}`);
        } else if (path === '/divide') {
            const num2 = parseFloat(query.num2);
            if (num2 === 0) {
                throw new Error("Cannot divide by zero");
            }
            result = calculator.divide(parseFloat(query.num1), num2);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Division of two numbers: ${result}`);
        } else if (path === '/power') {
            result = calculator.power(parseFloat(query.num1), parseFloat(query.num2));
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Exponentiation of two numbers: ${result}`);
        } else if (path === '/modulo') {
            result = calculator.modulo(parseFloat(query.num1), parseFloat(query.num2));
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Modulo of two numbers: ${result}`);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end(`Error: ${error.message}`);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
