/**
 * Created by LeKemsty on 05/01/2018.
 */

var Admin = require('../models/administrateur');
var Client = require('../models/client');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/projet4gi');
mongoose.Promise = global.Promise;

var admin = new Admin({
    nom: 'Moyo',
    prenom: 'Steeve',
    email: 'kemsty2@yahoo.fr',
    password: '1234',
    type_personne: 'Administrateur'
});

var client = new Client({
    nom: 'Kemsty',
    prenom: 'Aymard',
    tel: '698901563',
    email: 'kemsty2@yahoo.com',
    password: '1234',
    ville: 'Douala',
    quartier: 'Jouvance',
    type_personne: 'Client'
});

admin.password = admin.encryptPassword(admin.password);
client.password = client.encryptPassword(client.password);
admin.save(function(err){
    if(err){
        console.log('Erreur Lors de La création');
    }
    console.log(admin);
    exit();
});
client.save(function(err){
    if(err){
        console.log('Erreur Lors de La création');
    }
    console.log(client);
    exit();
});

function exit(){
    mongoose.disconnect();
}