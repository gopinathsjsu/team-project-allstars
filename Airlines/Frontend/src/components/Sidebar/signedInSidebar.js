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
        return (
            <SidebarContainer isOpen={isOpen} onClick={toggle}>
                <Icon>
                    <CloseIcon />
                </Icon>
                <SidebarWrapper>
                    <SidebarMenu>
                        {Points}
                        <SidebarLinkProfile to="/profile" onClick={toggle}>
                            {user}
                        </SidebarLinkProfile>
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
