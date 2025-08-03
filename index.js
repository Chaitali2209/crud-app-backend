require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js')
const errorHandler = require('./middleware/errorHandler.js');

const app = express();

//configuring a middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// custom logger middleware
const logger = require('./middleware/logger');
app.use(logger);

// routes
app.use('/api/products', productRoute);

// error handling middleware (always after routes)
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send("Hello from Node API Server");
})

//first connecing the database then listen the server
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Connected to Database..!");
    app.listen(3000, () =>{
        console.log('Server is runnning on port 3000')
    });
}).catch((error) => {
    console.error("❌ Connection failed:", error.message);
});