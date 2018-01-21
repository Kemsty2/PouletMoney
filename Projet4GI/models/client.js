/**
 * Created by LeKemsty on 03/01/2018.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var clientSchema = new Schema({
    local: {
        nom: {type: String, required: false},
        prenom: {type: String, required: false},
        email: {type: String, required: false},
        password: {type: String, required: false},
        tel: {type: String, required: false},
        ville: String,
        quartier: String
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    type_personne: {type: String, required: true},
    compteID: {type: String, required: true}
});

clientSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

clientSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Client', clientSchema);