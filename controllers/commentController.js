const Comment = require('../models/Comment');
const mongoose = require('mongoose');

// Ajouter un commentaire à une recette
exports.addComment = async (req, res) => {
    const { author, content } = req.body;
    const recipeId = req.params.recipeId;

    try {
        const newComment = new Comment({
            recipeId,
            author,
            content
        });
        await newComment.save();
        res.redirect(`/recipe/${recipeId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de l\'ajout du commentaire.');
    }
};

// Supprimer un commentaire (Admin uniquement)
exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;

        // Si l'ID n'est pas valide (ex: "back"), on redirige simplement
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.redirect('/admin/comments');
        }

        await Comment.findByIdAndDelete(commentId);
        // On redirige vers la page de modération par défaut pour éviter les boucles
        res.redirect('/admin/comments');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la suppression du commentaire.');
    }
};

// Récupérer tous les commentaires pour la modération
exports.getAllCommentsAdmin = async (req, res) => {
    try {
        const comments = await Comment.find().populate('recipeId').sort({ createdAt: -1 });
        res.render('admin/comments', { 
            title: 'Modération des Commentaires - Admin', 
            comments 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération des commentaires.');
    }
};
