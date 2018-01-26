var express = require('express');
var router = express.Router();
var passport = require('passport');
var Historique = require('../models/historique');
var Commandes = require('../models/commande');
var Compte = require('../models/compte');
var Client = require('../models/client');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', notLoggedIn, function(req, res, next){
  res.render('users/login');
});

router.post('/login',notLoggedIn, passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/users/login',
    failureFlash: true

}));

router.post('/register', notLoggedIn,passport.authenticate('register', {
    successRedirect: '/users/login',
    failureRedirect: '/',
    failureFlash: true

}));

router.get('/auth/facebook',notLoggedIn, passport.authenticate('facebook', {scope: ['public_profile', 'email']}));

router.get('/auth/facebook/callback', notLoggedIn,passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/'
}));

router.get('/auth/google', notLoggedIn,passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/auth/google/callback', notLoggedIn,passport.authenticate('google',{
    successRedirect: '/home',
    failureRedirect: '/'
}));

router.get('/auth/twitter', notLoggedIn,passport.authenticate('twitter'));

router.get('/auth/twitter/callback', notLoggedIn,passport.authenticate('twitter', {
    sucessRedirect: '/home',
    failureRedirect: '/'
}));

router.get('/profil', isLoggedIn, function(req, res, next){
    var user = req.user;
    Historique.find({compteID: user.compteID}, function(err, historiques){
        Compte.findById(user.compteID, function(err, compte){
            console.log(historiques);
            res.render('users/profil', {admin: user, historiques: historiques, compte: compte});
        });
    });
});

router.post('/editprofile', isLoggedIn, function (req, res, next){
    Client.findById(req.user._id, function(err, client){
       if(req.body.passwordRegister == req.body.confirmpasswordRegister){
           client.local.nom = req.body.nom;
           client.local.prenom = req.body.prenom;
           if(client.local.password != req.body.passwordRegister){
               client.local.password = client.encryptPassword(req.body.passwordRegister);
           }
           client.local.email = req.body.emailRegister;
           client.local.quartier = req.body.quartier1;
           client.local.ville = req.body.ville1;
           client.local.tel = req.body.tel;
           client.save();
           req.flash('editprofilMessage', 'Votre Profil a été modifié avec succes');
           req.user = client;
           Historique.find({compteID: client.compteID}, function(err, historiques){
               Compte.findById(client.compteID, function(err, compte){
                   console.log(historiques);
                   res.render('users/profil', {admin: client, historiques: historiques, compte: compte, editmessage: req.flash('editprofilMessage')});
               });
           });
       }
       else{
           var user = req.user;
           req.flash('editprofilMessage', 'Les Mots de Passe ne correspondent pas');
           Historique.find({compteID: user.compteID}, function(err, historiques){
               Compte.findById(user.compteID, function(err, compte){
                   console.log(historiques);
                   res.render('users/profil', {admin: user, historiques: historiques, compte: compte, editmessage: req.flash('editprofilMessage')});
               });
           });
       }
    });
});

router.post('/rechargeCompte', function (req, res, next) {
   Compte.findById(req.user.compteID, function(err, compte){
       var recharge = parseInt(req.body.montantRecharge);
       var historique = new Historique();
       historique.compteID = compte._id;
       historique.description = "Vous Avez Rechargé " + recharge + " dans votre compte le " + historique.date.toDateString();
       historique.save();
       compte.montant += recharge;
       compte.save();
       res.redirect('/users/profil');
   })
});


router.get('/logout', function(req, res){
  req.logout();
  if(req.session.cart){
      req.session.cart = {};
  }
  res.redirect('/');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/users/login');
}

function notLoggedIn(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/home');
}

module.exports = router;
