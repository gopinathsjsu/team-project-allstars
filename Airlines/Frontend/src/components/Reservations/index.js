import React, { Component } from "react";
import plane from "../../images/plane.jpg";
import axios from "axios";
import Server from "../../webConfig";
import FrontendServer from "../../webConfig";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import UpdateReservation from "./updateReservation";

export default class Reservations extends Component {
	state = {
		show: false,
	};

	onChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleShow = () => {
		this.setState({ show: true });
	};

	cancelReservation = (resId) => (e) => {
		let originalMileagePoints = parseInt(localStorage.getItem("mileagePoints"));
		//const redirectURL = `${FrontendServer}/reservations`;
		console.log("cancel Reservation");
		console.log("resId", resId);
		swal({
			title: "Are you sure?",
			text: "It will cancel your reservation",
			type: "warning",
			buttons: ["No, Do not cancel !", "Yes, Cancel it !"],
			// showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(function (isConfirm) {
			if (isConfirm) {
				axios.defaults.withCredentials = true;
				axios
					.post(`${Server}/reservation/cancelReservation/${resId}`)
					.then((response) => {
						console.log("response", response);
						if (response.status === 203) {
							localStorage.setItem("mileagePoints", response.data);
							swal(
								"Cancelled!",
								"You reservation has been cancelled",
								"success"
							).then((okay) => {
								if (okay) {
									//window.location = redirectURL;
									window.location.reload();
								}
							});
						}
					})
					.catch((error) => {
						console.log("error:", error);
						swal(
							"Oops!",
							"Could not find the reservation with given details",
							"error"
						);
					});
			} else {
				swal("NO Cancelation !", "Your reservation is NOT Cancelled!", "error");
			}
		});
	};

	onSelect = (res) => {
		console.log("res obj:", res);
		this.handleShow();
		<UpdateReservation resData={res} />;
	};

	componentDidMount = async () => {
		const _id = localStorage.getItem("user_id");
		axios.defaults.withCredentials = true;
		axios
			.get(`${Server}/reservation/showReservation/${_id}`)
			.then((response) => {
				console.log("response data from showReservation", response.data);
				if (response.status === 200) {
					this.setState({
						reservations: response.data,
					});
				}
			})
			.catch((error) => {
				console.log("error:", error);
				//swal("", "Sorry! There are no reservations", "warning");
			});
	};

	getFullnames = (tDetails) => {
		if (tDetails && tDetails.length > 0) {
			return Array.prototype.map
				.call(tDetails, (t) => t.firstName + " " + t.lastName)
				.toString();
		} else return "";
	};

	getSeats = (tDetails, travelType) => {
		if (tDetails && tDetails.length > 0) {
			if (travelType.toLowerCase() == "economy") {
				return Array.prototype.map
					.call(tDetails, (t) => parseInt(t.seatNumber) + 20)
					.toString();
			} else {
				return Array.prototype.map
					.call(tDetails, (t) => t.seatNumber)
					.toString();
			}
		} else return "";
	};
	render() {
		let reservationDetails = "";
		if (this.state && this.state.reservations) {
			console.log("reservations state", this.state.reservations);
			let reservations = {};
			reservations = this.state.reservations;
			console.log("reservations", reservations);

			reservationDetails = reservations.map((res) => {
				return (
					<>
						<div
							class="w3-row-padding w3-section"
							id={res._id}
							style={{
								justifyContent: "center",
								alignItems: "center",
								border: "1px black",
								fontSize: "15px",
							}}
						>
							<div className="w3-col s1 rt">
								<b>{res.flight}</b>
							</div>
							<div className="w3-col s1 rt">
								<b>{res.origin}</b>
							</div>
							<div className="w3-col s1 rt">
								<b>{res.destination}</b>
							</div>
							<div className="w3-col s1 rt">
								<b>{res.departureDate.split("T")[0]}</b>
								<p>at {res.departureTime}</p>
							</div>
							<div className="w3-col s1 rt">
								<b>{res.arrivalDate.split("T")[0]}</b>
								<p>at {res.arrivalTime}</p>
							</div>
							{/* <div className="w3-col s1 rt">
                <b>{res.numberOfTravellers}</b>
              </div> */}
							<div className="w3-col s2 rt">
								<b>{this.getFullnames(res.travellers)}</b>
							</div>
							<div className="w3-col s1 rt">
								<b>{this.getSeats(res.travellers, res.travelType)}</b>
							</div>
							<div className="w3-col s1 rt">
								<b>${res.price}</b>
							</div>
							<div className="w3-col s1">
								<b>{res.reservationStatus}</b>
							</div>
							{res.reservationStatus === "Cancelled" ? (
								<div></div>
							) : (
								<>
									<div className="w3-col s1 rt">
										{/* <button
                      className="w3-button w3-block "
                      style={{
                        backgroundColor: "#009688",
                        borderRadius: "10px",
                        color: "white",
                      }}
                      //   onClick={() => this.onSelect(res._id)}
                      onClick={() => {
                        this.onSelect(res);
                      }}
                    >
                      Update
                    </button> */}

										<UpdateReservation resData={res} />
									</div>

									<div className="w3-col s1 rt">
										<button
											className="w3-button w3-block "
											style={{
												backgroundColor: "#009688",
												borderRadius: "10px",
												color: "white",
											}}
											onClick={this.cancelReservation(res._id)}
										>
											Cancel
										</button>
									</div>
								</>
							)}
						</div>
						<hr />
					</>
				);
			});
		} else {
			reservationDetails = <h3>You have no reservations yet</h3>;
		}

		return (
			<div className="searchresults_main">
				<div
					className="w3-content w3-margin-top"
					style={{ maxWidth: "1400px" }}
				>
					<div className="w3-row-padding">
						<h2 class="w3-text-grey w3-padding-16">
							<i
								class="
                                    fa fa-plane fa-fw
                                    w3-margin-right w3-xxlarge w3-text-teal
                                "
							></i>
							My Reservations
						</h2>
						<div className="">
							<div className="w3-container w3-card w3-white w3-margin-bottom">
								<div
									className="w3-row-padding w3-section w3-opacity"
									style={{
										justifyContent: "center",
										alignItems: "center",
										border: "1px black",
										fontSize: "18px",
									}}
								>
									<div className="w3-col s1">
										<b>Flight</b>
									</div>
									<div className="w3-col s1">
										<b>Origin</b>
									</div>
									<div className="w3-col s1">
										<b>Destination</b>
									</div>
									<div className="w3-col s1">
										<b>Departure Time</b>
									</div>
									<div className="w3-col s1">
										<b>Arrival Time</b>
									</div>
									{/* <div className="w3-col s1">
                    <b>Travelers Count</b>
                  </div> */}
									<div className="w3-col s2">
										<b>Travelers</b>
									</div>
									<div className="w3-col s1">
										<b>Seats No</b>
									</div>
									<div className="w3-col s1">
										<b>Price</b>
									</div>
									<div className="w3-col s1">
										<b>Status</b>
									</div>

									<div className="w3-col s2"></div>
								</div>
								<hr />
								<div>{reservationDetails}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
