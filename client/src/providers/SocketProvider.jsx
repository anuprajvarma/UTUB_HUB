import axios from 'axios';
import React, { createContext, useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { io, Socket } from "socket.io-client";
const socketContext = createContext(null)
const FileDownload = require("js-file-download");

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        setSocket(io("http://localhost:5327"));


    }, []);

    // const handleSocketDownloadStart = () => {
    //     console.log('download started');
    // }
    const handleSocketDownloadFinish = async ({ file }) => {
        console.log('download finished');
        const response = await axios.get(`http://localhost:5327/download/${file}`, {
            responseType: "blob",
        })

        FileDownload(response.data, `${file}.mp4`);
    }

    useEffect(() => {
        if (socket) {
            // socket.on('receive-download-started', handleSocketDownloadStart)
            socket.on('receive-download-finished', handleSocketDownloadFinish)
            return () => {
                // socket.off('receive-download-started', handleSocketDownloadStart)
                socket.off('receive-download-finished', handleSocketDownloadFinish)
            }

        }


    }, [socket])

    return (
        <socketContext.Provider value={socket}>{children}</socketContext.Provider>
    )
}

export const useSocket = () => useContext(socketContext)

export default SocketProvider
