import React, { Component } from "react";
import "./SearchDashBoard.css";
import axios from "axios";
import Server from "../../webConfig";
import { Redirect } from "react-router";
import swal from "sweetalert";
class SearchDashBoard extends Component {
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const searchData = {
			departureFrom: this.state.departureFrom,
			arrivalAt: this.state.arrivalAt,
			departureDate: this.state.departureDate,
			type: this.state.type,
			travellers: this.state.travellers,
		};
		axios.defaults.withCredentials = true;
		axios
			.post(`${Server}/flight/search`, searchData)
			.then((response) => {
				console.log("response data from search flight is", response.data);
				if (response.status === 200) {
					//need to send the data to next page
				}
			})
			.catch((error) => {
				console.log("error:", error);
				swal("Oops!", "Could not find the flight with given details", "error");
			});
	};

	render() {
		let redirectVar = null;
		return (
			<div className="main1">
				{redirectVar}
				<div className="wrapper bg-white">
					<form onSubmit={this.onSubmit}>
						<div>
							<h4>Book a flight</h4>
						</div>

						<div className="form-group border-bottom d-flex align-items-center">
							{" "}
							<label className="option my-sm-0 my-2" />{" "}
							<input type="radio" name="radio" checked />
							<label className="option my-sm-0 my-2" /> One Way{" "}
						</div>
						<div className="form-group d-sm-flex margin">
							<div className="d-flex align-items-center flex-fill me-sm-1 my-sm-0 my-4 border-bottom position-relative">
								<input
									type="text"
									required
									placeholder="From"
									id="departureFrom"
									name="departureFrom"
									className="form-control"
									onChange={this.onChange}
								/>
								<div className="label" id="from"></div>{" "}
								<span className="fas fa-dot-circle text-muted"></span>
							</div>
							<div className="d-flex align-items-center flex-fill ms-sm-1 my-sm-0 my-4 border-bottom position-relative">
								<input
									type="text"
									required
									placeholder="To"
									id="arrivalAt"
									name="arrivalAt"
									className="form-control"
									onChange={this.onChange}
								/>
								<div className="label" id="to"></div>{" "}
								<span className="fas fa-map-marker text-muted"></span>
							</div>
						</div>
						<div className="form-group d-sm-flex margin">
							<div className="d-flex align-items-center flex-fill me-sm1 my-sm-0 border-bottom position-relative">
								<input
									type="date"
									required
									placeholder="Depart Date"
									id="departureDate"
									name="departureDate"
									className="form-control"
									onChange={this.onChange}
								/>
								<div className="label" id="depart"></div>
							</div>
							<div className="d-flex align-items-center flex-fill ms-sm-1 my-sm-0 my-4 border-bottom position-relative">
								<select
									className="form-control"
									id="type"
									name="type"
									onChange={this.onChange}
								>
									<option value="" selected disabled hidden>
										Select Booking type
									</option>
									<option value="economy">Economy</option>
									<option value="business">Business</option>
								</select>
								<div className="label" id="return"></div>
							</div>
						</div>
						<div className="form-group border-bottom d-flex align-items-center position-relative">
							<input
								type="number"
								required
								id="travellers"
								name="travellers"
								min="1"
								placeholder="Traveller(s)"
								className="form-control"
							/>
							<div className="label" id="psngr"></div>{" "}
							<span className="fas fa-users text-muted"></span>
						</div>
						<div className="form-group my-3">
							<button
								type="submit"
								className="btn btn-primary rounded-0 d-flex justify-content-center text-center p-3"
							>
								Search Flights
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default SearchDashBoard;
