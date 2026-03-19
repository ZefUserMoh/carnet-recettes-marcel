require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Intégration de vos photos PNG dans le carnet...");

        await Recipe.deleteMany({});

        const recipes = [
            {
                title: "Les Caramels Tendres au Beurre Salé",
                description: "La recette signature de Papy Marcel. Fondante, crémeuse et irrésistible.",
                ingredients: ["200g de sucre", "100ml de crème entière", "40g de beurre demi-sel", "Fleur de sel"],
                steps: ["Caramel à sec.", "Décuire à la crème.", "Lisser au beurre.", "Repos au frais."],
                imageUrl: "/images/recipes/caramel.webp"
            },
            {
                title: "Confiture de Fraises à l'Ancienne",
                description: "Le goût authentique des fruits mûris au soleil, cuits en chaudron.",
                ingredients: ["1kg de fraises", "800g de sucre", "Jus de citron", "Vanille"],
                steps: ["Macération.", "Cuisson lente.", "Mise en pot."],
                imageUrl: "/images/recipes/confiture.webp"
            },
            {
                title: "Tarte Tatin aux Pommes",
                description: "Des pommes fondantes et caramélisées, sur une pâte pur beurre.",
                ingredients: ["8 pommes", "150g de beurre", "150g de sucre", "Pâte brisée"],
                steps: ["Caramélisation des pommes.", "Cuisson au four.", "Dégustation tiède."],
                imageUrl: "/images/recipes/tatin.webp"
            },
            {
                title: "Mousse au Chocolat Intense",
                description: "Toute la force du cacao dans une mousse légère comme un nuage.",
                ingredients: ["200g de chocolat noir", "6 oeufs", "Sel"],
                steps: ["Fonte du chocolat.", "Mélange jaunes.", "Incorporation des blancs."],
                imageUrl: "/images/recipes/mousse.webp"
            },
            {
                title: "Pain d'Épices au Miel",
                description: "Une tradition parfumée au miel de montagne et aux épices douces.",
                ingredients: ["250g de miel", "250g de farine de seigle", "Epices"],
                steps: ["Mélange miel/lait.", "Cuisson lente 1h.", "Dégustation après 24h."],
                imageUrl: "/images/recipes/pain-epices.webp"
            }
        ];

        await Recipe.insertMany(recipes);
        console.log("Votre carnet est maintenant complet avec vos propres photos !");
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

seedDB();
