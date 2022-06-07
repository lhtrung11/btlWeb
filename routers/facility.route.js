const express = require('express');
const facility = require('../controllers/facility.controller');
const { verifyToken } = require('../middlewares/verifyToken');

const Router = express.Router();
Router.route('/')
    .post(verifyToken, facility.createFacility)
    .get(verifyToken, facility.getAllFacilities);
Router.route('/:facilityId')
    .put(verifyToken, facility.updateFacility)
    .get(verifyToken, facility.getFacility)
    .delete(verifyToken, facility.deleteFacility);
Router.route('/free').get(facility.getAllFacilitiesFree);
Router.route('/free/:facilityId').get(facility.getFacilityFree);

module.exports = Router;
