import  Express  from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";





import postRoutes from './routes/posts.js';


// newer version of node get rid of const express = require("express") method , by adding type module in package.json


const app = Express();
const path =  require('path');


app.use(bodyParser.json({limit : "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}));
app.use(cors());

app.use('/posts', postRoutes);

app.use(express.static(path.join(__dirname, './client/memorylane/build')));

app.get('*', function (req , res) {
    res.sendFile(path.join(__dirname, './client/memorylane/build/index.html'))
});

const CONNECTION_URL = 'mongodb+srv://shweta:shwetarathore@cluster0.o5l0r3n.mongodb.net/';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser : true , useUnifiedTopology : true })
.then( () => app.listen ( PORT, () => console.log(`Server running on port: http://localhost: ${PORT}`)) )
.catch( (error) => console.log(error.message) );

mongoose.set('useFindAndModify', false);








