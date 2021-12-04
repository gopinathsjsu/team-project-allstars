import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import Server from "../../webConfig";
import FrontendServer from "../../webConfig";
import { Multiselect } from "multiselect-react-dropdown";

class UpdateReservation extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      selectedSeat: [],
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
  componentDidMount = () => {
    const data = {
      travelType: this.props.resData.travelType,
    };
    console.log("data", data);

    const flightId = this.props.resData.flightId;
    axios.defaults.withCredentials = true;
    axios
      .post(`${Server}/reservation/update/${flightId}`, data)
      .then((response) => {
        // console.log("response data from updateReservation", response.data);
        if (response.status === 200) {
          this.setState({
            selectedSeat: response.data,
          });
        }
        console.log("selectedSeat", this.state.selectedSeat);
        const seatAvailable = this.state.selectedSeat;
        let seatavailable = [];
        let count = 0;
        if (this.props.resData.travelType === "economy") {
          count = 20;
        }
        seatAvailable.forEach((seat) => {
          if (count < 72) {
            if (seat) {
              count += 1;
            } else {
              count += 1;

              if (this.props.resData.travelType === "economy") {
                seatavailable.push({
                  label: count,
                  value: count - 20,
                });
              } else {
                seatavailable.push({
                  label: count,
                  value: count,
                });
              }
            }
          }
        });

        this.setState({
          seatAvailable: seatavailable,
        });
      })
      .catch((error) => {
        console.log("error:", error);
        //swal("", "Sorry! There are no reservations", "warning");
      });
  };
  onSelect = (data) => {
    console.log("data", data);
    this.setState({
      selectedSeat: data,
    });
    console.log("selected", this.state.selectedSeat);
  };

  onSubmitUpdate = (e) => {
    e.preventDefault();
    console.log("inside update res");

    let reservationId = this.props.resData._id;

    let travellers = this.props.resData.travellers;
    console.log("travellers", travellers);
    let selectedSeats = this.state.selectedSeat;
    console.log("SS", selectedSeats);
    if (selectedSeats.length != travellers.length) {
      swal(
        "Oops",
        "Please select seats for " + travellers.length + " travellers",
        "warning"
      );
    } else {
      for (let i = 0; i < travellers.length; i++) {
        console.log(selectedSeats[i].value);
        travellers[i].seatNumber = selectedSeats[i].value;
        console.log(travellers[i].seatNumber);
      }
    }

    let reservations = {
      reservationId: reservationId,
      travellers: travellers,
    };

    console.log(reservations);

    // const redirectURL = `${FrontendServer}/reservations`;
    // console.log("redirectURL", redirectURL);
    axios.defaults.withCredentials = true;
    axios
      .post(`${Server}/reservation/update/res/${reservationId}`, reservations)
      .then((response) => {
        console.log("response from update reservation");
        if (response.status === 200) {
          swal(
            "Success!",
            "Seats have been updated in your reservation successfully!",
            "success"
          ).then((okay) => {
            if (okay) {
              window.location.reload(); //= redirectURL;
            }
          });
        }
      })
      .catch((error) => {
        // alert("Failed to update flight");
        console.log("error:", error);
      });
    this.handleClose();
  };

  render() {
    console.log("props", this.props.resData);
    console.log(this.state.seatAvailable);
    return (
      <div className="">
        <button
          className="w3-button w3-block "
          style={{
            backgroundColor: "#009688",
            borderRadius: "10px",
            color: "white",
          }}
          onClick={this.handleShow}
        >
          Update
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <div className="container mt-4">
            <Modal.Header closeButton>
              <Modal.Title className="text-center text-info">
                Update Reservation
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Multiselect
                options={this.state.seatAvailable}
                displayValue="label"
                placeholder="Select seat(s)"
                onSelect={this.onSelect}
                style={{ chips: { background: "#009688" }, color: "black" }}
              />
              <div className="row">
                <form onSubmit={this.onSubmitUpdate}>
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

export default UpdateReservation;
