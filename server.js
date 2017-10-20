var restify = require('restify');
var products = require('./product.js');
var port = process.env.port || 3000;

var server = restify.createServer({
    name: "simple restify server"
});

//setting up the module wanna use
server.use(function (req, res, next) {
    console.log(req.method + ' ' + req.url);
    return next();
});

server.use(restify.plugins.bodyParser());

//create router
server.get('api/products', products.productsController.get);
server.get('api/products/:id', products.productsController.getById);
server.post('api/products', products.productsController.post);
server.put('api/products/:id', products.productsController.putById);
server.del('api/products/:id', products.productsController.deleteById);

//ser the listen post of server
server.listen(port, function () {
    console.log("listening to port: " + port);
});