import React, { Component } from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink,Pts } from './NavbarElements'

export default class Navbar extends Component {
    state={
        pts :20,
        name : "Shantanu"
    }
    render() {
        return (
            <>
               <Nav>
                <NavLink to="/">
                    <h1>LOGO</h1>
                </NavLink>
                <Bars/>
                <NavMenu>
                    <Pts activeStyle> Mileage Pts: {this.state.pts}</Pts>
                    <NavLink to='/reservations' activeStyle>
                        {this.state.name}
                    </NavLink>
                    <NavLink to='/signup' activeStyle>
                        Sign Up
                    </NavLink>
                    <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                </NavMenu>
                {/*<NavBtn>
                    <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                </NavBtn>*/}
               </Nav> 
            </>
        )
    }
}
