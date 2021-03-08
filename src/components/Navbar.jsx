import React from 'react'
import {Link, useHistory} from 'react-router-dom';

const Navbar = ({logState, setLogState}) => {
    const history = useHistory()
    const handleLogout = () => {
        setLogState(!logState)
        sessionStorage.clear()
        history.push('/signin')
    } 

    return (
            <nav className="navbar">
                <div className="logo">
                    Simple Task
                </div>
                <ul>
                    {logState === false && <><li><Link className="nav-link" to='/signin'>Login</Link></li>
                    <li><Link className="nav-link" to='/signup'>Signup</Link></li></>}
                    {logState && <li onClick={handleLogout}>Logout</li>}
                </ul>
            </nav>
    )
}

export default Navbar
