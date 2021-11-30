import React, { Component } from "react";
export default class TravellerInfo extends Component {
	render() {
		return (
			<>
				<div
					className="w3-content w3-margin-top"
					style={{ maxWidth: "1400px" }}
				>
					<div className="w3-row-padding">
						<div className="w3-third">
							<div className="w3-white w3-text-grey w3-card-4">
								<div className="w3-container w3-display-container w3-padding-16">
									<h2>Traveler Information</h2>
									<hr />
									<form action="/action_page.php" target="_blank">
										<p>
											<label>
												<i className=" fa fa-user fa-fw"></i> First Name
											</label>
										</p>
										<input
											className="w3-input w3-border"
											type="text"
											placeholder="First Name"
											name="firstName"
											required
										/>
										<br />
										<p>
											<label>
												<i className="f fa fa-user fa-fw"></i> Last Name
											</label>
										</p>
										<input
											className="w3-input w3-border"
											type="text"
											placeholder="Last Name"
											name="lastName"
											required
										/>
										<br />
										<p>
											<label>
												<i className="fa fa-calendar-check-o"></i> Date of Birth
											</label>
										</p>
										<input
											className="w3-input w3-border"
											type="Date"
											value="1"
											name="Date"
											min="1"
											max="6"
										/>
										<br />
										<p>
											<label>
												<i className="fa fa-mobile"></i> Phone Number
											</label>
										</p>
										<input
											className="w3-input w3-border"
											type="text"
											value="0"
											name="phoneNumber"
											pattern="[1-9]{1}[0-9]{9}"
											title="Please enter valid phone number"
										/>

										<br></br>
										<p>
											<label>
												<i className="fa fa-user fa-fw"></i> Gender
											</label>
										</p>
										<select
											className="w3-input w3-border"
											id="type"
											name="type"
											onChange={this.onChange}
										>
											<option value="" selected disabled hidden>
												Select Gender
											</option>
											<option value="male">Male</option>
											<option value="female">Female</option>
											<option value="other">Other</option>
										</select>
										<br />
										<p>
											<button
												className="w3-button w3-block w3-left-align"
												style={{
													backgroundColor: "#009688",
													borderRadius: "10px",
													color: "white",
												}}
												type="submit"
											>
												<i className="fa fa-search w3-margin-right"></i>{" "}
												Continue
											</button>
										</p>
									</form>
								</div>
							</div>
							<br />
						</div>
					</div>
				</div>
			</>
		);
	}
}
