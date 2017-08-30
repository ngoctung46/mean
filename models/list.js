const mongoose = require('mongoose');

const BucketListSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: String,
        required: true,
        enum: ['High', 'Medium', 'Low']
    }
});

const BucketList = module.exports = mongoose.model('BucketList', BucketListSchema);
module.exports.getAllLists = (callback) => {
    BucketList.find(callback);
}

module.exports.addList = (newList, callback) => {
    newList.save(callback);
}

module.exports.deleteListById = (id, callback) => {
    let query = { _id: id };
    BucketList.remove(query, callback);
}

module.exports.updateListById = (id,updateList, callback) => {
    let query = {_id: id };
    BucketList.findByIdAndUpdate(id, updateList, callback);
}