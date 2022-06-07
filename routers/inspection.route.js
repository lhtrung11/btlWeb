const express = require('express');
const inspection = require('../controllers/inspection.controller');

const Router = express.Router();
Router.route('/')
    .post(inspection.createInspection)
    .get(inspection.getAllInspection);
Router.route('/:inspectionId')
    .put(inspection.updateInspection)
    .get(inspection.getInspection)
    .delete(inspection.deleteInspection);

module.exports = Router;
