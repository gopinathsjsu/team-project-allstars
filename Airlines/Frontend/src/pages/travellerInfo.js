import React, { Component } from "react";
import TravellerInfo from "../components/TravellerInfo";
// import Navbar from "../components/Navbar";
import MainNavbar from "../components/MainNavbar";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SignedInSidebar from "../components/Sidebar/signedInSidebar";

class TravellerInfoPage extends Component {
	state = {
		isOpen: false,
	};
	handleToggle = () => {
		this.setState((prevState) => ({
			isOpen: !prevState.isOpen,
		}));
	};
	render() {
		const { loggedIn } = this.props;
		if (!loggedIn) return <Redirect to="/" />;
		return (
			<>
				<SignedInSidebar
					isOpen={this.state.isOpen}
					toggle={this.handleToggle}
				/>
				<MainNavbar toggle={this.handleToggle} />
				<TravellerInfo />
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedIn: state.auth.loggedIn,
	};
};

export default connect(mapStateToProps, null)(TravellerInfoPage);
