/**
 * Created by LeKemsty on 26/01/2018.
 */
var express = require('express');
var router = express.Router();

var Administrateur = require('../models/administrateur');
var Client = require('../models/client');
var Historique = require('../models/historique');
var Offre = require('../models/offre');
var Prestation = require('../models/prestation');
var Compte = require('../models/compte');


router.get('/', function(req, res, next){
    res.render('admin/index', {admin : req.user});
});

router.get('/listeoffre', function(req, res, next){
    res.render('admin/listeoffre', {admin: req.user});
});

router.post('/removeoffre', function(req, res, next){
    res.redirect('/admin/listeoffre');
});

router.post('/updateoffre', function(req, res, next){
    res.redirect('/admin/listeoffre');
});

router.get('/listeprestation', function(req, res, next){
    res.render('admin/listeprestation', {admin: req.user});
});


router.post('/removeprestation', function(req, res, next){
    res.redirect('/admin/listeprestation');
});

router.post('/updateprestation', function(req, res, next){
    res.redirect('/admin/listeprestation');
});

router.get('/listeclient', function(req, res, next){
    res.render('admin/listeclient', {admin: req.user});
});

router.get('/client/:id', function(req, res, next){
   res.render('admin/client', {admin: req.user})
});

router.get('/listedemande', function(req, res, next){
    res.render('admin/listedemande', {admin: req.user});
});

router.post('/removedemande', function(req, res, next){
    res.redirect('/admin/listedemande');
});

router.post('/updatedemande', function(req, res, next){
    res.redirect('/admin/listedemande');
});
router.get('/logout', function(req, res, next){
    req.logout();
    if(req.session.cart){
        req.session.cart = {};
    }
    res.redirect('/');
});

module.exports = router;