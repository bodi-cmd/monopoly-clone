const {property,player, room} = require('../models/roomModel.js');

var rooms = [];

exports.createRoom = (req,res) => {
    const uuid_module = require('uuid');
    const uuid = uuid_module.v4();
    rooms[uuid] = new room(uuid);
    res.redirect('/room/'+uuid);
}

exports.joinRoom = (req,res) => {
    const room_id = req.params.room_id
    //console.log(room_id)
    if(rooms[room_id]){
        res.render("lobby.ejs",{id : room_id});
    }
    else{
        res.send("That room doesnt exist");
    }
}

exports.connectToRoom = (data,socket,io) => {
    if(rooms[data.room_id]){
        var exists = false;
        rooms[data.room_id].players.forEach(element => {
                 if(element.id == socket.id) exists = true;
        });
        if(!exists){
            var Player = new player(socket.id,data.name);  //creating the new player
            rooms[data.room_id].newPlayer(Player);  //adding it to the room state
            // console.log(rooms);
            // rooms[data.room_id].players.forEach(element => {
            //     console.log(element);
            // });
            socket.join(data.room_id);  //adding the player socket to the room
            io.to(data.room_id).emit('users',rooms[data.room_id].players); //update all the players with the number of players
            return true;
        }
        return false;
    }
    return false;
}

exports.disconnectFromRoom = (room_id,socket,io) => {
    if(rooms[room_id]){
        rooms[room_id].removePlayer(socket.id);
        io.to(room_id).emit('users',rooms[room_id].players);
        if(rooms[room_id].players.length==0){
            rooms[room_id] = null;
        }
    }
}

exports.startGame = (io,room_id) => {
    if(rooms[room_id] && rooms[room_id].status == 'lobby'){
        rooms[room_id].status = 'in game';
        console.log('game started');
        rooms[room_id].properties.push(new property(1,"Giulesti0",60,4,null));
        rooms[room_id].properties.push(new property(2,"Giulesti1",60,4,null));
        rooms[room_id].properties.push(new property(3,"Giulesti2",60,4,null));
        rooms[room_id].properties.push(new property(4,"Giulesti3",60,4,null));
        rooms[room_id].properties.push(new property(5,"Giulesti4",60,4,null));
        rooms[room_id].properties.push(new property(6,"Giulesti5",60,4,null));
        rooms[room_id].properties.push(new property(7,"Giulesti6",60,4,null));
        rooms[room_id].properties.push(new property(8,"Giulesti7",60,4,null));
        rooms[room_id].properties.push(new property(9,"Giulesti8",60,4,null));
        rooms[room_id].properties.push(new property(10,"Giulesti9",60,4,null));

        startEmitting(io,room_id);

    }
}

exports.diceHandler = (io,socket,room_id) => {
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    const game = rooms[room_id];
    if(game){
        const current_turn = game.turn;
        const numof_players = game.players.length;
        if(game.players[current_turn % numof_players].id == socket.id){
            if(game.players[current_turn % numof_players].first_dice == 0){
                //console.log("e 0");
                rooms[room_id].players[current_turn % numof_players].first_dice = dice1+dice2;
            }

            io.to(room_id).emit("rolled_dice",{user: game.players[current_turn % numof_players],rolled : dice1+dice2});
            rooms[room_id].turn++;
            if(current_turn == numof_players){
                //console.log("sorting....");
                rooms[room_id].players.sort((a,b)=>{
                    return b.first_dice - a.first_dice;
                })
                rooms[room_id].players_ordered = true;
                //console.log(rooms[room_id].players);
            }
        }
    }
}



function startEmitting(io,room_id){
    if(rooms[room_id]){
        if(rooms[room_id].status == 'in game'){
            io.to(room_id).emit('gameData',rooms[room_id]);
            //console.log("Sended to room "+room_id);
        setTimeout(()=>{
            startEmitting(io,room_id)
        }, 1000);
    }
        }
    }

