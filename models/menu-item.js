const mongoose = require('mongoose');

const MenuItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    url: {
        type: String,
        required: true,
    },
    subItems: []
});

const MenuItem = module.exports = mongoose.model('MenuItem', MenuItemSchema);
module.exports.getAll = (callback) => {
    MenuItem.find(callback);
}

module.exports.add = (newItem, callback) => {
    newItem.save(callback);
}

module.exports.deleteById = (id, callback) => {
    let query = { _id: id };
    MenuItem.remove(query, callback);
}

module.exports.updateById = (id,updateItem, callback) => {
    MenuItem.findByIdAndUpdate(id, updateItem, callback);
}