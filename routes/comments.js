const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');

// Route publique pour ajouter un commentaire
router.post('/recipe/:recipeId/comment', commentController.addComment);

// Routes admin protégées
router.get('/admin/comments', authMiddleware, commentController.getAllCommentsAdmin);
router.get('/admin/comments/delete/:id', authMiddleware, commentController.deleteComment);

module.exports = router;
