const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    imageLargeUrl: String,
    imageUrl: String,
    imageThumbnailUrl: String,
    categoryId: { type: String, required: true },
    categoryName: { type: String, required: true },
    unitCost: Number,
    currentPrice: Number,
    currentPriceCarton: Number,
    isFeatured: { type: Boolean, default: false },
    isPopular: { type: Boolean, default: false },
    promotion: { type: Number, default: 0 },
    views: Number  
});

const Product = module.exports = mongoose.model('Product', ProductSchema);
module.exports.getAll = (callback) => {
    Product.find(callback);
}

module.exports.getByCategoryId = (id, callback) => {
    let query = { categoryId : id };
    Product.find(query, callback);
}

module.exports.add = (newProduct, callback) => {
    newProduct.save(callback);
}

module.exports.deleteById = (id, callback) => {
    let query = { _id: id };
    Product.remove(query, callback);
}

module.exports.updateById = (id,updateProduct, callback) => {
    Product.findByIdAndUpdate(id, updateProduct, callback);
}