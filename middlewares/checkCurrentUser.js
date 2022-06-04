const jwt = require('jsonwebtoken');

exports.checkCurrentUser = (req, res, next) => {
    // Access Authorization from req header
    const Authorization = req.header('authorization');

    if (!Authorization) {
        req.user = null;
        next();
    } else {
        const token = Authorization.replace('Bearer ', '');
        try {
            const { userId, role, area } = jwt.verify(
                token,
                process.env.APP_SECRET
            );
            req.user = { userId, role, area };
            next();
        } catch (error) {
            req.user = null;
            next();
        }
    }
};
