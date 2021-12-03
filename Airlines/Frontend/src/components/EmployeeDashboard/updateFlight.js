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
    const redirectURL = "http://localhost:3000/employee/dashboard";

    const updateFlightData = {
      flightName: this.state.flightName || this.props.flighData.flightName,
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
          swal("Success!", "Flight updated successfully!", "success").then(
            (okay) => {
              if (okay) {
                window.location = redirectURL;
              }
            }
          );
        }
      })
      .catch((error) => {
        alert("Failed to update flight");
        console.log("error:", error);
      });
    this.handleClose();
  };

  render() {
    console.log("props data", this.props.flighData);
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
              <div className="row">
                <form onSubmit={this.onSubmitUpdate}>
                  <div className="row mt-2">
                    <div className="col-5 ">Flight Name : </div>
                    <div className="col-7">
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
                  </div>

                  <div className="row mt-2">
                    <div className="col-5 ">From :</div>
                    <div className="col-7">
                      <input
                        type="text"
                        placeholder="Departure"
                        id="departureFrom"
                        name="departureFrom"
                        className="form-control"
                        onChange={this.onChange}
                        defaultValue={this.props.flighData.departureFrom}
                      />
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-5 ">To :</div>
                    <div className="col-7">
                      <input
                        type="text"
                        placeholder="Arrival"
                        id="arrivalAt"
                        name="arrivalAt"
                        className="form-control"
                        onChange={this.onChange}
                        defaultValue={this.props.flighData.arrivalAt}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-5 ">Departure Date :</div>
                    <div className="col-7">
                      <input
                        type="date"
                        placeholder="Depart Date"
                        id="departureDate"
                        name="departureDate"
                        className="form-control"
                        onChange={this.onChange}
                        defaultValue={this.props.flighData.departureDate}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-5 ">Arrival Date :</div>
                    <div className="col-7">
                      <input
                        type="date"
                        placeholder="Arrival Date"
                        id="arrivalDate"
                        name="arrivalDate"
                        className="form-control"
                        onChange={this.onChange}
                        defaultValue={this.props.flighData.arrivalDate}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-5 ">Flight Status :</div>
                    <div className="col-7">
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
                        <option value="delayed">Delayed</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-5 ">Departure Time :</div>
                    <div className="col-7">
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
                  </div>
                  <div className="row mt-2">
                    <div className="col-5 ">Arrival Time :</div>
                    <div className="col-7">
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
                  </div>
                  <div className="row mt-2">
                    <div className="col-5 ">Economy Seat Price :</div>
                    <div className="col-7">
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
                  </div>
                  <div className="row mt-2">
                    <div className="col-5 ">Business Seat Price :</div>
                    <div className="col-7">
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
                  </div>
                  {/* main1 wrapper bg-white
                <div className="col"> */}
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
            </Modal.Body>
          </div>
        </Modal>
      </div>
    );
  }
}

export default UpdateFlight;
