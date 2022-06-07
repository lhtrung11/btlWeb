const express = require('express');
const inspection = require('../controllers/inspection.controller');
const { verifyToken } = require('../middlewares/verifyToken');

const Router = express.Router();
Router.route('/')
    .get(verifyToken, inspection.getAllInspections)
    .post(verifyToken, inspection.createInspection);
Router.route('/:inspectionId')
    .put(verifyToken, inspection.updateInspection)
    .get(verifyToken, inspection.getInspection);
// .delete(verifyToken, facility.deleteFacility);
// Router.route('/free').get(facility.getAllFacilitiesFree);
// Router.route('/free/:facilityId').get(facility.getFacilityFree);

module.exports = Router;
