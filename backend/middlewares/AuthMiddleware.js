const jwt = require('jsonwebtoken');

const AuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    // console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // console.log("auth");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("auth2");
        req.userId = decoded._id; // Attach user ID to request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = AuthMiddleware;
