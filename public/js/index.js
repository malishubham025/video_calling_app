// import { io } from 'socket.io-client';

let socket = io();
let input = document.querySelector(".input");
let local = document.querySelector(".local");
let remote = document.querySelector(".remote");
let set=new Set();
var peer = new Peer();
let mutebtn=document.querySelector("#mutebtn");
let localStream;

// Handle peer connection open event
peer.on('open', (id) => {
    console.log("Peer ID is:", id);
});

function handlejoin() {
    let room = input.value;
    if (room) {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
            localStream = stream;
            addVideo(localStream);

            // Emit the 'join' event with the peer ID
            socket.emit("join", room, peer.id);
        });

        // Listen for calls from other peers
        peer.on("call", (call) => {
            call.answer(localStream); // Answer the call with the local stream
            call.on('stream', (remoteStream) => {
                addVideo(remoteStream);
            });
        });
    }
}

// Handle the 'user-connected' event from the server
socket.on("user-connected", (id) => {
    console.log("User connected with peer ID:", id);
    let call = peer.call(id, localStream); // Call the new user with the local stream
    call.on('stream', (remoteStream) => {
        console.log("remote",remoteStream);
        addVideo(remoteStream);
    });
});

function handleMute(){
    if(localStream){
        let enable=localStream.getAudioTracks()[0].enabled;
        if(enable){
            localStream.getAudioTracks()[0].enabled=false;
            mutebtn.innerHTML="unmute";
        }
        else{
            localStream.getAudioTracks()[0].enabled=true;
            mutebtn.innerHTML="Mute";
        }
    }
}
// Function to add the remote video to the DOM
function addVideo(stream) {
    // Check if the stream is already in the Set
    if (!set.has(stream)) {
        set.add(stream);

        // Create a new video element for the new stream
        let video = document.createElement("video");
        video.srcObject = stream;
        video.autoplay = true;
        remote.appendChild(video);
        console.log(remote);
    }
}

