const express = require('express');
const public = require('../controllers/public.controller');

const Router = express.Router();
Router.route('/areas').get(public.areas);

module.exports = Router;
