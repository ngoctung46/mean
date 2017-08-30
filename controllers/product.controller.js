const express               = require('express');
const router                = express.Router();
const product               = require('../models/product');

router.get('/',(req, res) => {
    product.getAll((err, items) => {
        if(err) {
            res.json({ success: false, message: `Failed to load products. Error: ${err}` });
        } else {
            res.write(JSON.stringify({ success: true, items: items}, null, 2));
            res.end();
        }
    })
});

router.get('/:categoryId',(req, res) => {
    let categoryId = req.params.categoryId;
    product.getByCategoryId(categoryId,(err, items) => {
        if(err) {
            res.json({ success: false, message: `Failed to load products. Error: ${err}` });
        } else {
            res.write(JSON.stringify({ success: true, items: items}, null, 2));
            res.end();
        }
    });
});
router.post('/', (req, res) => {
    let newProduct = new product({
        name: req.body.name,
        description: req.body.description,
        imageLargeUrl: req.body.imageUrl,
        imageUrl: req.body.imageUrl,
        imageThumbnailUrl: req.body.imageThumbnailUrl,
        isFeatured: req.body.isFeatured,
        isPopular: req.body.isPopular,
        promotion: req.body.promotion,
        categoryId: req.body.categoryId,
        categoryName: req.body.categoryName,
        unitCost: req.body.unitCost,
        currentPriceCarton: req.body.currentPriceCarton,        
        currentPrice: req.body.currentPrice,
        views: 0
    });
    product.add(newProduct, (err, list) => {
        if (err) {
            res.json({ success: false, message: `Failed to create a new Product. Error: ${ err }`});
        } else {
            res.json({ success: true, message: `Added successfully.` });
        }
    });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let updateProduct = new product({
        _id: id,
        name: req.body.name,
        description: req.body.description,
        imageLargeUrl: req.body.imageUrl,
        imageUrl: req.body.imageUrl,
        imageThumbnailUrl: req.body.imageThumbnailUrl,
        isFeatured: req.body.isFeatured,
        isPopular: req.body.isPopular,
        promotion: req.body.promotion,
        categoryId: req.body.categoryId,
        categoryName: req.body.categoryName,
        unitCost: req.body.unitCost,
        currentPriceCarton: req.body.currentPriceCarton,
        currentPrice: req.body.currentPrice,
        views: 0
    });
    product.updateById(id, updateProduct, (err, list) => {
         if (err) {
            res.json({ success: false, message: `Failed to update a product. Error: ${ err }`});
        } else {
            res.json({ success: true, message: `Updated successfully.` });
        }
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    product.deleteById(id, (err,list) => {
        if (err) {
            res.json({ success: false, message: `Failed to delete product. Error: ${ err }` });
        } else if (list) {
            res.json( { success: true, message: `Deleted successfully` });
        } else {
            res.json( { success: false });
        }
    });
});


module.exports = router;