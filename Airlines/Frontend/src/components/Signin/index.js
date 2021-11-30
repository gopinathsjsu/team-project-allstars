import React, { Component } from "react";
import bg from "../../images/wave.png";
import plane from "../../images/login.svg";
import profile from "../../images/profile.svg";
import "./Signin.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logIn } from "../../store/actions/loginActions";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";

class SignIn extends Component {
    state = {
        email: "",
        password: "",
        accountType: "",
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.accountType === "") {
            swal(
                "Oops!",
                "Please select one of the two account types",
                "error"
            );
        } else {
            this.props.logIn(this.state);
        }
    };

    render() {
        const { authError } = this.props;
        const { loggedIn } = this.props;
        const { user } = this.props;
        
        if (loggedIn) {
            const accountType = user.type;
            localStorage.setItem("user_id", user._id);
            // localStorage.setItem("name", user.name);
            localStorage.setItem("email", user.email);
            localStorage.setItem("token", user.token);
            localStorage.setItem("type", user.type);
            
            if (accountType === "EMPLOYEE") {
                localStorage.setItem("name", user.employeeName);
				//localStorage.setItem("isApproved", user.isApproved);
				return <Redirect to="/employee/dashboard" />;
            } else if (accountType === "PASSENGER") {
                localStorage.setItem("mileagePoints", user.mileagePoints);
                localStorage.setItem("name", user.passengerName);
                return <Redirect to="/dashboard" />;
            }
        }

        return (
            <div id="signin">
            <div className="name">
            <Link className="home1" to="/">
                Home
            </Link>

            <Link className="home" to="/signup">
                Sign Up
            </Link>
    </div>
                <img src={bg} alt="wavebackground" className="wave" />
                <div className="main-container">
                    <div className="img">
                        <img src={plane} alt="avatar" />
                    </div>
                    <div className="login-form">
                        <form
                            onSubmit={this.handleSubmit}
                            className="signin-form"
                        >
                            <img src={profile} alt="" />
                            <h2>Welcome Back</h2>
                            <div className="input-div username">
                                <div className="i">
                                    <i class="fa fa-user"></i>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Email"
                                        id="email"
                                        name="email"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-div password">
                                <div className="i">
                                    <i class="fa fa-lock"></i>
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        className="input"
                                        placeholder="Password"
                                        id="password"
                                        name="password"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div class="radio">
                                <input
                                    class="radio__input"
                                    value="PASSENGER"
                                    type="radio"
                                    name="accountType"
                                    id="myRadio1"
                                    onChange={this.handleChange}
                                />
                                <label class="radio__label" htmlFor="myRadio1">
                                    Customer
                                </label>
                                <input
                                    class="radio__input"
                                    value="EMPLOYEE"
                                    type="radio"
                                    name="accountType"
                                    id="myRadio2"
                                    onChange={this.handleChange}
                                />
                                <label class="radio__label" htmlFor="myRadio2">
                                    Airline Employee
                                </label>
                            </div>
                            <input
                                type="submit"
                                className="btn"
                                value="Login"
                            />
                           
                            <div>
                                {authError ? (
                                    <p className="logInError">{authError}</p>
                                ) : null}
                                {loggedIn ? <p>LoggedIn</p> : null}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        loggedIn: state.auth.loggedIn,
        user: state.auth.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (newAccount) => dispatch(logIn(newAccount)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
