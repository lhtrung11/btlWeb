const adminRoute = require('./admin.route');
const authRoute = require('./auth.route');
const facilityRoute = require('./facility.route');
const inspectionRoute = require('./inspection.route');
const { verifyToken } = require('../middlewares/verifyToken');
const { adminPortal } = require('../middlewares/adminPortal');

route = (app) => {
    app.use('/admin', verifyToken, adminPortal, adminRoute);
    app.use('/auth', authRoute);
    app.use('/facilities', facilityRoute);
    // app.use("/inspections", )
    app.all('*', (req, res, next) => {
        const err = new Error('API này không tồn tại');
        err.statusCode = 404;
        next(err);
    });
};

module.exports = route;
