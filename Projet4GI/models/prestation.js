/**
 * Created by LeKemsty on 19/01/2018.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var prestationSchema = new Schema({
    nom: {type: String, required: true},
    prix: {type: Number, required:true},
    duree: {type: Number, required: true},
    date_publication: {type: Date, required: true, default: Date.now()},
    img: String
});

module.exports = mongoose.model('Prestation', prestationSchema);