const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    imageUrl: String,
    subCategories: []
});

const Category = module.exports = mongoose.model('Category', CategorySchema);
module.exports.getAll = (callback) => {
    Category.find(callback);
}

module.exports.add = (newCategory, callback) => {
    newCategory.save(callback);
}

module.exports.deleteById = (id, callback) => {
    let query = { _id: id };
    Category.remove(query, callback);
}

module.exports.updateById = (id,updateCategory, callback) => {
    Category.findByIdAndUpdate(id, updateCategory, callback);
}