require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

// Importation des routes
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
const commentRoutes = require('./routes/comments');

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connecté avec succès à MongoDB'))
  .catch(err => console.error('❌ Erreur de connexion MongoDB:', err));

// Configuration EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
// On ajoute le dossier de la boutique pour qu'il soit accessible via /boutique
app.use('/boutique', express.static('C:/GeminiProjects/Les Délices de Papy/public/boutique'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes publiques
const recipeController = require('./controllers/recipeController');
app.get('/', (req, res) => res.redirect('/boutique/index.html'));
app.get('/carnet', recipeController.getAllRecipesPublic);
app.get('/recipe/:id', recipeController.getRecipeDetailPublic);

app.use('/', authRoutes);
app.use('/', commentRoutes);

// Routes d'administration (protégées)
app.use('/admin', recipeRoutes);

app.listen(PORT, () => {
    console.log(`Le carnet de Papy Marcel est ouvert sur http://localhost:${PORT}`);
});
