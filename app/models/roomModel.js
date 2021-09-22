class property{
    type = 'terrain'
    owner = null;
    constructor(id,name,price,rent){
        this.id = id;
        this.name = name;
        this.price = price;
        this.rent = rent;
    }
}

class player{
    balance = 1500;
    properties = [];
    table_position = 0;
    first_dice = 0;
    
    constructor(id,name){
        this.id = id;
        this.name = name;
    }
    addProperty(property){
        this.properties.push(property);
    }
    removeProperty(property){
            const index = this.properties.indexOf(property);
            if (index > -1) {
                this.properties.splice(index, 1);
            }
            else{
                console.log("WARNING: property <"+property+"> doesnt exist!\n");
            }
    }
    addMoney(sum){
        balance += sum;
    }
    loseMoney(){
        balance -= sum;
    } 
}

class room{
    constructor(id){
        this.id = id;
    }
    players = [];
    offline_players = [];
    status = 'lobby';
    players_ordered = false;
    turn = 0;
    properties = [];
    newPlayer(player){
        this.players.push(player);
    }
    removePlayer(player_id){
        this.players = this.players.filter(function( obj ) {
            return obj.id !== player_id;
        });
    }


}


exports.property = property;
exports.player = player;
exports.room = room;
