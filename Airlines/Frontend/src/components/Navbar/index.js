import React, { Component } from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink,Pts } from './NavbarElements'

export default class Navbar extends Component {
    
    render() {
        const {toggle} = this.props;
        // const user = localStorage.getItem("name");
        return (
            <>
               <Nav>
                <NavLink to="/">
                    <h1>LOGO</h1>
                </NavLink>
                <Bars onClick = {toggle}> </Bars>
                <NavMenu>
                    <Pts activeStyle> Mileage Pts: </Pts>
                    <NavLink to='/' activeStyle>
                        
                    </NavLink>
                    <NavLink to='/' activeStyle>
                        Sign Up
                    </NavLink>
                    <NavBtnLink to='/'>Sign In</NavBtnLink>
                </NavMenu>
                {/*<NavBtn>
                    <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                </NavBtn>*/}
               </Nav> 
            </>
        )
    }
}
