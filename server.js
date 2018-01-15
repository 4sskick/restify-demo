var path = require('path');
var restify = require('restify');
var products = require('./product.js');
var swaggerJSDoc = require('swagger-jsdoc');
var port = process.env.port || 3000;

var server = restify.createServer({
    name: "simple restify server"
});

// swagger definition
var swaggerDefinition = {
    info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:3000',
    basePath: '/public',
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./*.js']
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

//setting up the module wanna use
server.use(function (req, res, next) {
    console.log(req.method + ' ' + req.url);
    return next();
});

//serve static folder
server.get('/api-docs', restify.plugins.serveStatic({
    directory: __dirname + '/public',
    default: 'index.html'
}));

server.use(restify.plugins.bodyParser());

//create router
server.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
/**
 * @swagger
 * definitions:
 *   Products:
 *     properties:
 *       name:
 *         type: string
 *       breed:
 *         type: string
 *       age:
 *         type: integer
 *       sex:
 *         type: string
 */
/**
 * @swagger
 * /api/products:
 *  get:
 *      tags:
 *          - Products
 *      description: Return all products
 *      produces:
 *          - application/json
 *      response:
 *          200:
 *              description: Array of products
 *              schema:
 *                  $ref: '#/definition/products'
 */
server.get('api/products', products.productsController.get);
server.get('api/products/:id', products.productsController.getById);
server.post('api/products', products.productsController.post);
server.put('api/products/:id', products.productsController.putById);
server.del('api/products/:id', products.productsController.deleteById);

//ser the listen post of server
server.listen(port, function () {
    console.log("listening to port: " + port);
});