import React, { useState } from 'react'
import axios from 'axios'
import Particle from './particle'
import Footer from './footer'
import './nav.css'

const Home = () => {

    const [url, setUrl] = useState();


    const URL = (e) => {
        const link = e.target.value;
        setUrl(link)
        console.log(link)

    }

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post('https://utbdl.herokuapp.com/search', { url })
    }


    return (
        <div className='home-div'>
            <div className='Box'>
                <div>
                    <div className='search-box'>
                        <form onSubmit={submitHandler}>
                            <input className='input-box' type='text' onChange={URL} placeholder='Paste Youtube Video Url'></input>
                        </form>
                    </div>
                </div>
            </div>
            <Particle className='particle' />
            <Footer />
        </div>
    )
}

export default Home