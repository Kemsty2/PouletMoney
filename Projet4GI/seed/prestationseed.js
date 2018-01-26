/**
 * Created by LeKemsty on 21/01/2018.
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/projet4gi');
mongoose.Promise = global.Promise;

var Prestation = require('../models/prestation');
var prestations  = new Array();

var prestation1 = new Prestation({
    nom: 'Fumer le Poulet',
    duree: 4,
    prix: 20000,
    img: '/images/img.jpg'
});

var prestation2 = new Prestation({
    nom: 'Deplumer le Poulet',
    duree: 2,
    prix: 10000,
    img: '/images/img.jpg'
});

var prestation3 = new Prestation({
    nom: 'Egouter le Poulet',
    duree: 3,
    prix: 15000,
    img: '/images/img.jpg'
});

prestations[0] = prestation1;
prestations[1] = prestation2;
prestations[2] = prestation3;

var done = 0;
for(var j = 0; j<3; j++){
    prestations[j].save(function(err){
        done++;
        if(done === 3){
            exit();
        }
    });
}

function exit(){
    console.log("Prestation Ajoute");
    mongoose.disconnect();
}