import React, { Component } from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  Pts,
} from "./NavbarElements";

export default class Navbar extends Component {
  render() {
    const { toggle } = this.props;
    // const user = localStorage.getItem("name");
    return (
      <>
        <Nav>
          <NavLink to="/">
            <h3 class=" w3-padding-16">
              <i
                class="
                                    fa fa-plane fa-fw
                                    w3-margin-right w3-xxlarge w3-text-teal
                                "
              ></i>
              All Star Airlines
            </h3>

            {/* <h3>All Star Airlines</h3> */}
          </NavLink>
          <Bars onClick={toggle}> </Bars>
          <NavMenu>
            <NavLink to="/signup" activeStyle>
              Sign Up
            </NavLink>
            <NavBtnLink to="/signin">Sign In</NavBtnLink>
          </NavMenu>
          {/*<NavBtn>
                    <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                </NavBtn>*/}
        </Nav>
      </>
    );
  }
}
