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

var productsController = {
    get: function (req, res, next) {
        res.status(200);
        res.json(that.store);

        return next();
    },

    getById: function (req, res, next) {
        var found = findProductsById(req);
        if (found) {

            res.status(200);
            res.json(found);
        } else {

            res.status(404);
            res.json({ status: "Product not found" });
        }
        return next();
    },

    post: function (req, res, next) {
        if (!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('name')) {

            res.status(500);
            res.json({ status: "something wrong with server" });
        } else {
            that.store.push({
                id: parseInt(req.body.id),
                name: req.body.name
            });

            res.status(201);
            res.json({ status: "success" });
        }
        return next();
    },

    putById: function (req, res, next) {
        if (!req.body.hasOwnProperty('name')) {

            res.status(500);
            res.json({ status: "something wrong with server" });

            return next();
        }
        var found = findProductsById(req);
        if (found) {
            found.name = req.body.name;

            res.status(200);
            res.json(found);
        } else {
            res.status(404);
            res.json({ status: "Product Not Found" });
        }
        return next();
    },

    deleteById: function (req, res, next) {
        that.store = that.store.filter(function (p) {
            return p.id !== parseInt(req.params.id);
        });

        res.status(200);
        res.json({ status: "success" });

        return next();
    }
}
module.exports = { productsController };