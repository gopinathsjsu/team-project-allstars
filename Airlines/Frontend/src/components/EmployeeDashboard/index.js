import React, { Component } from "react";
import axios from "axios";
import Server from "../../webConfig";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./employeeDashboard.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import UpdateFlight from "./updateFlight";

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dashboard: [],
		};
	}

	componentDidMount = async () => {
		axios.defaults.withCredentials = true;

		axios
			.get(`${Server}/employee/showFlights`)
			.then((response) => {
				console.log(response.data);
				const data = JSON.stringify(response.data);
				const data1 = JSON.parse(data);

				this.setState({
					dashboard: data1,
				});
			})
			.catch((error) => {
				console.log("Error: " + error);
			});
	};

	cancelFlight = (flightName) => (e) => {
		console.log("cancel flight");
		console.log(flightName);
		swal({
			title: "Are you sure?",
			text: "It will permanently deleted the flight!",
			type: "warning",
			buttons: ["No, cancel it!", "Yes, delete it!"],
			// showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(function (isConfirm) {
			if (isConfirm) {
				axios.defaults.withCredentials = true;
				axios
					.delete(`${Server}/employee/deleteFlight/${flightName}`)
					.then((response) => {
						console.log("response data from search flight is", response.data);
						if (response.status === 203) {
							swal("Deleted!", "Flight has been deleted.", "success");
							window.location.reload();
						}
					})
					.catch((error) => {
						console.log("error:", error);
						swal(
							"Oops!",
							"Could not find the flight with given details",
							"error"
						);
					});
			} else {
				swal("Cancelled", "Your flight is not deleted!", "error");
			}
		});
	};

	render() {
		console.log("data to send to modal", this.state);
		return (
			<div className="container">
				<h5>Employee Dashboard</h5>
				<Link to="/employee/addFlight" className="btn btn-primary">
					Add FLights
				</Link>
				<Container>
					<Row xs={3}>
						{this.state.dashboard.map((data) => {
							const arrivalDateTime = data.arrivalDate.toString().split("T");
							const arrivalDate = arrivalDateTime[0];
							const departureDateTime = data.departureDate
								.toString()
								.split("T");
							const departureDate = departureDateTime[0];
							const flightData = {
								arrivalAt: data.arrivalAt,
								arrivalDate: arrivalDate,
								businessSeatPrice: data.businessSeatPrice,
								businessSeatsCapacity: data.businessSeatsCapacity,
								departureDate: departureDate,
								departureFrom: data.departureFrom,
								economySeatPrice: data.economySeatPrice,
								economySeatsCapacity: data.economySeatsCapacity,
								flightName: data.flightName,
								flightStatus: data.flightStatus,
							};
							console.log("flightData", flightData);
							return (
								<Col>
									<Card>
										<Card.Body>
											<Card.Title tag="h5">{data.flightName}</Card.Title>
											<Card.Subtitle tag="h6" className="mb-2 text-muted">
												{data.flightStatus}
											</Card.Subtitle>
											<Card.Text>
												Arrival: {data.arrivalAt.toUpperCase()} <br />
												Departure: {data.departureFrom.toUpperCase()} <br />
											</Card.Text>
											<Button
												type="submit"
												onClick={this.cancelFlight(data.flightName)}
											>
												Cancel
											</Button>
											<UpdateFlight flighData={flightData} />
											{/* <Button >Update</Button> */}
										</Card.Body>
									</Card>
								</Col>
							);
						})}
					</Row>
				</Container>
			</div>
		);
	}
}

export default Dashboard;
