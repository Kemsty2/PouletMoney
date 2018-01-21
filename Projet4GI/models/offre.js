/**
 * Created by LeKemsty on 07/01/2018.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var offreSchema = new Schema({
    type_poulet: {type: String, required: true},
    grosseur: {type: String, required:true},
    image: {type: String, required: true},
    quantite: {type: Number, required: true},
    prix: {type: Number, required: true},
    date_publication: {type: Date, required: true, default: Date.now()}
});

module.exports = mongoose.model('Offre', offreSchema);