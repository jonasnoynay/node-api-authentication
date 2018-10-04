const express = require('express');

const app = express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost/node-express', { useNewUrlParser: true });

//middlewares
app.use(bodyParser.json());

app.use('/users', require('./app/routes/UserRouter'));

app.listen(port);
console.log(`Server listening to ${port}`);