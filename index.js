const express=require("express");
const app=express();
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
const { Server } =require("socket.io");
const {createServer}=require("http");
const server = createServer(app);
const io=new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected ',socket.id);
    socket.on("join",(room)=>{
        console.log("user joined room",room);
        socket.join(room);
    });
    socket.on("icecandidate",(obj)=>{
        console.log("candidate");
        io.to(obj.room).emit("icetoroom",obj.candidate)
    })
    socket.on("create",(room)=>{
        console.log("user created room",room);
        socket.join(room);
    });

    socket.on("offer",(obj)=>{
        // console.log(obj.offer);
        // socket.emit()
        io.to(obj.room).emit("create_answer",obj.offer);
    });
    socket.on("answer",(obj)=>{
        // console.log(obj.offer);
        io.to(obj.room).emit("receive_answer",obj.answer);
    });
    socket.on("ready",(room)=>{
        io.to(room).emit("ready");
    })
});

  
app.get("/",(req,res)=>{
    res.render("index");
})
server.listen(3000,()=>{
    console.log("running ...");
})