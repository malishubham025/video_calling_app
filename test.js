// client
// // alert("hi");
// const socket = io();
// var admin=false;
// let input=document.querySelector(".room_name");
// let local=document.querySelector(".local");
// let remote=document.querySelector(".remote");
// let rtcpeer;
// let Stream;
// const iceServers = {
//     iceServers: [
//         { urls: "stun:stun.l.google.com:19302" },
//         { urls: "stun:stun.l.google.com:5349" },
//         { urls: "stun:stun1.l.google.com:3478" }
//     ]
// };
// function handleJoin(){
//     if(input.value){
//         admin=false;
//         navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((stream)=>{
//             local.srcObject=stream;
//             Stream=stream;
//             socket.emit("join",input.value);
//             socket.emit("ready",input.value);
//         })
        
//     }
// }
// function handleCreate(){
//     if(input.value){
//         admin=true;
//         navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((stream)=>{
//         local.srcObject=stream;
//         Stream=stream;
//         socket.emit("create",input.value);
//         socket.emit("ready",input.value);
//         })
        
//     }
// }
// socket.on("ready",()=>{
//     if(admin){
//         rtcpeer=new RTCPeerConnection(iceServers);
//         rtcpeer.onicecandidate=icecandidateFunction;
//         rtcpeer.ontrack=ontrackFunction;
//         rtcpeer.addTrack(Stream.getTracks()[0],Stream);
//         rtcpeer.addTrack(Stream.getTracks()[1],Stream);
//         rtcpeer.createOffer().then((offer)=>{
//             rtcpeer.setLocalDescription(offer);
//             let obj={
//                 room:input.value,
//                 offer:offer
//             }
//             socket.emit("offer",obj);

//         })
       
//     }
  
// })
// socket.on("create_answer",(offer)=>{
//     if(!admin){
//         rtcpeer=new RTCPeerConnection(iceServers);
//         rtcpeer.onicecandidate=icecandidateFunction;
//         rtcpeer.ontrack=ontrackFunction;
//         rtcpeer.addTrack(Stream.getTracks()[0],Stream);
//         rtcpeer.addTrack(Stream.getTracks()[1],Stream);
//         rtcpeer.setRemoteDescription(offer);
//         rtcpeer.createAnswer().then(function(answer){
//             let obj={
//                 room:input.value,
//                 answer:answer
//             }
//             rtcpeer.setLocalDescription(answer);
//             socket.emit("answer",obj);
//         })
//     }   
  
// })

// function icecandidateFunction(event){
    
//     if(event.candidate){

//         let obj={
//             room:input.value,
//             candidate:event.candidate
//         }
//         // alert("candiade");
//         socket.emit("icecandidate",obj);
//     }
    
// }
// socket.on("icetoroom",(candidate)=>{
//     let x=new RTCIceCandidate(candidate);
//     rtcpeer.addIceCandidate(x);
// })
// socket.on("receive_answer",(answer)=>{
//     rtcpeer.setRemoteDescription(answer);
// })
// function ontrackFunction(event){
//     remote.srcObject=event.streams[0];
// }
// // alert("hi");

// const socket = io();
// let admin = false;
// let input = document.querySelector(".room_name");
// let localStream;
// const iceServers = {
//     iceServers: [
//         { urls: "stun:stun.l.google.com:19302" },
//         { urls: "stun:stun.l.google.com:5349" },
//         { urls: "stun:stun1.l.google.com:3478" }
//     ]
// };

// let peerConnections = {}; // To store peer connections

// function handleJoin() {
//     if (input.value) {
//         admin = false;
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//             localStream = stream;
//             addVideoStream(stream, 'local');
//             socket.emit("join", input.value);
//             socket.emit("ready", input.value);
//         });
//     }
// }

// function handleCreate() {
//     if (input.value) {
//         admin = true;
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//             localStream = stream;
//             addVideoStream(stream, 'local');
//             socket.emit("create", input.value);
//             socket.emit("ready", input.value);
//         });
//     }
// }

// function addVideoStream(stream, className) {
//     const videoContainer = document.querySelector('.videos');
//     const videoElement = document.createElement('video');
//     videoElement.srcObject = stream;
//     videoElement.autoplay = true;
//     videoElement.className = className;
//     videoContainer.appendChild(videoElement);
// }

// socket.on("ready", () => {
//     if (admin) {
//         createPeerConnection(input.value);
//         localStream.getTracks().forEach(track => peerConnections[input.value].addTrack(track, localStream));
//         peerConnections[input.value].createOffer().then(offer => {
//             peerConnections[input.value].setLocalDescription(offer);
//             socket.emit("offer", { room: input.value, offer });
//         });
//     }
// });

// socket.on("create_answer", (offer) => {
//     if (!admin) {
//         createPeerConnection(input.value);
//         peerConnections[input.value].setRemoteDescription(offer);
//         localStream.getTracks().forEach(track => peerConnections[input.value].addTrack(track, localStream));
//         peerConnections[input.value].createAnswer().then(answer => {
//             peerConnections[input.value].setLocalDescription(answer);
//             socket.emit("answer", { room: input.value, answer });
//         });
//     }
// });

// function createPeerConnection(room) {
//     const peerConnection = new RTCPeerConnection(iceServers);
//     peerConnections[room] = peerConnection;
//     peerConnection.onicecandidate = (event) => {
//         if (event.candidate) {
//             socket.emit("icecandidate", { room, candidate: event.candidate });
//         }
//     };
//     peerConnection.ontrack = (event) => {
//         addVideoStream(event.streams[0], 'remote');
//     };
// }

// socket.on("icetoroom", (candidate) => {
//     const iceCandidate = new RTCIceCandidate(candidate);
//     peerConnections[input.value].addIceCandidate(iceCandidate);
// });

// socket.on("receive_answer", (answer) => {
//     peerConnections[input.value].setRemoteDescription(answer);
// });





//new=======================
// alert("hi");