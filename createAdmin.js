require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connecté à MongoDB...');

        const username = 'PapyMarcel';
        const password = 'papy_secret_123'; // Vous pourrez le changer plus tard

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('L\'utilisateur PapyMarcel existe déjà.');
        } else {
            const newUser = new User({ username, password });
            await newUser.save();
            console.log(`Compte créé avec succès !`);
            console.log(`Nom d'utilisateur: ${username}`);
            console.log(`Mot de passe: ${password}`);
        }

        mongoose.connection.close();
    } catch (err) {
        console.error('Erreur lors de la création de l\'admin:', err);
    }
};

createAdmin();
