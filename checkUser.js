require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const user = await User.findOne({ username: 'PapyMarcel' });
        if (user) {
            console.log("Utilisateur trouvé :", user.username);
            console.log("Mot de passe (hashé) :", user.password);
        } else {
            console.log("Utilisateur 'PapyMarcel' NON TROUVÉ !");
        }
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

check();
