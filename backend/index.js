const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors'); 
const path = require('path');

// ROUTES
const AdminRoutes = require('./03routes/Admin');
const ProductRoutes = require('./03routes/product');
const CategoryRoutes = require('./03routes/category');
const InputRoutes = require('./03routes/input');
const OutputRoutes = require('./03routes/outputRoute');


// const MONGODB_URI =`mongodb://localhost:27017/Jasuraka`;
const MONGODB_URI =`mongodb+srv://Admin:aaa3081861@jasuraka-sklad-ap2nd.gcp.mongodb.net/sklad?retryWrites=true&w=majority`;

const app = express();

app.use(express.static(path.join(__dirname, 'adminka')));

app.use(helmet());
app.use(compression());

app.use(bodyParser.json());

app.use(cors());

app.use(AdminRoutes);
app.use(ProductRoutes);
app.use(CategoryRoutes);
app.use(InputRoutes);
app.use(OutputRoutes);

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, 'adminka/adminka.html'));
});

app.use((err, req, res, next) => {
    console.log(err);
    const status = err.statusCode;
    const message = err.message;
    const data = error.data;
    res.status(status).json({message, data});
})

mongoose
  .connect(MONGODB_URI,{useUnifiedTopology: true, useNewUrlParser: true})
  .then(result => {
    console.log('connected');
    app.listen(process.env.PORT || 8000);
  })
  .catch(err => {
    console.log(err);
  });