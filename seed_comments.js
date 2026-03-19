const mongoose = require('mongoose');
require('dotenv').config();
const Comment = require('./models/Comment');

const comments = [
    {
        recipeId: '69b6d7e86fd852ee73fef3de',
        author: 'Mamie Denise',
        content: 'Exactement comme ceux que je mangeais petite ! Merci Marcel pour ce partage.'
    },
    {
        recipeId: '69b6d7e86fd852ee73fef3de',
        author: 'Lulu_78',
        content: "Un délice, j'ai rajouté une petite pointe de fleur de sel supplémentaire."
    },
    {
        recipeId: '69b6d7e86fd852ee73fef3df',
        author: 'GourmetDuDimanche',
        content: 'La texture est parfaite, ni trop liquide ni trop ferme.'
    },
    {
        recipeId: '69b6d7e86fd852ee73fef3e0',
        author: 'Sophie_P',
        content: 'Toute la famille a adoré, surtout les pommes bien caramélisées.'
    },
    {
        recipeId: '69b6d7e86fd852ee73fef3e2',
        author: 'Jean-Paul',
        content: "Le secret du miel change tout ! Mon pain d'épices est enfin moelleux."
    }
];

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        await Comment.insertMany(comments);
        console.log('Commentaires ajoutés avec succès !');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
