import React, { Component } from "react";
import axios from "axios";
import Server from "../../webConfig";
import swal from "sweetalert";
import { Redirect } from "react-router";

class AddFlight extends Component {
  onSubmit = (e) => {
    e.preventDefault();
    console.log("form submit");
    const data = {
      flightName: this.state.flightName,
      departureFrom: this.state.departFrom,
      arrivalAt: this.state.arrivalAt,
      flightStatus: this.state.flightStatus,
      arrivalDate: this.state.arrivalDate,
      departureDate: this.state.departureDate,
      economySeatsCapacity: this.state.ecoSeatCap,
      businessSeatsCapacity: this.state.busiSeatCap,
      economySeatPrice: this.state.ecoSeatPrice,
      businessSeatPrice: this.state.busiSeatPrice,
    };
    console.log("data", data);
    axios.defaults.withCredentials = true;
    axios
      .post(`${Server}/employee/addFlights`, data)
      .then((response) => {
        console.log("response data from search flight is", response.data);
        if (response.status === 201) {
          swal("Success!", "Flight Added Successfully!", "success");
          <Redirect to="/employee/dashboard" />;
        }
      })
      .catch((error) => {
        console.log("error:", error);
        swal("Oops!", "Could not find the flight with given details", "error");
      });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div className="main1">
        <div className="wrapper bg-white">
          <form onSubmit={this.onSubmit}>
            <div>
              <h4>Add a flight</h4>
            </div>
            <div className="d-flex align-items-center flex-fill me-sm-1 my-sm-0 my-4 border-bottom position-relative">
              <input
                type="text"
                id="name"
                name="flightName"
                placeholder="Flight Name"
                onChange={this.onChange}
                className="form-control"
              />
            </div>
            <div className="form-group d-sm-flex margin">
              <div className="d-flex align-items-center flex-fill me-sm-1 my-sm-0 my-4 border-bottom position-relative">
                <input
                  type="text"
                  required
                  placeholder="Departure"
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
                  placeholder="Arrival"
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
                <input
                  type="date"
                  required
                  placeholder="Arrival Date"
                  id="arrivalDate"
                  name="arrivalDate"
                  className="form-control"
                  onChange={this.onChange}
                />
                <div className="label" id="return"></div>
              </div>
            </div>
            <div className="d-flex align-items-center flex-fill me-sm-1 my-sm-0 my-4 border-bottom position-relative">
              <input
                type="text"
                id="flightStatus"
                name="flightStatus"
                placeholder="Flight Status"
                onChange={this.onChange}
                className="form-control"
              />
            </div>
            <div className="form-group d-sm-flex margin">
              <div className="d-flex align-items-center flex-fill me-sm1 my-sm-0 border-bottom position-relative">
                <input
                  type="text"
                  required
                  placeholder="Economy Seats Capacity"
                  id="ecoSeatCap"
                  name="ecoSeatCap"
                  className="form-control"
                  onChange={this.onChange}
                />
              </div>
              <div className="d-flex align-items-center flex-fill ms-sm-1 my-sm-0 my-4 border-bottom position-relative">
                <input
                  type="text"
                  required
                  placeholder="Business Seats Capacity"
                  id="busiSeatCap"
                  name="busiSeatCap"
                  className="form-control"
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-group d-sm-flex margin">
              <div className="d-flex align-items-center flex-fill me-sm1 my-sm-0 border-bottom position-relative">
                <input
                  type="text"
                  required
                  placeholder="Economy Seats Price"
                  id="ecoSeatPrice"
                  name="ecoSeatPrice"
                  className="form-control"
                  onChange={this.onChange}
                />
              </div>
              <div className="d-flex align-items-center flex-fill ms-sm-1 my-sm-0 my-4 border-bottom position-relative">
                <input
                  type="text"
                  required
                  placeholder="Business Seats Price"
                  id="busiSeatPrice"
                  name="busiSeatPrice"
                  className="form-control"
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-group my-3">
              <button
                type="submit"
                className="btn btn-primary rounded-0 d-flex justify-content-center text-center p-3"
              >
                Add Flight
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddFlight;
