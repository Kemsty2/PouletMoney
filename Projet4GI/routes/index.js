var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', admin: req.user, message: req.flash('message') });
});

router.get('/home', isAuthenticated, function(req, res, next){
  res.render('home', {admin: req.user});
});

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    next();
  }
  res.redirect('/users/login');
}

module.exports = router;
