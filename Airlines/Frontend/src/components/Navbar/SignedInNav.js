import React, { Component } from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink,Pts } from './NavbarElements'
import {connect} from "react-redux";
import {signOut} from "../../store/actions/loginActions"
class SignedInNav extends Component {
    
    render() {
        const {toggle} = this.props;
        const user = localStorage.getItem("name");
        const mileagePoints = localStorage.getItem("mileagePoints");
        const type = localStorage.getItem("type");
        const Points = (type === "PASSENGER") ?(
          <Pts activeStyle> Mileage Pts: {mileagePoints}</Pts>
        ) : (<></>)
        return (
            <>
               <Nav>
                <NavLink to="/">
                    <h1>LOGO</h1>
                </NavLink>
                <Bars onClick = {toggle}> </Bars>
                <NavMenu>
                    {Points}
                    <NavLink to='/reservations' activeStyle>
                        {user}
                    </NavLink>
                    <NavBtnLink onClick = {this.props.signOut} to=''>Logout</NavBtnLink>
                </NavMenu>
                {/*<NavBtn>
                    <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                </NavBtn>*/}
               </Nav> 
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      signOut: () => {
        dispatch(signOut());
      },
    };
  };
  
  const mapStateToProps = (state) => {
    return {
      user: state.auth.user.name,
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(SignedInNav);