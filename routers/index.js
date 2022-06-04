const adminRoute = require('./admin.route');
const authRoute = require('./auth.route');
const facilityRoute = require('./facility.route');
// const { verifyToken } = require("../middlewares/verifyToken");

route = (app) => {
    app.use('/admin', adminRoute);
    app.use('/auth', authRoute);
    app.use('/facilities', facilityRoute);
    // app.all("*", (req, res, next) => {
    //     const err = new Error("The route can not be found");
    //     err.statusCode = 404;
    //     next(err);
    // });
};

module.exports = route;
