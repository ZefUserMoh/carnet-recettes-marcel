const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Afficher le formulaire de connexion
exports.showLoginForm = (req, res) => {
    res.render('admin/login', { title: 'Connexion - Admin', error: null });
};

// Traiter la connexion
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('admin/login', { 
                title: 'Connexion - Admin', 
                error: 'Nom d\'utilisateur ou mot de passe incorrect.' 
            });
        }

        // Création du token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Stockage du token dans un cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.redirect('/admin/dashboard');

    } catch (err) {
        console.error(err);
        res.render('admin/login', { 
            title: 'Connexion - Admin', 
            error: 'Une erreur est survenue lors de la connexion.' 
        });
    }
};

// Déconnexion
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};
