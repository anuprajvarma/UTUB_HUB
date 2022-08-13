import React, { useState } from 'react'
import Particle from './particle'
import Footer from './footer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './nav.css'
import { useSocket } from './providers/SocketProvider'


const Home = () => {
    const [url, setUrl] = useState("");
    const [checkDownload, setCheckDownload] = useState(true)
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
        if (socket) {
            socket.emit('receive-download-start', { youtubeUrl: url })
            socket.on('Download started', ({ value }) => {
                toast("Download Started wait");
                setCheckDownload(value)
            })
        }

    }

    return (
        <div className='home-div'>
            <div className='Box'>
                <form onSubmit={submitHandler}>
                    <div className='search-box'>
                        <input className='input-box' type='text' onChange={URL} placeholder='Paste Youtube Video Url'></input>
                    </div>
                    <div>
                        {checkDownload ? <button type='submit' className='button'>Download</button> : <button type='submit' className='button'>Downloading.....</button>}
                    </div>
                </form>
            </div>
            <ToastContainer position='top-left' />
            <Particle className='particle' />
            <Footer />
        </div>
    )
}

export default Home