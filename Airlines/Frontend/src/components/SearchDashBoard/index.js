import React, { Component } from "react";
import "./SearchDashBoard.css";
class SearchDashBoard extends Component {
	render() {
		return (
			<div className="main1">
				<div className="wrapper bg-white">
					<form action="#">
						<div>
							<h4>Book a flight</h4>
						</div>

						<div className="form-group border-bottom d-flex align-items-center justify-content-between flex-wrap">
							{" "}
							<label className="option my-sm-0 my-2" />{" "}
							<input type="radio" name="radio" checked />
							Round Trip <span className="checkmark" />
							<span />
							<label /> <label className="option my-sm-0 my-2" />
							<input type="radio" name="radio" />
							One Way <span className="checkmark"></span> <label />
						</div>
						<div className="form-group d-sm-flex margin">
							<div className="d-flex align-items-center flex-fill me-sm-1 my-sm-0 my-4 border-bottom position-relative">
								<input
									type="text"
									required
									placeholder="From"
									id="from"
									name="from"
									className="form-control"
								/>
								<div className="label" id="from"></div>{" "}
								<span className="fas fa-dot-circle text-muted"></span>
							</div>
							<div className="d-flex align-items-center flex-fill ms-sm-1 my-sm-0 my-4 border-bottom position-relative">
								<input
									type="text"
									required
									placeholder="To"
									id="to"
									name="to"
									className="form-control"
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
								/>
								<div className="label" id="depart"></div>
							</div>
							<div className="d-flex align-items-center flex-fill ms-sm-1 my-sm-0 my-4 border-bottom position-relative">
								<input
									type="date"
									required
									id="arrivalDate"
									name="arrivalDate"
									placeholder="Return Date"
									className="form-control"
								/>
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
							<div className="btn btn-primary rounded-0 d-flex justify-content-center text-center p-3">
								Search Flights
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default SearchDashBoard;
