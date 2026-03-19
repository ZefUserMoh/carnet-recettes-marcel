const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');

// --- PARTIE PUBLIQUE ---

// Afficher toutes les recettes pour les visiteurs
exports.getAllRecipesPublic = async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 });
        res.render('index', { 
            title: 'Le Carnet de Papy Marcel', 
            recipes,
            activePage: 'carnet'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération des recettes.');
    }
};

// Afficher le détail d'une recette pour les visiteurs
exports.getRecipeDetailPublic = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).send('Recette non trouvée.');
        
        // On cherche les commentaires liés à cette recette
        const comments = await Comment.find({ recipeId: recipe._id }).sort({ createdAt: -1 });
        
        res.render('recipe', { 
            title: recipe.title + ' - Recettes de Papy Marcel', 
            recipe,
            comments,
            activePage: 'carnet'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors du chargement de la recette.');
    }
};

// --- PARTIE ADMIN ---

// Afficher toutes les recettes sur le dashboard admin
exports.getAdminDashboard = async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 });
        res.render('admin/dashboard', { 
            title: 'Tableau de Bord - Admin', 
            recipes,
            activePage: 'admin'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération des recettes.');
    }
};

// Afficher le formulaire d'ajout
exports.showAddForm = (req, res) => {
    res.render('admin/edit-recipe', { 
        title: 'Ajouter une Recette', 
        recipe: null 
    });
};

// Ajouter une nouvelle recette
exports.addRecipe = async (req, res) => {
    const { title, description, ingredients, steps } = req.body;
    
    // On transforme les chaînes de caractères en tableaux
    const ingredientsArray = ingredients.split('\n').filter(i => i.trim() !== '');
    const stepsArray = steps.split('\n').filter(s => s.trim() !== '');

    // Récupération de l'image téléchargée (si présente)
    let imageUrl = '';
    if (req.file) {
        imageUrl = '/images/recipes/' + req.file.filename;
    }

    try {
        const newRecipe = new Recipe({
            title,
            description,
            ingredients: ingredientsArray,
            steps: stepsArray,
            imageUrl
        });
        await newRecipe.save();
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de l\'ajout de la recette.');
    }
};

// Afficher le formulaire de modification
exports.showEditForm = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).send('Recette non trouvée.');
        
        res.render('admin/edit-recipe', { 
            title: 'Modifier la Recette', 
            recipe 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors du chargement de la recette.');
    }
};

// Modifier une recette existante
exports.updateRecipe = async (req, res) => {
    const { title, description, ingredients, steps } = req.body;
    const ingredientsArray = ingredients.split('\n').filter(i => i.trim() !== '');
    const stepsArray = steps.split('\n').filter(s => s.trim() !== '');

    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).send('Recette non trouvée.');

        let imageUrl = recipe.imageUrl; // On garde l'ancienne image par défaut
        
        // Si une nouvelle image a été téléchargée
        if (req.file) {
            imageUrl = '/images/recipes/' + req.file.filename;
        }

        await Recipe.findByIdAndUpdate(req.params.id, {
            title,
            description,
            ingredients: ingredientsArray,
            steps: stepsArray,
            imageUrl
        });
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la mise à jour.');
    }
};

// Supprimer une recette
exports.deleteRecipe = async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la suppression.');
    }
};
