const express = require("express");
const productRouter = require("./app/products/route");
const productRouterV2 = require('./app/product_v2/router')
const log = require("./middlewere/logger");
const logger = require("morgan");
const bodyParser = require('body-parser');
const path = require("path");
const upload = require('./config/multerConfig')
const fs = require('fs')

const app = express();

app.use(logger("dev"));
app.use(log);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1', productRouter);
app.use('/api/v2', productRouterV2);
app.use('/',(req,res)=>{
  res.send({
    message: 'Welcome to my express'
  })
})
app.use((req,res)=>{
    res.send({
        status:'failed',
        message:'page not found'
    })
})
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

export default app