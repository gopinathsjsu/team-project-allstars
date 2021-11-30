import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import Server from "../../webConfig";

function UpdateFlight(props) {
  const [show, setShow] = useState(false);
  const [fName, setFlightName] = useState();
  const [depFrom, setDepartureFrom] = useState();
  const [arriveAt, setArrivalAt] = useState();
  const [departDate, setDepartureDate] = useState();
  const [arriveDate, setArrivalDate] = useState();
  const [fStatus, setFlightStatus] = useState();
  const [ecoSeatCap, setEcoSeatCap] = useState();
  const [economySeatPrice, setEcoSeatPrice] = useState();
  const [busiSeatCap, setBusiSeatCap] = useState();
  const [businessSeatPrice, setBusiSeatPrice] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChangeFlightName = (e) => {
    setFlightName({
      fName: e.target.value,
    });
  };
  const onChangeDepartureFrom = (e) => {
    setDepartureFrom({
      depFrom: e.target.value,
    });
  };
  const onChangeArrivalAt = (e) => {
    setArrivalAt({
      arriveAt: e.target.value,
    });
  };
  const onChangeDepartureDate = (e) => {
    setDepartureDate({
      departDate: e.target.value,
    });
  };
  const onChangeArrivalDate = (e) => {
    setArrivalDate({
      arriveDate: e.target.value,
    });
  };
  const onChangeFlightStatus = (e) => {
    setFlightStatus({
      fStatus: e.target.value,
    });
  };
  const onChangeEcoSeatCap = (e) => {
    setEcoSeatCap({
      ecoSeatCap: e.target.value,
    });
  };
  const onChangeBusiSeatCap = (e) => {
    setBusiSeatCap({
      busiSeatCap: e.target.value,
    });
  };
  const onChangeBusiSeatPrice = (e) => {
    setBusiSeatPrice({
      businessSeatPrice: e.target.value,
    });
  };
  const onChangeEcoSeatPrice = (e) => {
    setEcoSeatPrice({
      economySeatPrice: e.target.value,
    });
  };
  const onSubmitUpdate = (e) => {
    e.preventDefault();
    console.log("Flight statue", fStatus);
    const updateFlightData = {
      departureFrom: depFrom || props.flighData.departureFrom,
      arrivalAt: arriveAt || props.flighData.arrivalAt,
      flightStatus: fStatus || props.flighData.flightStatus,
      arrivalDate: arriveDate || props.flighData.arrivalDate,
      departureDate: departDate || props.flighData.departureDate,
      economySeatPrice: economySeatPrice || props.flighData.economySeatPrice,
      businessSeatPrice: businessSeatPrice || props.flighData.businessSeatPrice,
    };

    console.log("flight data to post", updateFlightData);
    const flightName = fName || props.flighData.flightName;
    console.log("flight name", flightName);
    axios.defaults.withCredentials = true;
    axios
      .post(`${Server}/employee/updateFlight/${flightName}`, updateFlightData)
      .then((response) => {
        console.log("response after post", response);
      })
      .catch((error) => {
        alert("Failed to update flight");
        console.log("error:", error);
      });
    handleClose();
  };

  return (
    <div className="">
      <Button onClick={handleShow}>Update</Button>

      <Modal show={show} onHide={handleClose}>
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
                <form onSubmit={onSubmitUpdate}>
                  <div className="d-flex align-items-center flex-fill me-sm-1 my-sm-0 my-4 border-bottom position-relative">
                    <input
                      type="text"
                      id="name"
                      name="flightName"
                      placeholder="Flight Name"
                      onChange={onChangeFlightName}
                      className="form-control"
                      defaultValue={props.flighData.flightName}
                    />
                  </div>

                  <div className="d-flex align-items-center flex-fill me-sm-1 my-sm-0 my-4 border-bottom position-relative">
                    <input
                      type="text"
                      placeholder="Departure"
                      id="departureFrom"
                      name="departureFrom"
                      className="form-control"
                      onChange={onChangeDepartureFrom}
                      defaultValue={props.flighData.departureFrom}
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
                      onChange={onChangeArrivalAt}
                      defaultValue={props.flighData.arrivalAt}
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
                      onChange={onChangeDepartureDate}
                      defaultValue={props.flighData.departureDate}
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
                      onChange={onChangeArrivalDate}
                      defaultValue={props.flighData.arrivalDate}
                    />
                    <div className="label" id="return"></div>
                  </div>

                  <div className="d-flex align-items-center flex-fill me-sm-1 my-sm-0 my-4 border-bottom position-relative">
                    <input
                      type="text"
                      id="flightStatus"
                      name="flightStatus"
                      placeholder="Flight Status"
                      onChange={onChangeFlightStatus}
                      className="form-control"
                      defaultValue={props.flighData.flightStatus}
                    />
                  </div>

                  <div className="d-flex align-items-center flex-fill me-sm1 my-sm-0 border-bottom position-relative">
                    <input
                      type="text"
                      placeholder="Economy Seats Capacity"
                      id="ecoSeatCap"
                      name="ecoSeatCap"
                      className="form-control"
                      onChange={onChangeEcoSeatCap}
                      defaultValue={props.flighData.economySeatsCapacity}
                    />
                  </div>
                  <div className="d-flex align-items-center flex-fill ms-sm-1 my-sm-0 my-4 border-bottom position-relative">
                    <input
                      type="text"
                      placeholder="Business Seats Capacity"
                      id="busiSeatCap"
                      name="busiSeatCap"
                      className="form-control"
                      onChange={onChangeBusiSeatCap}
                      defaultValue={props.flighData.businessSeatsCapacity}
                    />
                  </div>

                  <div className="d-flex align-items-center flex-fill me-sm1 my-sm-0 border-bottom position-relative">
                    <input
                      type="text"
                      placeholder="Economy Seats Price"
                      id="ecoSeatPrice"
                      name="ecoSeatPrice"
                      className="form-control"
                      onChange={onChangeEcoSeatPrice}
                      defaultValue={props.flighData.economySeatPrice}
                    />
                  </div>
                  <div className="d-flex align-items-center flex-fill ms-sm-1 my-sm-0 my-4 border-bottom position-relative">
                    <input
                      type="text"
                      placeholder="Business Seats Price"
                      id="busiSeatPrice"
                      name="busiSeatPrice"
                      className="form-control"
                      onChange={onChangeBusiSeatPrice}
                      defaultValue={props.flighData.businessSeatPrice}
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
export default UpdateFlight;
