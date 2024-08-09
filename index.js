const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
const { Server } = require("socket.io");
const { createServer } = require("http");
const { ExpressPeerServer } = require("peer");

const server = createServer(app);
const io = new Server(server);
const peerServer = ExpressPeerServer(server, {
    debug: true
});

app.use("/peerjs", peerServer);

io.on('connection', (socket) => {
    console.log('A user connected with socket ID:', socket.id);

    socket.on("join", (room, id) => {
        console.log(`User with peer ID: ${id} joined room: ${room}`);
        socket.join(room);
        socket.to(room).emit("user-connected", id);  // Notify others in the room
    });

    // Other event handlers...
    // socket.on('disconnect', () => {
    //     console.log(`User with peer ID: ${socket.id} disconnected`);
    //     socket.to(room).emit("user-disconnected", socket.id);  // Notify others in the room that this user has disconnected
    // });
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server running on port 3000...");
});
