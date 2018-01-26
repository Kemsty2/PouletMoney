/**
 * Created by LeKemsty on 05/01/2018.
 */

var Admin = require('../models/administrateur');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/projet4gi');
mongoose.Promise = global.Promise;

var admin = new Admin({
    nom: 'Moyo',
    prenom: 'Steeve',
    email: 'admin@admin.cm',
    password: '1234',
    type_personne: 'Administrateur'
});

admin.password = admin.encryptPassword(admin.password);
admin.save(function(err){
    if(err){
        console.log('Erreur Lors de La création');
    }
    console.log(admin);
    exit();
});

function exit(){
    mongoose.disconnect();
}