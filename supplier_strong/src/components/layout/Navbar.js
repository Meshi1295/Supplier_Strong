import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar navbar-light ">
            <div className="container-fluid">
                <Link to='/'>
                    <i className="icon fas fa-home"> Home</i>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;
