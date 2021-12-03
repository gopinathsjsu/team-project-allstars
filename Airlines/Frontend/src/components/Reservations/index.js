import React, { Component } from "react";
import plane from "../../images/plane.jpg";
import axios from "axios";
import Server from "../../webConfig";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";

export default class Reservations extends Component {
	state = {};

	onChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
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
								<b>flightName</b>
							</div>
							<div className="w3-col s1 rt">
								<b>{res.origin}</b>
							</div>
							<div className="w3-col s1 rt">
								<b>{res.destination}</b>
							</div>
							<div className="w3-col s1 rt">
								<b>{res.departureDate.split("T")[0]}</b>
								<p>
									at {res.departureDate.split("T")[1].split(":")[0]} :{" "}
									{res.departureDate.split("T")[1].split(":")[1]}
								</p>
							</div>
							<div className="w3-col s1 rt">
								<b>{res.arrivalDate.split("T")[0]}</b>
								<p>
									at {res.arrivalDate.split("T")[1].split(":")[0]} :{" "}
									{res.arrivalDate.split("T")[1].split(":")[1]}
								</p>
							</div>
							<div className="w3-col s1 rt">
								<b>{res.numberOfTravellers}</b>
							</div>
							<div className="w3-col s2 rt">
								<b>Name1, Name2</b>
							</div>
							<div className="w3-col s1 rt">
								<b>{res.price}</b>
							</div>

							<div className="w3-col s1 rt">
								<button
									className="w3-button w3-block "
									style={{
										backgroundColor: "#009688",
										borderRadius: "10px",
										color: "white",
									}}
									onClick={() => this.onSelect(res._id)}
								>
									Update
								</button>
							</div>
							<div className="w3-col s1 rt">
								<button
									className="w3-button w3-block "
									style={{
										backgroundColor: "#009688",
										borderRadius: "10px",
										color: "white",
									}}
									onClick={() => this.onSelect(res._id)}
								>
									Cancel
								</button>
							</div>
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
						<h3>My Reservations</h3>
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
									<div className="w3-col s1">
										<b>Travelers Count</b>
									</div>
									<div className="w3-col s2">
										<b>Travelers Details</b>
									</div>
									<div className="w3-col s1">
										<b>Price</b>
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
