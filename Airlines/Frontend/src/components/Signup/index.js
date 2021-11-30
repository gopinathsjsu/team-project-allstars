import React, { Component } from "react";
import photo from "../../images/signup2.svg";
import "./Signup.css";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/loginActions";
import { Redirect, Link } from "react-router-dom";
import swal from "sweetalert";
import MainNavbar from "../MainNavbar";

class SignUp extends Component {
	state = {
		name: "",
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
			swal("Oops!", "Please select one of the two account types", "error");
		} else {
			console.log(this.state);
			this.props.signUp(this.state);
		}
	};

	render() {
		const { authError } = this.props;
		const { loggedIn } = this.props;
		const { user } = this.props;

		if (loggedIn) {
			const accountType = user.type;
			console.log("user: ", user);
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
			<div className="signup_main">
				<div className="name">
					<Link className="home1" to="/">
						Home
					</Link>

					<Link className="home" to="/signin">
						Sign In
					</Link>
				</div>
				<div id="signup" style={{ paddingTop: "60px" }}>
					<section className="leftside">
						<img src={photo} alt="" />
					</section>
					<section className="signup-main">
						<div className="signup-container">
							<p className="title">Welcome</p>
							<div className="separator"></div>
							<p class="welcome-message">Please enter details</p>
							<form
								action=""
								className="signup-form"
								onSubmit={this.handleSubmit}
							>
								<div className="signup-form-control">
									<input
										className="signup-input"
										type="text"
										placeholder="Username"
										id="name"
										name="name"
										onChange={this.handleChange}
										required
									/>
									<i class="fa fa-user"></i>
								</div>
								<div className="signup-form-control">
									<input
										className="signup-input"
										type="email"
										placeholder="Email"
										id="email"
										name="email"
										pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$"
										title="Please enter valid email address"
										onChange={this.handleChange}
										required
									/>
									<i class="fa fa-user"></i>
								</div>
								<div class="signup-form-control">
									<input
										className="signup-input"
										type="password"
										placeholder="Password"
										id="password"
										name="password"
										onChange={this.handleChange}
										required
									/>
									<i class="fa fa-lock"></i>
								</div>{" "}
								<div class="radio-signup">
									<input
										class="radio__input_signup"
										value="PASSENGER"
										type="radio"
										name="accountType"
										id="myRadio1"
										onChange={this.handleChange}
									/>
									<label class="radio__label_signup" for="myRadio1">
										Customer
									</label>
									<input
										class="radio__input_signup"
										value="EMPLOYEE"
										type="radio"
										name="accountType"
										id="myRadio2"
										onChange={this.handleChange}
									/>
									<label class="radio__label_signup" for="myRadio2">
										Airline Employee
									</label>
								</div>{" "}
								<button type="submit" className="signup-submit">
									Sign Up
								</button>
								<div>
									{authError ? <p className="logInError">{authError}</p> : null}
									{loggedIn ? <p>LoggedIn</p> : null}
								</div>
							</form>
						</div>
					</section>
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
		signUp: (newAccount) => dispatch(signUp(newAccount)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
