const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// Toutes ces routes nécessitent d'être connecté
router.use(authMiddleware);

// Dashboard principal admin
router.get('/dashboard', recipeController.getAdminDashboard);

// Ajouter une recette
router.get('/recipes/add', recipeController.showAddForm);
router.post('/recipes/add', upload.single('image'), recipeController.addRecipe);

// Modifier une recette
router.get('/recipes/edit/:id', recipeController.showEditForm);
router.post('/recipes/edit/:id', upload.single('image'), recipeController.updateRecipe);

// Supprimer une recette
router.get('/recipes/delete/:id', recipeController.deleteRecipe);

module.exports = router;
