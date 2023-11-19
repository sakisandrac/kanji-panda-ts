import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Nav.css';
import logo from './panda.png';
import logoSmall from './panda1.png';
import home from '../../images/home.png';
import search from '../../images/search.png';
import saved from '../../images/heart.png';
import logoutIcon from '../../images/logout.png';

interface NavProps {
  logIn: (userID: string) => void,
  user: string
}


const Nav = ({logIn, user}: NavProps) => {
  const logout = () => {
    logIn("")
  }

  return (
    <nav className="nav-bar">
      <div className="logo-container">
        <Link to='/' aria-label="link to homepage"><img className='logo' src={logo} alt='kanji panda logo'/></Link>
        <Link to='/' aria-label="link to homepage"><img className='logo-small' src={logoSmall} alt='kanji panda logo small'/></Link>
        <Link to='/' aria-label="link to homepage"><p className='logo-text' aria-label="link to homepage">Kanji Panda</p></Link>
      </div>
      <div className="nav-link-container">
        <NavLink className="nav-link text" to="/" aria-label="link to homepage">Home</NavLink>
        <NavLink className="nav-link text" to="/saved" aria-label="link to saved kanji page">My Learning</NavLink>
        <NavLink className="nav-link text" to="/search" aria-label="link to search page">Search</NavLink>
        <p className="nav-link text" onClick={logout}>Logout</p>
        <Link className="nav-link icon" to="/" aria-label="link to homepage"><img className='nav-icon' src={home} alt='home icon'/></Link>
        <Link className="nav-link icon" to="/saved" aria-label="link to saved kanji page"><img className='nav-icon' src={saved} alt='saved page icon'/></Link>
        <Link className="nav-link icon" to="/search" aria-label="link to search page"><img className='nav-icon' src={search} alt='search icon'/></Link>
        {user && <img className='nav-icon' onClick={logout} src={logoutIcon} alt="logout icon"></img>}
      </div>
    </nav>
  )
}

export default Nav