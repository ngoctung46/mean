const express               = require('express');
const router                = express.Router();
const bucketList            = require('../models/list');

router.get('/',(req, res) => {
    console.log('RUN');
    bucketList.getAllLists((err, lists) => {
        if(err) {
            res.json({ success: false, message: `Failed to load all lists. Error: ${err}` });
        } else {
            res.write(JSON.stringify({ success: true, lists: lists }, null, 2));
            res.end();
        }
    })
});

router.post('/', (req, res) => {
    let newList = new bucketList({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category
    });
    bucketList.addList(newList, (err, list) => {
        if (err) {
            res.json({ success: false, message: `Failed to create a new list. Error: ${ err }`});
        } else {
            res.json({ success: true, message: `Added successfully.` });
        }
    });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let updateList = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category
    };
    bucketList.updateListById(id, updateList, (err, list) => {
         if (err) {
            res.json({ success: false, message: `Failed to update a list. Error: ${ err }`});
        } else {
            res.json({ success: true, message: `Updated successfully.` });
        }
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    bucketList.deleteListById(id, (err,list) => {
        if (err) {
            res.json({ success: false, message: `Failed to delete the list. Error: ${ err }` });
        } else if (list) {
            res.json( { success: true, message: `Deleted successfully` });
        } else {
            res.json( { success: false });
        }
    });
});



module.exports = router;