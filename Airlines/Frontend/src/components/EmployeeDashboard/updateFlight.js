import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import Server from "../../webConfig";

class UpdateFlight extends Component {
	constructor() {
		super();
		this.state = {
			show: false,
		};
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleShow = () => {
		this.setState({ show: true });
	};

	handleClose = () => {
		this.setState({ show: false });
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	onSubmitUpdate = (e) => {
		e.preventDefault();

		const updateFlightData = {
			departureFrom:
				this.state.departureFrom || this.props.flighData.departureFrom,
			arrivalAt: this.state.arrivalAt || this.props.flighData.arrivalAt,
			flightStatus:
				this.state.flightStatus || this.props.flighData.flightStatus,
			arrivalDate: this.state.arrivalDate || this.props.flighData.arrivalDate,
			departureDate:
				this.state.departureDate || this.props.flighData.departureDate,
			economySeatPrice:
				this.state.ecoSeatPrice || this.props.flighData.economySeatPrice,
			businessSeatPrice:
				this.state.busiSeatPrice || this.props.flighData.businessSeatPrice,
			departureTime:
				this.state.departureTime || this.props.flighData.departureTime,
			arrivalTime: this.state.arrivalTime || this.props.flighData.arrivalTime,
		};

		const flightName = this.state.flightName || this.props.flighData.flightName;

		console.log("updateFlightData: ", updateFlightData);
		axios.defaults.withCredentials = true;
		axios
			.post(`${Server}/employee/updateFlight/${flightName}`, updateFlightData)
			.then((response) => {
				if (response.status === 202) {
					swal("Success!", "Flight updated successfully!", "success");
				}
			})
			.catch((error) => {
				alert("Failed to update flight");
				console.log("error:", error);
			});
		this.handleClose();
	};

	render() {
		return (
			<div className="">
				<Button onClick={this.handleShow}>Update</Button>

				<Modal show={this.state.show} onHide={this.handleClose}>
					<div className="container mt-4">
						<Modal.Header closeButton>
							<Modal.Title className="text-center text-info">
								Update Flight
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div className="">
								{/* main1 wrapper bg-white */}
								<div className="">
									<form onSubmit={this.onSubmitUpdate}>
										<div className="d-flex align-items-center flex-fill me-sm-1 my-sm-0 my-4 border-bottom position-relative">
											<input
												type="text"
												id="name"
												name="flightName"
												placeholder="Flight Name"
												onChange={this.onChange}
												className="form-control"
												defaultValue={this.props.flighData.flightName}
											/>
										</div>

										<div className="d-flex align-items-center flex-fill me-sm-1 my-sm-0 my-4 border-bottom position-relative">
											<input
												type="text"
												placeholder="Departure"
												id="departureFrom"
												name="departureFrom"
												className="form-control"
												onChange={this.onChange}
												defaultValue={this.props.flighData.departureFrom}
											/>
											<div className="label" id="from"></div>{" "}
											<span className="fas fa-dot-circle text-muted"></span>
										</div>

										<div className="d-flex align-items-center flex-fill ms-sm-1 my-sm-0 my-4 border-bottom position-relative">
											<input
												type="text"
												placeholder="Arrival"
												id="arrivalAt"
												name="arrivalAt"
												className="form-control"
												onChange={this.onChange}
												defaultValue={this.props.flighData.arrivalAt}
											/>
											<div className="label" id="to"></div>{" "}
											<span className="fas fa-map-marker text-muted"></span>
										</div>

										<div className="d-flex align-items-center flex-fill me-sm1 my-sm-0 border-bottom position-relative">
											<input
												type="date"
												placeholder="Depart Date"
												id="departureDate"
												name="departureDate"
												className="form-control"
												onChange={this.onChange}
												defaultValue={this.props.flighData.departureDate}
											/>
											<div className="label" id="depart"></div>
										</div>

										<div className="d-flex align-items-center flex-fill ms-sm-1 my-sm-0 my-4 border-bottom position-relative">
											<input
												type="date"
												placeholder="Arrival Date"
												id="arrivalDate"
												name="arrivalDate"
												className="form-control"
												onChange={this.onChange}
												defaultValue={this.props.flighData.arrivalDate}
											/>
											<div className="label" id="return"></div>
										</div>

										<div className="d-flex align-items-center flex-fill me-sm-1 my-sm-0 my-4 border-bottom position-relative">
											<select
												className="form-control"
												id="flightStatus"
												name="flightStatus"
												onChange={this.onChange}
												defaultValue={this.props.flighData.flightStatus}
											>
												<option value="" selected disabled hidden>
													Select Flight status
												</option>
												<option value="ontime">Ontime</option>
												<option value="cancelled">Cancelled</option>
											</select>
										</div>

										<div className="d-flex align-items-center flex-fill me-sm1 my-sm-0 border-bottom position-relative">
											<input
												type="time"
												placeholder="Departure Time"
												id="departureTime"
												name="departureTime"
												className="form-control"
												onChange={this.onChange}
												defaultValue={this.props.flighData.departureTime}
											/>
										</div>
										<div className="d-flex align-items-center flex-fill ms-sm-1 my-sm-0 my-4 border-bottom position-relative">
											<input
												type="time"
												placeholder="Arrival Time"
												id="arrivalTime"
												name="arrivalTime"
												className="form-control"
												onChange={this.onChange}
												defaultValue={this.props.flighData.arrivalTime}
											/>
										</div>

										<div className="d-flex align-items-center flex-fill me-sm1 my-sm-0 border-bottom position-relative">
											<input
												type="text"
												placeholder="Economy Seats Price"
												id="ecoSeatPrice"
												name="ecoSeatPrice"
												className="form-control"
												onChange={this.onChange}
												defaultValue={this.props.flighData.economySeatPrice}
											/>
										</div>
										<div className="d-flex align-items-center flex-fill ms-sm-1 my-sm-0 my-4 border-bottom position-relative">
											<input
												type="text"
												placeholder="Business Seats Price"
												id="busiSeatPrice"
												name="busiSeatPrice"
												className="form-control"
												onChange={this.onChange}
												defaultValue={this.props.flighData.businessSeatPrice}
											/>
										</div>

										<div className="form-group my-3">
											<button
												type="submit"
												className="btn btn-primary rounded-0 d-flex justify-content-center text-center p-3"
											>
												Save
											</button>
										</div>
									</form>
								</div>
							</div>
						</Modal.Body>
					</div>
				</Modal>
			</div>
		);
	}
}

export default UpdateFlight;
