import React, { Component } from "react";
import "./SearchDashBoard.css";
import axios from "axios";
import Server from "../../webConfig";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
class SearchDashBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	onChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
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
		// console.log("search criteria: ", searchData);
		axios.defaults.withCredentials = true;
		axios
			.post(`${Server}/flight/search`, searchData)
			.then((response) => {
				console.log("response data from search flight is", response.data);
				if (response.status === 200 ) {
					this.setState({
						flights:response.data
					})
					localStorage.setItem("flights", JSON.stringify(response.data));
					localStorage.setItem("travelType", searchData.type);
				}
			})
			.catch((error) => {
				console.log("error:", error);
				swal("", "Sorry! There are no flights for given inputs. Try to search for other dates/places", "warning");
			});
	};

	render() {
		let redirectVar = null;
		console.log("this.state: " + this.state);
		if(this.state.flights && this.state.flights.length>0){
			return <Redirect to="/searchresults"/>;	
		}
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
								onChange={this.onChange}
							/>
							<div className="label" id="psngr"></div>{" "}
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
