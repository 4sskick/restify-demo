// var products = require('../product.js');
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