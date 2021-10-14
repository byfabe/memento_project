// Package de cryptage du mot de passe
const bcrypt = require('bcrypt');
const User = require('../models/user');
//const jwt = require('jsonwebtoken'); 

// Créé un compte utilisateur
exports.signup = (req, res, next) => { 
    bcrypt.hash(req.body.password, 10) // Fonction de cryptage du mot de passe
    .then(hash => {
        const user = new User ({
            email: req.body.email,
            password: hash
        });
        user.save() // Sauvegarde du compte utilisateur
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};