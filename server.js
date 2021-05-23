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

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));
  
    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
//Routes
app.use('/api/files', require('./routes/files'));
app.use('/files',require('./routes/show'));  //for render to dowload page
app.use('/files/download',require('./routes/download'));

app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`) ;
})