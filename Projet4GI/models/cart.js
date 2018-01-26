/**
 * Created by LeKemsty on 22/01/2018.
 */
module.exports = function Cart(oldcart){
    this.commandes = oldcart.commandes || [];
    this.totalprix = oldcart.totalprix || 0;
    this.totalQty = oldcart.totalQty ||0;

    this.add = function(commande){
        this.commandes.push(commande);
        this.totalprix += commande.prix;
        this.totalQty++;
    };
    this.generateOffresId = function(){
        var offresId = new Array();
        /*for(var i = 0; i<this.commandes.length; i++){
            offresId[i] = this.commandes[i].offreid;
            return offresId;
        }*/
        return this.commandes[i].offreid;
    };
};
