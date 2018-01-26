/**
 * Created by LeKemsty on 19/01/2018.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HistoriqueSchema = new Schema({
    compteID: String,
    commandes: {type: Array, default: []},
    description: String,
    date: {type: Date, default: Date.now()}
});

var virtual = HistoriqueSchema.virtual('personnel');


virtual.get(function(){
    if(this.commandes.length != 0){
        var total = 0;
        for(var i = 0; i <this.commandes.length; i++){
            total += this.commandes[i].prix;
        }
        return "Vous avez depensé " + total + " Le "  + this.date.toDateString();
    }
    else{
        return this.description;
    }

});

module.exports = mongoose.model('Historique', HistoriqueSchema);