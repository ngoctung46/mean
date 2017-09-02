const express               = require('express');
const path                  = require('path');
const bodyParser            = require('body-parser');
const cors                  = require('cors');
const mongoose              = require('mongoose');
const config                = require('./config/database');
const bucketlist            = require('./controllers/bucketlist');
const menuItemController    = require('./controllers/menu.controller');
const categoryController    = require('./controllers/category.controller');
const productController     = require('./controllers/product.controller');
// Connect to db
mongoose.connect(config.database, { useMongoClient: true });

// Initialize app variable
const app                   = express();

// Declaring Port
const port                  = process.env.PORT || 3000;

// Middle wares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, `public`)));

// Routes
app.get('/', (req, res) => {
    res.send("Invalid page");
});

app.use('/api/bucketlist', bucketlist);
app.use('/api/menu', menuItemController);
app.use('/api/category', categoryController);
app.use('/api/product', productController);
// Listening to 3000 port
app.listen(port, () => {
    console.log(`Starting the server at port ${ port }`);
});