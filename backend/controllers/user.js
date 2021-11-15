// Package de cryptage du mot de passe
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

// Créé un compte utilisateur
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) // Fonction de cryptage du mot de passe
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        backgroundColor: "w1",
        title: "memento",
        password: hash,
      });
      user
        .save() // Sauvegarde du compte utilisateur
        .then((user) =>
          res.status(201).json({
            email: user.email,
            userId: user._id,
            backgroundColor: user.backgroundColor,
            title: user.title,
            token: jwt.sign(
              // Création d'un token
              { userId: user._id }, // Encode l'id du compte utilisateur
              "process.env.TOKEN",
              { expiresIn: "24h" } // Expiration du token
            ),
            message: "Utilisateur créé !",
          })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Récupère un compte utilisateur
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // Recherche du compte utilisateur
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password) // Vérification du mot de passe
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            email: user.email,
            userId: user._id,
            backgroundColor: user.backgroundColor,
            title: user.title,
            token: jwt.sign(
              // Création d'un token
              { userId: user._id }, // Encode l'id du compte utilisateur
              "process.env.TOKEN",
              { expiresIn: "24h" } // Expiration du token
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//Modifier compte utilisateur
exports.modifyUser = (req, res, next) => {
  User.updateOne(
    { _id: res.locals.userId },
    {
      backgroundColor: req.body.backgroundColor,
      title: req.body.title,
    }
  ).then(() =>
    res.status(200).json({
      message: "Utilisateur modifié !",
    })
  );
  User.findOne({ _id: res.locals.userId })
    .then((user) =>
      res.status(201).json({
        title: user.title,
        backgroundColor: user.backgroundColor,
      })
    )
    .catch((error) => res.status(400).json({ error }));
};