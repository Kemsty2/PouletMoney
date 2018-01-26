/**
 * Created by LeKemsty on 07/01/2018.
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/projet4gi');
mongoose.Promise = global.Promise;

var Offre = require('../models/offre');
var offres = new Array();

var offre1 = new Offre({
    type_poulet: 'Poulet de Ferme',
    grosseur: '10 Kg',
    image: '/images/poulet.jpg',
    quantite: 20,
    prix: 20000
});

var offre2 = new Offre({
    type_poulet: 'Poulet de Chair',
    grosseur: '15 Kg',
    image: '/images/poulet.jpg',
    quantite: 30,
    prix: 20000
});

var offre3 = new Offre({
    type_poulet: 'Poulet de Ferme',
    grosseur: '10 Kg',
    image: '/images/poulet.jpg',
    quantite: 20,
    prix: 20000
});

var offre4 = new Offre({
    type_poulet: 'Poulet de Ferme',
    grosseur: '10 Kg',
    image: '/images/poulet.jpg',
    quantite: 20,
    prix: 20000
});

var offre5 = new Offre({
    type_poulet: 'Poulet de Ferme',
    grosseur: '10 Kg',
    image: '/images/poulet.jpg',
    quantite: 20,
    prix: 20000
});

var offre6 = new Offre({
    type_poulet: 'Poulet de Ferme',
    grosseur: '10 Kg',
    image: '/images/poulet.jpg',
    quantite: 20,
    prix: 20000
});

var offre7 = new Offre({
    type_poulet: 'Poulet de Ferme',
    grosseur: '10 Kg',
    image: '/images/poulet.jpg',
    quantite: 20,
    prix: 20000
});

var offre8 = new Offre({
    type_poulet: 'Poulet de Ferme',
    grosseur: '10 Kg',
    image: '/images/poulet.jpg',
    quantite: 20,
    prix: 20000
});

var offre9 = new Offre({
    type_poulet: 'Poulet de Ferme',
    grosseur: '10 Kg',
    image: '/images/poulet.jpg',
    quantite: 20,
    prix: 20000
});

var offre10 = new Offre({
    type_poulet: 'Poulet de Ferme',
    grosseur: '10 Kg',
    image: '/images/poulet.jpg',
    quantite: 20,
    prix: 20000
});

offres[0] = offre1;
offres[1] = offre2;
offres[2] = offre3;
offres[3] = offre4;
offres[4] = offre5;
offres[5] = offre6;
offres[6] = offre7;
offres[7] = offre8;
offres[8] = offre9;
offres[9] = offre10;


var done = 0;
for(var j = 0; j<10; j++){
    offres[j].save(function(err){
        done++;
        if(done === 10){
            exit();
        }
    });
}

function exit(){
    console.log("Offre Ajoute");
    mongoose.disconnect();
}