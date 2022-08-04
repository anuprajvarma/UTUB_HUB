import React from 'react'
import { NavLink } from 'react-router-dom'
import './nav.css'

const navbar = () => {
    return (
        <>
            <nav className='main-nav'>
                <div className='main-div'>
                    <div className='nav-bar'>
                        <p>Utub-Hub</p>
                    </div>
                    <div className='nav-list'>
                        <ul className='main-list'>
                            <li className='list1'>
                                <NavLink className='list' to="/">Home</NavLink>
                            </li>
                            <li className='list2'>
                                <NavLink className='list' to="/playlist">Playlist</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default navbar