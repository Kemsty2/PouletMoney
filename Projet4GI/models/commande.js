/**
 * Created by LeKemsty on 19/01/2018.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var CommandeSchema = new Schema({
    clientid: {type: String, required: true},
    offre: {type: Array, required: true},
    prestations: {type: Array, required: true, default: []},
    prix: Number,
    date: {type: Date, required: true, default: Date.now()}
});

module.exports = mongoose.model('Commande', CommandeSchema);