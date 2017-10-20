// var productController = function productsController(){
var that = this;
that.store = [];

//method for handling the routes
var findProductsById = function (req) {
    var found = that.store.filter(function (p) {
        return p.id === parseInt(req.params.id);
    });

    if (found && found.length > 0) {
        return found[0];
    }
    return null;
};

that.get = function (req, res, next) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(that.store));

    res.end();
    return next();
};

that.getById = function (req, res, next) {
    var found = findProductsById(req);
    if (found) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(found));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ status: "Product Not Found" }));
    }
    res.end();
    return next();
};

that.post = function (req, res, next) {
    if (!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('name')) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ status: "something wrong with server" }));
    } else {
        that.store.push({
            id: parseInt(req.body.id),
            name: req.body.name
        });
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ status: "success" }));
    }
    res.end();
    return next();
};

that.putById = function (req, res, next) {
    if (!req.body.hasOwnProperty('name')) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ status: "something wrong with server" }));
        return next();
    }
    var found = findProductsById(req);
    if (found) {
        found.name = req.body.name;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(found));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ status: "Product Not Found" }));
    }
    res.end();
    return next();
};

that.deleteById = function (req, res, next) {
    that.store = that.store.filter(function (p) {
        return p.id !== parseInt(req.params.id);
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ status: "success" }));

    res.end();
    return next();
};

that.printMsg = function () {
    console.log("printed here");
}

module.exports = that;
// };

// module.exports = {
//     ProductsController: new productsController()
// }