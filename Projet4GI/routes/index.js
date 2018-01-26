var express = require('express');
var router = express.Router();
var Offre  = require('../models/offre');
var Prestation = require('../models/prestation');
var Commande = require('../models/commande');
var Compte = require('../models/compte');
var Historique = require('../models/historique');
var Cart = require('../models/cart');

/* GET home page. */
router.get('/', notLoggedIn, function(req, res, next) {
    var totalQty = 0;
    if(req.session.cart){
        totalQty = req.session.cart.totalQty;
    }
    res.render('index', { title: 'Express', admin: req.user, message: req.flash('message'), totalQty: totalQty });
});

router.get('/home',isLoggedIn, function(req, res, next){
    var totalQty = 0;
    if(req.session.cart){
        totalQty = req.session.cart.totalQty;
    }
  Prestation.find(function(err, prestations){
      Offre.find(function(err, docs){
          res.render('home', {admin: req.user, compteMessage: req.flash('compteMessage'), offres: docs, prestations: prestations, totalQty: totalQty});
      });
  });

});

router.get('/addtocart/offre/:offreid/prestation/:prestationid', isLoggedIn, function(req, res, next){
    var totalQty = 0;
    if(req.session.cart){
        totalQty = req.session.cart.totalQty;
    }
    var prestation = req.params.prestationid;
    prestation = prestation.substr(0, prestation.length - 1);
    var resultat = prestation.split("_");
    var cart = new Cart(req.session.cart ? req.session.cart: {});
    var commande = new Commande();

    Prestation.find(function(err, prestations){
        Offre.find(function(err, offres){
            Offre.findById(req.params.offreid, function(err, offreChoisie){
               var query = Prestation.find();
               query.where('_id').in(resultat);
               query.exec(function(err, prestationChoisies){
                   commande.clientid = req.user._id;
                   commande.offre.push(offreChoisie);
                   var prixTotal = offreChoisie.prix;
                   for(var i = 0; i<prestationChoisies.length; i++){
                       var pres;
                       pres = prestationChoisies[i];
                       commande.prestations.push(pres);
                       prixTotal += pres.prix;
                   }
                   commande.prix = prixTotal;
                   //console.log(commande);
                   cart.add(commande);
                   req.session.cart = cart;
                   console.log(req.session.cart);
                   res.redirect('/home')
               });
            });
        });
    });


});

router.get('/addtocart/offre/:offreid/prestation/', isLoggedIn, function(req, res, next){
    var totalQty = 0;
    if(req.session.cart){
        totalQty = req.session.cart.totalQty;
    }
    var commande = new Commande();
    var cart = new Cart(req.session.cart ? req.session.cart: {});
    Prestation.find(function(err, prestations){
        Offre.find(function(err, offres){
            Offre.findById(req.params.offreid, function(err, offreChoisie){
                commande.prix = offreChoisie.prix;
                commande.offre.push(offreChoisie);
                commande.clientid = req.user._id;
                cart.add(commande);
                req.session.cart = cart;
                console.log(req.session.cart);
                res.redirect('/home');
            });
        });
    });
});

router.get('/cartlist', isLoggedIn, function(req, res, next){
    var totalQty = 0;
    var commandes = null;
    var cart = new Cart(req.session.cart ? req.session.cart: {});
    var totalPrix = 0;
    if(req.session.cart){
        totalQty = req.session.cart.totalQty;
        totalPrix = req.session.cart.totalprix;
        commandes = cart.commandes;
    }

    res.render('cartlist', { admin : req.user, commandes: commandes , totalQty : totalQty, totalPrix: totalPrix})
});

router.post('/buy', isLoggedIn, function(req, res, next){
    var cart = req.session.cart;
    var user = req.user;
    var totalQty = 0;
    var commandes = null;
    var historique = new Historique();
    if(req.session.cart){
        totalQty = req.session.cart.totalQty;
        totalPrix = req.session.cart.totalprix;
        commandes = cart.commandes;
    }

    Compte.findById(user.compteID, function(err, compte){
        compte.montant -= cart.totalprix;
        if(compte.montant < 0 ){
            req.flash('buyMessage', 'Votre solde est insuffisant');
            res.render('cartlist', {buyMessage: req.flash('buyMessage'), admin: req.user, totalQty: totalQty, totalPrix: totalPrix, commandes: commandes})
        }
        else{
            historique.compteID = user.compteID;
            compte.save(function(err){
                if(err){
                    throw err;
                }
            });
            for(var id in cart.commandes){
                historique.commandes.push(cart.commandes[id]);
                var commande = new Commande();
                commande._id = cart.commandes[id]._id;
                commande.clientid = cart.commandes[id].clientid;
                commande.prix = cart.commandes[id].prix;
                for(var j  in cart.commandes[id].prestations){
                    commande.prestations.push(cart.commandes[id].prestations[j]);
                }
                commande.offre[0] = cart.commandes[id].offre[0];
                commande.date = cart.commandes[id].date;
                commande.save();
            }
            historique.description = user.local.nom + " a depensé " + cart.totalprix + " Fcfa dans des achats le " + historique.date.toDateString();
            historique.save(function(err){
                if(err){
                    throw err;
                }
            });
            console.log(historique);
            req.session.cart = {};

            if(req.session.cart){
                totalQty = req.session.cart.totalQty;
            }
            Prestation.find(function(err, prestations){
                Offre.find(function(err, offres){
                    res.render('home', {admin: req.user, compteMessage: req.flash('compteMessage'), offres: offres, prestations: prestations, totalQty: totalQty});
                });
            });
        }
    });
});

router.get('/test', function(req, res, next){
    res.render('test');
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
