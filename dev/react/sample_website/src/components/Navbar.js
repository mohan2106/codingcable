import React,{useState,useEffect} from 'react';
import  {Link} from 'react-router-dom';
import {Link as Link1} from 'react-scroll';
import {MdFingerprint}  from 'react-icons/md';
import { FaBars, FaTimes } from 'react-icons/fa';
import {IconContext} from 'react-icons/lib';
import {Button} from './Button.js';
import './Navbar.css';

function Navbar() {
    const [click,setClick] =  useState(false);
    const [button,setButton] =  useState(true);
    const handleClick = ()=>setClick(!click);
    // const handleButton = ()=>setButton(!button);

    const closeMobileMenu = ()=> setClick(false);

    const showButton = ()=>{
        if(window.innerWidth <= 960){
            setButton(false);
        }else{
            setButton(true);
        }
    }
    useEffect(()=>{
        showButton();
    },[])
    window.addEventListener('resize',showButton);
    return (
        <>
        <IconContext.Provider value={{color:'#fff'}}>
            <div className="navbar">
                <div className="navbar-container container">
                    <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
                        <MdFingerprint className='navbar-icon'/>
                        CodingCable
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                    {click ? <FaTimes/> : <FaBars/>}
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link1 to='home' onClick={closeMobileMenu} className="nav-links" smooth={true} duration={1000}>
                                Home
                            </Link1>
                        </li>
                        <li className='nav-item'>
                            <Link1 to='services' onClick={closeMobileMenu} className="nav-links" smooth={true} duration={1000}>
                                Services
                            </Link1>
                        </li>
                        <li className='nav-item'>
                            <Link1 to='products' onClick={closeMobileMenu} className="nav-links" smooth={true} duration={1000}>
                                Products
                            </Link1>
                        </li>
                        <li className='nav-btn' >
                            {button ? (
                                <Link1 to='signup' className='btn-link' smooth={true} duration={1000}>
                                    <Button buttonStyle='btn--outline'>
                                        SIGN UP
                                    </Button>
                                </Link1>
                            ):(
                                <Link1 to='signup' className='btn-link' onClick={closeMobileMenu} smooth={true} duration={1000}>
                                    <Button buttonStyle='btn--outline'
                                            buttonSize='btn--mobile'>
                                                SIGN IN
                                    </Button>
                                </Link1>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
