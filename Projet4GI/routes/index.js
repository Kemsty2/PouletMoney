var express = require('express');
var router = express.Router();
var Offre  = require('../models/offre');
var Prestation = require('../models/prestation');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', admin: req.user, message: req.flash('message') });
});

router.get('/home',function(req, res, next){
  Prestation.find(function(err, prestations){
      Offre.find(function(err, docs){
          res.render('home', {admin: req.user, compteMessage: req.flash('compteMessage'), offres: docs, prestations: prestations});
      });
  });

});

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    next();
  }
  res.redirect('/users/login');
}

module.exports = router;
