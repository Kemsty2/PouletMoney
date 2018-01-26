/**
 * Created by LeKemsty on 19/01/2018.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var demandeSchema = new Schema({
    type_poulet: {type: String, required: true},
    grosseur: {type: String, required: true},
    quantite: {type: Number, required: true}
});

module.exports = mongoose.model('Demande', demandeSchema);