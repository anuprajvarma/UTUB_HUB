import React, { useState } from 'react'
import axios from 'axios'
import Particle from './particle'
import Footer from './footer'
import './nav.css'
import { useSocket } from './providers/SocketProvider'
const FileDownload = require("js-file-download");


const Home = () => {
    const [url, setUrl] = useState("");
    const socket = useSocket();


    const URL = (e) => {
        const link = e.target.value;
        setUrl(link)
        console.log(link)

    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('Download started')
        // await axios.post('http://localhost:5000/download', { url });
        if (socket)
            socket.emit('receive-download-start', { youtubeUrl: url })

    }

    return (
        <div className='home-div'>
            <div className='Box'>
                <div>
                    <div className='search-box'>
                        <form onSubmit={submitHandler}>
                            <input className='input-box' type='text' onChange={URL} placeholder='Paste Youtube Video Url'></input>
                        </form>
                        {/* <button onClick={() => {
                            axios
                                .get("http://localhost:5000/download/3 Benefits of being a College Student | School Student by Apna College-1659850791905.mp4", {
                                    responseType: "blob",
                                })
                                .then((response) => {
                                    FileDownload(response.data, `video-file.mp4`);
                                });
                        }}>Download</button> */}
                    </div>
                </div>
            </div>
            <Particle className='particle' />
            <Footer />
        </div>
    )
}

export default Home