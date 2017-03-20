var http = require('http');
var fs = require('fs');
var serve_static = require(`./modules/serve_static`);

var server = http.createServer(function(request, response){
	console.log(`Client Request URL: ${request.url}`);
	serve_static.serve(request, response);
});

server.listen(7077);
console.log('Running in localhost at port 6789');
