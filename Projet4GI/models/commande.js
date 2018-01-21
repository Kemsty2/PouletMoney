/**
 * Created by LeKemsty on 19/01/2018.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Client = require('../models/client');
var Offre = require('../models/offre');
var prestation = require('../models/prestation');


var CommandeSchema = new Schema({
    client: {type: Client, required: true},
    offre: {type: Offre, required: true},
    prestation: {type: prestation, required: true},
    quantite: Number,
    prix: Number,
    date: {type: Date, required: true}
});

module.exports = mongoose.model('Commande', CommandeSchema);