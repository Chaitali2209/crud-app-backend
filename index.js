const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js')

const app = express();

//configuring a middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/api/products', productRoute);

app.get('/', (req, res) => {
    res.send("Hello from Node API Server");
})

//first connecing the database then listen the server
mongoose.connect("mongodb+srv://chaitalipadalkar2002:IpOWustAPgYwdL46@backenddb.mwtaokx.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{
    console.log("Connected to Database..!");
    app.listen(3000, () =>{
        console.log('Server is runnning on port 3000')
    });
}).catch((error) => {
    console.error("❌ Connection failed:", error.message);
});