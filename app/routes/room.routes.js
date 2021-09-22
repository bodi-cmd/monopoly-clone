module.exports = app =>{
    const roomFunctions =  require('../controllers/rooms.js');

    

    app.get('/',(req,res)=>{
        res.render('home.ejs');
    })

    app.get('/new-room',roomFunctions.createRoom);
    app.get('/room/:room_id',roomFunctions.joinRoom);


}