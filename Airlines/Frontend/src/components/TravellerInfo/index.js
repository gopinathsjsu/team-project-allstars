import React, { Component } from "react";
import { Redirect } from "react-router";
import swal from "sweetalert";
export default class TravellerInfo extends Component {
	constructor(props){
		super(props);
		this.state = {travellers : [], count: parseInt(localStorage.getItem("numberOfTraveller")), continue:false}
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	onAdd = () => {

		let count = this.state.count;
		if(count>0){
			let new_travellers = {
				firstName: this.state.firstName,
				lastName : this.state.lastName,
				dob: this.state.dob,
				gender: this.state.gender,
				phoneNumber: this.state.phoneNumber
			}

			count-=1;
			this.setState({
				travellers : this.state.travellers.concat(new_travellers),
				count:count
			})
			
		}else{
			swal("", "You have added number of travellers you selected. Please do new search for adding more travellers", "warning")
		}
		
	}

	onContinue = () => {
		let reservations = JSON.parse(localStorage.getItem("reservationDetails"));
		const travellers = this.state.travellers;
		// Object.assign(reservations, travellers);
		// reservations.push(travellers);
		reservations.travellers = travellers
		localStorage.setItem("reservationDetails", JSON.stringify(reservations));
		this.setState({
			continue: true
		})
	}

	render() {
		if(this.state && this.state.continue){
			return ( <Redirect to="/seatselect" / >)
		}
		let reservationDetails = JSON.parse(localStorage.getItem("reservationDetails"));
		let selectedFlightDetails = (
			<>
			<div
                                    className="w3-row-padding w3-section w3-opacity"
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        border: "1px black",
                                        fontSize: "22px",
                                    }}
                                >
                                    <div className="w3-col s3">
                                        <b>FlightNaME</b>
                                    </div>
									<div className="w3-col s2">
									<b>{reservationDetails.origin}</b>
                                    </div>
                                    <div className="w3-col s3">
                                        <b>{reservationDetails.destination}</b>
                                    </div>
                                    <div className="w3-col s2">
									<b>{reservationDetails.departureDate.split('T')[0]}</b>
									<p>at {reservationDetails.departureTime}</p>
                                    </div>
                                    <div className="w3-col s2">
									<b>{reservationDetails.arrivalDate.split('T')[0]}</b>
                    				<p>at {reservationDetails.arrivalTime}</p>
                                    </div>
                                </div>
            <hr/>
			</>
		)

		let travellersDetails = ""
		if(this.state && this.state.travellers && this.state.travellers.length>0){
			console.log("Travelers : ", this.state.travellers)
			let travellers = this.state.travellers
			travellersDetails = travellers.map(t => {
				return(
					<>
						<div
					class="w3-row-padding w3-section"
					id={t._id}
					style={{
						justifyContent: "center",
						alignItems: "center",
						border: "1px black",
						fontSize: "15px",
						
					}}
				>
					<div className="w3-col s2 rt">
						<b>{t.firstName}</b>
					</div>
					<div className="w3-col s2 rt">
						
						<b>{t.lastName}</b>
					</div>
					<div className="w3-col s3 rt">
						<b>{t.dob.split('T')[0]}</b>
					</div>
					<div className="w3-col s3 rt">
						<b>{t.phoneNumber}</b>
					</div>
					<div className="w3-col s2 rt">
						<b>{t.gender}</b>
					</div>

				</div>       
						
					</>
					)
			})
			
		}
		else{
			travellersDetails = (
					<h3>Add a traveller</h3>
			)
		}


		
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
											onChange={this.onChange}
										
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
											onChange={this.onChange}
										
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
											
											name="dob"
											onChange={this.onChange}
										
										/>
										<br />
										<p>
											<label>
												<i className="fa fa-mobile"></i> Phone Number
											</label>
										</p>
										<input
											className="w3-input w3-border"
											type="number"
											required
											name="phoneNumber"
											pattern="[1-9]{1}[0-9]{9}"
											title="Please enter valid phone number"
											onChange={this.onChange}
										
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
											name="gender"
											onChange={this.onChange}
										>
											<option value="" selected disabled hidden>
												Select Gender
											</option>
											<option value="male">Male</option>
											<option value="female">Female</option>
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
												onClick = {this.onAdd}
											>
												<i className="fa fa-plus w3-margin-right"></i>{" "}
												Add
											</button>
										</p>
									
								</div>
							</div>
							<br />
						</div>
						<div className="w3-twothird">
                            <div className="w3-container w3-card w3-white w3-margin-bottom">
                                <div
                                    className="w3-row-padding w3-section w3-opacity"
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        border: "1px black",
                                        fontSize: "22px",
                                    }}
                                >
                                    <div className="w3-col s3">
                                        <b>Flight</b>
                                    </div>
									<div className="w3-col s2">
									<b>Origin</b>
								</div>
								<div className="w3-col s3">
									<b>Destination</b>
								</div>
                                    <div className="w3-col s2">
                                        <b>Depart</b>
                                    </div>
                                    <div className="w3-col s2">
                                        <b>Arrive</b>
                                    </div>
                                   
                                    
                                </div>
                                <hr/>
                                   {selectedFlightDetails}
                            </div>

							<div class="w3-container w3-card w3-white">
                        <h2 class="w3-text-grey w3-padding-16">
                            <i
                                class="
                                    fa fa-user fa-fw
                                    w3-margin-right w3-xxlarge w3-text-teal
                                "
                            ></i
                            >Travellers
                        </h2>
						<div
                                    className="w3-row-padding w3-section w3-opacity"
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        border: "1px black",
                                        fontSize: "22px",
                                    }}
                                >
                                    <div className="w3-col s2">
                                        <b>First Name</b>
                                    </div>
                                    <div className="w3-col s2">
                                        <b>Last Name</b>
                                    </div>
                                    <div className="w3-col s3">
                                        <b>Date of Birth</b>
                                    </div>
                                    <div className="w3-col s3">
                                        <b>Phone Number</b>
                                    </div>
                                    <div className="w3-col s2">
                                        <b>Gender</b>
                                    </div>
                                    
                                    
                        </div>
								<hr/>
								{travellersDetails}
                    </div>

					<div className="w3-row-padding w3-section w3-opacity"
					style={{
						justifyContent: "center",
						alignItems: "center",
						border: "1px black",
						fontSize: "22px",
					}}>
					<button
												className="w3-button w3-block w3-left-align"
												style={{
													backgroundColor: "#009688",
													borderRadius: "10px",
													color: "white",
												}}
												onClick = {this.onContinue}
											>
												
												Continue{" "}
												<i className="fa fa-arrow-right w3-margin-right"></i>{" "}
											</button>
					</div>
					
                        </div>
					</div>
				</div>
			</>
		);
	}
}
