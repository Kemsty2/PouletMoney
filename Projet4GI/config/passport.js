/**
 * Created by LeKemsty on 05/01/2018.
 */
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var passport = require('passport');

var Admin = require('../models/administrateur');
var Compte = require('../models/compte');
var Client = require('../models/client');
var configureAuth = require('./auth');

passport.serializeUser(function(user, done){
    var key = {
        id: user.id,
        type: user.type_personne
    };
    done(null, key);
});

passport.deserializeUser(function (key, done) {
    var Model = key.type == 'Administrateur' ? Admin: Client;
    Model.findById(key.id, function(err, user){
        done(err, user);
    });
});


passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
function(req, email, password, done){
    if(req.param('typeSelect') == 'Administrateur'){
        Admin.findOne({'email': email}, function(err, admin){
            if(err)
                return done(err);
            if(!admin)
                return done(null, false, req.flash('message', 'Administrateur Inexistant'));
            if(!admin.validPassword(password))
                return done(null, false, req.flash('message', 'Mauvais Mot de Passe'));

            return done(null, admin);
        });
    }
    if(req.param('typeSelect') == 'Client'){
        Client.findOne({'local.email': email}, function(err, client){
            if(err)
                return done(err);
            if(!client)
                return done(null, false, req.flash('message', 'Client Inexistant'));
            if(!client.validPassword(password))
                return done(null, false, req.flash('message', 'Mauvais mot de passe'));

            return done(null, client);
        });
    }
}));

passport.use('register', new LocalStrategy({
    usernameField: 'emailRegister',
    passwordField: 'passwordRegister',
    passReqToCallback: true
}, function(req, emailRegister, passwordRegister, done){
    Client.findOne({'local.email': emailRegister}, function(err, user){
        if(err){
            console.log("Erreur Lors de l'inscription");
            return done(err);
        }
        if(user){
            console.log('Client Existant');
            return done(null, false, req.flash('message', 'Client Existant'));
        } else{
            var compteClient = new Compte();
            compteClient.montant = 200000;
            var newClient = new Client();
            newClient.local.email = emailRegister;
            newClient.local.password = newClient.encryptPassword(passwordRegister);
            newClient.local.nom = req.param('nom');
            newClient.local.tel = req.param('tel');
            newClient.local.prenom = req.param('prenom');
            newClient.local.ville = req.param('ville1');
            newClient.local.quartier = req.param('quartier1');
            newClient.type_personne = 'Client';
            newClient.compteID = compteClient._id;

            newClient.save(function(err){
                if(err){
                    console.log("Erreur lors de l'inscription");
                    throw err;
                }
                console.log("Inscription Reussi");
                req.flash('compteMessage', 'Bienvenue Votre Compte a été initialisé à 200000 FCFA. Profiter En!!!');
                return done(null, newClient);
            });
        }
    });
}));

passport.use(new FacebookStrategy({
    clientID: configureAuth.facebookAuth.clientID,
    clientSecret: configureAuth.facebookAuth.clientSecret,
    callbackURL: configureAuth.facebookAuth.callbackURL
},
function(accessToken, refreshToken, profile, done){
    process.nextTick(function(){
        Client.findOne({'facebook.id': profile.id}, function(err, client){
            if(err)
                return done(err);
            if(client){
                return done(null, client);
            }else{
                console.log(profile);
                console.log(accessToken);
                var compteClient = new Compte();
                compteClient.montant = 200000;
                var newClient = new Client();
                newClient.facebook.id = profile.id;
                newClient.facebook.token = accessToken;
                newClient.facebook.name = profile.displayname;
                //newClient.facebook.email = profile.emails[0].value;
                newClient.type_personne = 'Client';
                newClient.local.nom = newClient.facebook.name;
                newClient.compteID = compteClient._id;

                newClient.save(function(err){
                    if(err)
                        throw err;
                    return done(null, newClient);
                });
            }
        });
    });
}));

passport.use(new GoogleStrategy({
    clientID: configureAuth.googleAuth.clientID,
    clientSecret: configureAuth.googleAuth.clientSecret,
    callbackURL: configureAuth.googleAuth.callbackURL
}, function(accessToken, refreshToken, profile, done){
    Client.findOne({'google.id': profile.id}, function(err, client){
        if(err)
            return done(err);
        if(client) {
            return done(null, client);
        }
        else{
            console.log(profile);
            console.log(accessToken);
            var compteClient = new Compte();
            compteClient.montant = 200000;
            var newClient = new Client();
            newClient.google.id = profile.id;
            newClient.google.token = accessToken;
            newClient.google.email = profile.emails[0].value
            newClient.google.name = profile.displayName;
            newClient.compteID = compteClient._id;

            newClient.save(function(err){
                if(err)
                    throw err;
                return done(null, newClient);
            });
        }
    })
}));

passport.use(new TwitterStrategy({
    consumerKey: configureAuth.twitterAuth.consumerKey,
    consumerSecret: configureAuth.twitterAuth.consumerSecret,
    callbackURL: 'http://localhost:3000/users/auth/twitter/callback'
}, function(accessToken, refreshToken, profile, done){
    Client.findOne({'twitter.id': profile.id}, function(err, client){
        if(err)
            return done(err);
        if(client){
            return done(null, client);
        }else{
            console.log(profile);
            console.log(accessToken);
            var compteClient = new Compte();
            compteClient.montant = 200000;
            var newClient = new Client();
            newClient.twitter.id = profile.id;
            newClient.twitter.token = accessToken;
            newClient.twitter.displayName = profile.displayName;
            newClient.twitter.username = profile.username;
            newClient.compteID = compteClient._id;

            newClient.save(function(err){
                if(err)
                    throw err;
                return done(null, newClient);
            });

        }
    });
}));

