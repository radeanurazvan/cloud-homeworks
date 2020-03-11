const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const batteriesController = require('./controllers/batteries.controller');

mongoose.Promise = global.Promise;
mongoose.connect(config.connectionStrings.mongo, { useNewUrlParser: true })
    .then(() => { console.log('Database is connected'); })
    .catch(err => { console.log('Cannot connect to db ' + err) });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/batteries', batteriesController);

let port = process.env.PORT || 4000;

app.listen(port, function(){
    console.log('Listening on port ' + port);
});