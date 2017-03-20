var http = require('http');
var fs = require('fs');
module.exports = {
	serve: function(request, response){

		// List of views URLs and markup files
		var views = {
			'/cars': './views/cars.html',
			'/cars/new': './views/newCar.html',
			'/cats': './views/cats.html'
		}

		// Regex to test wither request.url is a file and whether it is a CSS file.
		var fileTest = /^[a-zA-Z0-9\/_#$%^(){}[\]]+\.[a-zA-Z]+$/
		var cssTest = /^[a-zA-Z0-9\/_#$%^(){}[\]]+\.css$/

			// Conditional to determine what type of file to serve
			if(fileTest.test(request.url)){
				// Conditional to determine whether to serve a CSS file or an image file
				if(request.url.match(cssTest)){
					fs.readFile(`.${request.url}`, 'utf8', function(errors, contents){
						response.writeHead(200, {'Content-Type': 'text/css'});
						response.write(contents);
						response.end();
					})
				}
				else{
					var ext = '', file = request.url, len = file.length - 1, found = '', sniff;

					while(sniff != '.'){
						sniff = file[len];
						found += sniff;
						len--;
					}
					for(var i = found.length -1; i >= 0; i--){
						ext += found[i];
					}
					fs.readFile(`.${request.url}`, function(errors, contents){
						response.writeHead(200, {'Content-Type': `image/${ext}`});
						response.write(contents);
						response.end();
					})
				}
			}
			else{
				if(views[request.url]){
					fs.readFile(views[request.url], 'utf8', function(errors, contents){
						response.writeHead(200, {'Content-Type': 'text/html'});
						response.write(contents);
						response.end();
					})
				}
				else{
					response.writeHead(404);
					response.end('The requested URL is not available');
				}

			}
	},
}
