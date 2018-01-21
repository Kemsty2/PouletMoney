/**
 * Created by LeKemsty on 19/01/2018.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Compte = new Schema({
    montant: Number
});

module.exports = mongoose.model('Compte', Compte);