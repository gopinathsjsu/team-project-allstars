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

	onSubmitSearch = (e) => {
		e.preventDefault();
		// const searchData = {
		// 	departureFrom: this.state.departureFrom,
		// 	arrivalAt: this.state.arrivalAt,
		// 	departureDate: this.state.departureDate,
		// 	type: this.state.type,
		// 	travellers: this.state.travellers,
		// };

		// axios.defaults.withCredentials = true;
		// axios
		// 	.post(`${Server}/flight/search`, searchData)
		// 	.then((response) => {
		// 		console.log("response data from search flight is", response.data);
		// 		if (response.status === 200) {
		// 			this.setState({
		// 				flights: response.data,
		// 			});
		// 			localStorage.setItem("flights", JSON.stringify(response.data));
		// 			localStorage.setItem("travelType", searchData.type);
		// 			localStorage.setItem("numberOfTraveller", this.state.travellers);
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.log("error:", error);
		// 		swal(
		// 			"",
		// 			"Sorry! There are no flights for given inputs. Try to search for other dates/places",
		// 			"warning"
		// 		);
		// 	});
	};

	onSelect = async (id) => {
		console.log("id----", typeof id);
		const flights = this.state.flights;
		let reservation = {};
		const travelType = localStorage.getItem("travelType");
		console.log("travelType", travelType);
		flights.forEach((flight) => {
			if (id === flight._id) {
				const price =
					travelType === "economy"
						? flight.economySeatPrice
						: flight.businessSeatPrice;
				reservation = {
					origin: flight.departureFrom,
					destination: flight.arrivalAt,
					departureDate: flight.departureDate,
					arrivalDate: flight.arrivalDate,
					travelType: travelType,
					flightId: id,
					price: price,
					arrivalTime: flight.arrivalTime,
					departureTime: flight.departureTime,
				};
			}
		});

		console.log("Reservations: ", reservation);
		localStorage.setItem("reservationDetails", JSON.stringify(reservation));
		this.setState({
			...this.state,
			reservation: true,
		});
	};

	componentWillMount = async () => {
		const flights = JSON.parse(localStorage.getItem("flights"));
		this.setState({
			flights: flights,
		});
	};
	render() {
		let flightDetails = "";
		if (this.state && this.state.flights) {
			console.log("flightsss", this.state.flights);
			let flights = {};
			flights = this.state.flights;
			flightDetails = flights.map((flight) => {
				console.log("ID__", flight._id);
				return (
					<>
						<div
							class="w3-row-padding w3-section"
							id={flight._id}
							style={{
								justifyContent: "center",
								alignItems: "center",
								border: "1px black",
								fontSize: "15px",
							}}
						>
							<div className="w3-col s1 rt">
								<b>{flight.flightName}</b>
							</div>
							<div className="w3-col s1 rt">
								<b>Origin</b>
							</div>
							<div className="w3-col s2 rt">
								<b>Destination</b>
							</div>
							<div className="w3-col s2 rt">
								<b>{flight.departureDate.split("T")[0]}</b>
								<p>
									at {flight.departureDate.split("T")[1].split(":")[0]} :{" "}
									{flight.departureDate.split("T")[1].split(":")[1]}
								</p>
							</div>
							<div className="w3-col s2 rt">
								<b>{flight.arrivalDate.split("T")[0]}</b>
								<p>
									at {flight.arrivalDate.split("T")[1].split(":")[0]} :{" "}
									{flight.arrivalDate.split("T")[1].split(":")[1]}
								</p>
							</div>
							<div className="w3-col s1 rt">
								<b>Travellers</b>
							</div>
							<div className="w3-col s1 rt">
								<b>Price</b>
							</div>

							<div className="w3-col s1 rt">
								<button
									className="w3-button w3-block "
									style={{
										backgroundColor: "#009688",
										borderRadius: "10px",
										color: "white",
									}}
									onClick={() => this.onSelect(flight._id)}
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
									onClick={() => this.onSelect(flight._id)}
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
			flightDetails = <h1>Loading</h1>;
			window.location.reload();
		}
		if (this.state && this.state.reservation) {
			return <Redirect to="/travellerinfo" />;
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
										fontSize: "22px",
									}}
								>
									<div className="w3-col s1">
										<b>Flight</b>
									</div>
									<div className="w3-col s1">
										<b>Origin</b>
									</div>
									<div className="w3-col s2">
										<b>Destination</b>
									</div>
									<div className="w3-col s2">
										<b>Departure Time</b>
									</div>
									<div className="w3-col s2">
										<b>Arrival Time</b>
									</div>
									<div className="w3-col s1">
										<b>Travellers</b>
									</div>
									<div className="w3-col s1">
										<b>Price</b>
									</div>

									<div className="w3-col s3"></div>
								</div>
								<hr />
								<div>{flightDetails}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
