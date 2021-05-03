const express = require('express');
const app = express();
const path = require('path');
const PORT=process.env.PORT || 3000;

app.use(express.static('public'));  //for css
app.use(express.json());            //for json

const connectDB = require('./config/db');
connectDB();


//Template engine
app.set('views',path.join(__dirname,'/views')); //for ejs
app.set('view engine','ejs');


//Routes
app.use('/api/files', require('./routes/files'));
app.use('/files',require('./routes/show'));  //for render to dowload page
app.use('/files/download',require('./routes/download'));

app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`) ;
})