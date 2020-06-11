const express = require('express');

const Routes = express.Router();

const States = require('./Controller/StatesController');

Routes.get('/states', States.index);

module.exports = Routes;