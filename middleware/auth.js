const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Récupération du token depuis les cookies
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        // Vérification du token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.clearCookie('token');
        return res.redirect('/login');
    }
};
