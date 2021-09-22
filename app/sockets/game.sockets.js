module.exports = io =>{
    const roomFunctions = require('../controllers/rooms.js');

    io.on('connection',(socket)=>{
        var room_id = '';
        socket.on("join",data =>{
            roomFunctions.connectToRoom(data,socket,io)
            room_id = data.room_id;
        });
        socket.on('disconnect',()=>{
            roomFunctions.disconnectFromRoom(room_id,socket,io);
        })
        socket.on('start',()=>{
            roomFunctions.startGame(io,room_id);
        })
        socket.on('rollDice',()=>{
            roomFunctions.diceHandler(io,socket,room_id);
        })
    });
}