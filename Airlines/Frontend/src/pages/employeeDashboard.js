import React, { Component } from "react";
import EmployeeDashboard from "../components/EmployeeDashboard";
import MainNavbar from "../components/MainNavbar";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SignedInSidebar from "../components/Sidebar/signedInSidebar";
class EmployeeDashboardPage extends Component {
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
      const type = localStorage.getItem("type");
      // const isApproved = localStorage.getItem("isApproved");
      let center;
      if (type === "PASSENGER") {
          center = <EmployeeDashboard />;
      } else {
          center = <EmployeeDashboard />;
      }

      return (
          <>
              <SignedInSidebar
                  isOpen={this.state.isOpen}
                  toggle={this.handleToggle}
              />

              <MainNavbar toggle={this.handleToggle} />

              {center}
          </>
      );
  }
}
const mapStateToProps = (state) => {
  return {
      loggedIn: state.auth.loggedIn,
  };
};

export default connect(mapStateToProps, null)(EmployeeDashboardPage);

