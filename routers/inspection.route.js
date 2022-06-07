const express = require('express');
const inspection = require('../controllers/inspection.controller');
const { verifyToken } = require('../middlewares/verifyToken');

const Router = express.Router();
Router.route('/').get(verifyToken, inspection.getAllInspections);
Router.route('/:inspectionId')
    .post(verifyToken, inspection.createInspection)
    .put(verifyToken, inspection.updateInspection)
    .get(verifyToken, inspection.getInspection);
// .delete(verifyToken, facility.deleteFacility);
// Router.route('/free').get(facility.getAllFacilitiesFree);
// Router.route('/free/:facilityId').get(facility.getFacilityFree);

module.exports = Router;
