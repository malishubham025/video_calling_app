// alert("hi");
const socket = io();
var admin=false;
let input=document.querySelector(".room_name");
let local=document.querySelector(".local");
let remote=document.querySelector(".remote");
let rtcpeer;
let Stream;
const iceServers = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun.l.google.com:5349" },
        { urls: "stun:stun1.l.google.com:3478" }
    ]
};
function handleJoin(){
    if(input.value){
        admin=false;
        navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((stream)=>{
            local.srcObject=stream;
            Stream=stream;
            socket.emit("join",input.value);
            socket.emit("ready",input.value);
        })
        
    }
}
function handleCreate(){
    if(input.value){
        admin=true;
        navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((stream)=>{
        local.srcObject=stream;
        Stream=stream;
        socket.emit("create",input.value);
        socket.emit("ready",input.value);
        })
        
    }
}
socket.on("ready",()=>{
    if(admin){
        rtcpeer=new RTCPeerConnection(iceServers);
        rtcpeer.onicecandidate=icecandidateFunction;
        rtcpeer.ontrack=ontrackFunction;
        rtcpeer.addTrack(Stream.getTracks()[0],Stream);
        rtcpeer.addTrack(Stream.getTracks()[1],Stream);
        rtcpeer.createOffer().then((offer)=>{
            rtcpeer.setLocalDescription(offer);
            let obj={
                room:input.value,
                offer:offer
            }
            socket.emit("offer",obj);

        })
       
    }
  
})
socket.on("create_answer",(offer)=>{
    if(!admin){
        rtcpeer=new RTCPeerConnection(iceServers);
        rtcpeer.onicecandidate=icecandidateFunction;
        rtcpeer.ontrack=ontrackFunction;
        rtcpeer.addTrack(Stream.getTracks()[0],Stream);
        rtcpeer.addTrack(Stream.getTracks()[1],Stream);
        rtcpeer.setRemoteDescription(offer);
        rtcpeer.createAnswer().then(function(answer){
            let obj={
                room:input.value,
                answer:answer
            }
            rtcpeer.setLocalDescription(answer);
            socket.emit("answer",obj);
        })
    }   
  
})

function icecandidateFunction(event){
    
    if(event.candidate){

        let obj={
            room:input.value,
            candidate:event.candidate
        }
        // alert("candiade");
        socket.emit("icecandidate",obj);
    }
    
}
socket.on("icetoroom",(candidate)=>{
    let x=new RTCIceCandidate(candidate);
    rtcpeer.addIceCandidate(x);
})
socket.on("receive_answer",(answer)=>{
    rtcpeer.setRemoteDescription(answer);
})
function ontrackFunction(event){
    remote.srcObject=event.streams[0];
}
// alert("hi");
