const express = require('express');
const facility = require('../controllers/facility.controller');

const Router = express.Router();
Router.route('/').post(facility.createFacility).get(facility.getAllFacilities);
Router.route('/:facilityId')
    .put(facility.updateFacility)
    .get(facility.getFacility)
    .delete(facility.deleteFacility)
    .patch(facility.updateLicense);

module.exports = Router;
