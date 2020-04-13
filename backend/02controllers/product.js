const Product = require('../01models/product');

exports.getProducts = async (req, res, next) => {
    let range;
    let skip = 0;
    let limit = 0;
    if(req.query.range) {
        range =  JSON.parse(req.query.range);
        skip = range[0] || 0;
        limit = range[1] - skip + 1;
    }
    // Filters
    let config = {};
    if(req.query.filter){
        const filter = JSON.parse(req.query.filter);
        for(let key in filter) {
            if(key === 'price' || key === 'categoryId' || key === 'order'){ 
                config[key] = filter[key]; 
            } else if (key === 'ids') {
                config['_id'] = filter[key]
            } else if(key === 'q') {
                config['name'] = { '$regex' : filter[key], '$options' : 'i' };
            }
            else { config[key] = { '$regex' : filter[key], '$options' : 'i' } }
        }
    }
    // SORT
    let sort = {};
    if(req.query.sort) {
        const [key, value] = JSON.parse(req.query.sort);
        sort = {
            [`${key}`]: value === 'DESC' ? -1 : 1
        }
    }

    try {
        const [totalItems, products] = await Promise.all([
            Product.find(config).countDocuments(),
            Product.find(config).skip(skip).limit(limit).sort(sort)
        ])
        res.status(200).json({
            data: products.map(p => ({
                id: p._id.toString(),
                ...p._doc
            })),
            total: totalItems
        })
    } catch(err) {
    if(!err.statusCode) {
        err.statusCode = 500;
    }
    next(err)
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        let product;
        if(!req.body.order) {
            const totalItems = await Product.find().countDocuments();
            product = new Product({...req.body, order: totalItems + 1})
        } else {
            product = new Product({...req.body});
        }
        const createdProduct = await product.save();
        res.status(201).json({
            ...createdProduct._doc, 
            id: createdProduct._id.toString()
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
};

exports.editProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        for(let key in req.body) {
            product[key] = req.body[key];
        }
        const updatedProduct = await product.save();
        res.status(201).json({
            ...updatedProduct._doc, 
            id: updatedProduct._id.toString()
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            const err = new Error('Tovar topilmadi!');
            err.statusCode = 404;
            throw err;
        }
        res.status(200).json({
            data: {
                ...product._doc, 
                id: product._id.toString()
            }
        })
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            data: []
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteProducts = async (req, res, next) => {
    const filter = JSON.parse(req.query.filter);
    await Product.deleteMany({_id: filter.id});
    res.status(200).json({
      data: []
    });
}