const express = require('express');

const Routes = express.Router();

Routes.get('/', (req, res) => res.send('Hello World'));

module.exports = Routes;