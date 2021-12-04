import React, { Component } from "react";
import {
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLinkProfile,
    SideBtnWrap,
    SidebarRoute,
    Pts
} from "./SidebarElements";
import { signOut } from "../../store/actions/loginActions";
import { connect } from "react-redux";

class SignedInSidebar extends Component {
    render() {
        const { isOpen } = this.props;
        const { toggle } = this.props;
        const user = localStorage.getItem("name");
        const mileagePoints = localStorage.getItem("mileagePoints");
        const type = localStorage.getItem("type");
        const Points = (type === "PASSENGER") ?(
            <Pts activeStyle> Mileage Pts: {mileagePoints}</Pts>
        ) : (<></>)
        const SearchIcon = (type === "PASSENGER") ? (<SidebarLinkProfile to='/dashboard' activeStyle>
        <i class="fa fa-search" aria-hidden="true"> Search</i>
        </SidebarLinkProfile>) : (<></>)
        const yourReservations = (type === "PASSENGER") ? (<SidebarLinkProfile to="/reservations" onClick={toggle}>
        Your Reservations
    </SidebarLinkProfile>):(<></>)
        return (
            <SidebarContainer isOpen={isOpen} onClick={toggle}>
                <Icon>
                    <CloseIcon />
                </Icon>
                <SidebarWrapper>
                    <SidebarMenu>
                        {Points}
                        {SearchIcon}
                        {yourReservations}
                        <Pts style={{color:"tomato", textAlign:"center"}}>{user}</Pts>
                    </SidebarMenu>
                    <SideBtnWrap>
                        <SidebarRoute onClick={this.props.signOut}>
                            Logout
                        </SidebarRoute>
                    </SideBtnWrap>
                </SidebarWrapper>
            </SidebarContainer>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(SignedInSidebar);
