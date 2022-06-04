const express = require('express');
const admin = require('../controllers/admin.controller');

const Router = express.Router();
Router.route('/accounts').post(admin.createUser).get(admin.getAllUsers);
Router.route('/accounts/:userId')
    .get(admin.getUser)
    .put(admin.updateUser)
    .delete(admin.deleteUser);
Router.route('/areas').post(admin.createArea).get(admin.getAllAreas);
Router.route('/areas/:areaId')
    // .put(admin.updateArea)
    .get(admin.getArea)
    .delete(admin.deleteArea);

module.exports = Router;
