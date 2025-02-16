import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from "peerjs";

const VideoChat = ({ roomId, userId }) => {
    const [peers, setPeers] = useState({});
    const myVideoRef = useRef(null);
    const videoGridRef = useRef(null);
    const socket = useRef(null);
    const myPeer = useRef(null);

    useEffect(() => {
        socket.current = io("http://localhost:5000"); // Connect to WebRTC server
        myPeer.current = new Peer(userId, { host: "localhost", port: 5000, path: "/peerjs" });

        // Access user webcam
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            if (myVideoRef.current) {
                myVideoRef.current.srcObject = stream;
            }

            // Notify server of connection
            socket.current.emit("join-room", roomId, userId);

            // Listen for new users
            socket.current.on("user-connected", (newUserId) => {
                connectToNewUser(newUserId, stream);
            });

            myPeer.current.on("call", call => {
                call.answer(stream);
                const video = document.createElement("video");
                call.on("stream", userStream => {
                    addVideoStream(video, userStream);
                });
            });
        });

        return () => {
            socket.current.disconnect();
            myPeer.current.disconnect();
        };
    }, [roomId, userId]);

    const connectToNewUser = (newUserId, stream) => {
        const call = myPeer.current.call(newUserId, stream);
        const video = document.createElement("video");

        call.on("stream", userStream => {
            addVideoStream(video, userStream);
        });

        setPeers(prev => ({ ...prev, [newUserId]: call }));
    };

    const addVideoStream = (video, stream) => {
        video.srcObject = stream;
        video.autoplay = true;
        video.playsInline = true;
        video.style.width = "300px";
        video.style.margin = "10px";
        if (videoGridRef.current) {
            videoGridRef.current.append(video);
        }
    };

    return (
        <div>
            <h2>Video Chat</h2>
            <div ref={videoGridRef} style={{ display: "flex", flexWrap: "wrap" }}>
                <video ref={myVideoRef} autoPlay muted style={{ width: "300px", margin: "10px" }} />
            </div>
        </div>
    );
};

export default VideoChat;
