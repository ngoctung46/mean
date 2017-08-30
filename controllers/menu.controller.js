const express               = require('express');
const router                = express.Router();
const menuItem              = require('../models/menu-item');

router.get('/',(req, res) => {
    menuItem.getAll((err, items) => {
        if(err) {
            res.json({ success: false, message: `Failed to load menu items. Error: ${err}` });
        } else {
            res.write(JSON.stringify({ success: true, items: items}, null, 2));
            res.end();
        }
    })
});

router.post('/', (req, res) => {
    let newItem = new menuItem({
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
        subItems: req.body.subItems 
    });
    menuItem.add(newItem, (err, list) => {
        if (err) {
            res.json({ success: false, message: `Failed to create a new item. Error: ${ err }`});
        } else {
            res.json({ success: true, message: `Added successfully.` });
        }
    });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let updateItem = {
        _id: id,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
        subItems: req.body.subItems
    };
    menuItem.updateById(id, updateItem, (err, list) => {
         if (err) {
            res.json({ success: false, message: `Failed to update a menu item. Error: ${ err }`});
        } else {
            res.json({ success: true, message: `Updated successfully.` });
        }
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    menuItem.deleteById(id, (err,list) => {
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