require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const reset = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const user = await User.findOne({ username: 'PapyMarcel' });
        if (user) {
            user.password = 'papy_secret_123';
            await user.save();
            console.log("Mot de passe réinitialisé à : papy_secret_123");
        } else {
            console.log("Utilisateur non trouvé !");
        }
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

reset();
