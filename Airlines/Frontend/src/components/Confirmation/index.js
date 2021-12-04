import React, { Component } from 'react'
import swal from "sweetalert";
import axios from "axios";
import Server from "../../webConfig";
import { Redirect } from "react-router-dom";
export default class Confirmation extends Component {
    constructor(props){
		super(props);
		this.state = {travellers : [], continue:false, useMileagePoints : false}
	}

    componentDidMount = () => {
        const reservations = JSON.parse(localStorage.getItem("reservationDetails"));
        this.setState({
            reservations:reservations
        })
    }

    payByMileage = () => {
        const mileagePoints = parseInt(localStorage.getItem("mileagePoints"));
        if(!mileagePoints){
            swal("Opps!", "You don't have any mileage points left in your account", "warning");
        }
        this.setState({
            ...this.state,
            useMileagePoints : true,
            mileagePoints: mileagePoints
        })
    }

    payByMoney = (totalAmount) => {
        const reservations = this.state.reservations;
        // console.log("Reservations 123", reservations);
        reservations.numberOfTravellers = localStorage.getItem("numberOfTraveller");
        reservations.bookedBy = localStorage.getItem("user_id");
        reservations.reservationStatus = "Booked";
        reservations.price = totalAmount;
        reservations.mileagePointsEarned = parseInt(totalAmount/4);
        if(this.state.useMileagePoints){
            reservations.mileagePointsUsed = this.state.mileagePoints;
        }else{
            reservations.mileagePointsUsed = 0;
            
        }

        console.log("Reservations 123", reservations);
        // swal("Booking Confirmed",`You got ${ reservations.mileagePointsEarned} for this Booking.`, "success")
        axios.defaults.withCredentials = true;
		axios
			.post(`${Server}/passenger/reservation`, reservations)
			.then((response) => {
				console.log("response data from search flight is", response.data);
				if (response.status === 200 ) {
                    swal("Booking Confirmed",`You got ${reservations.mileagePointsEarned} for this Booking.`, "success")
                    this.setState({
                        continue: true
                    })
				}
			})
			.catch((error) => {
				console.log("error:", error);
				swal("", "Something went wrong!", "error");
			});
    }

    render() {
        if(this.state && this.state.continue){
			return ( <Redirect to="/seatselect" / >)
		}
        let selectedFlightDetails = ""
        let travellersDetails = ""
        let numberOfTraveller = 0;
        let price = 0;
        let singlePrice = 0;
        let seatPrice = 0;
        let totalSeatPrice = 0;
        let totalAmount = 0;
        if(this.state && this.state.reservations){
            let reservationDetails = this.state.reservations;
            selectedFlightDetails = (
                <>
                <div
                                        className="w3-row-padding w3-section w3-opacity"
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            border: "1px black",
                                            fontSize: "22px",
                                        }}
                                    >
                                        <div className="w3-col s3">
                                            <b>FlightNaME</b>
                                        </div>
                                        <div className="w3-col s2">
                                        <b>{reservationDetails.origin}</b>
                                        </div>
                                        <div className="w3-col s3">
                                            <b>{reservationDetails.destination}</b>
                                        </div>
                                        <div className="w3-col s2">
                                        <b>{reservationDetails.departureDate.split('T')[0]}</b>
                                        <p>at {reservationDetails.departureTime}</p>
                                        </div>
                                        <div className="w3-col s2">
                                        <b>{reservationDetails.arrivalDate.split('T')[0]}</b>
                                        <p>at {reservationDetails.arrivalTime}</p>
                                        </div>
                                    </div>
                <hr/>
                </>
            )

            let travellers = reservationDetails.travellers;
        travellersDetails = travellers.map(t => {
            return(
                <>
                    <div
                class="w3-row-padding w3-section"
                id={t._id}
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px black",
                    fontSize: "15px",
                    
                }}
            >
                <div className="w3-col s2 rt">
                    <b>{t.firstName}</b>
                </div>
                <div className="w3-col s2 rt">
                    
                    <b>{t.lastName}</b>
                </div>
                <div className="w3-col s3 rt">
                    <b>{t.dob.split('T')[0]}</b>
                </div>
                <div className="w3-col s3 rt">
                    <b>{t.phoneNumber}</b>
                </div>
                <div className="w3-col s2 rt">
                    <b>{t.gender}</b>
                </div>

            </div>       
                    
                </>
                )
        })   

        numberOfTraveller = parseInt(localStorage.getItem("numberOfTraveller"));
        price = reservationDetails.price;
        singlePrice = reservationDetails.price/numberOfTraveller;
        seatPrice = localStorage.getItem("travelType") === "economy" ? 39 : 69;
        totalSeatPrice = seatPrice * numberOfTraveller;
        totalAmount = price + totalSeatPrice;

        }else{
            selectedFlightDetails = (
                <div>Loading</div>
            )

            travellersDetails = (
                <div>Loading</div>
            )
        }
        
        let showMileagePoints = ""
        if(this.state && this.state.useMileagePoints){
            const mileagePoints = this.state.mileagePoints;
            const payableAmount = totalAmount - mileagePoints;
            showMileagePoints = (
                <>
                <div class="w3-row">
                    <div class="w3-half w3-container" style={{textAlign: "left"}}>
                        <h5>Total</h5>
                    </div>
                    <div class="w3-half w3-container" style={{textAlign: "right"}}>
                        <h5>{"$"}{totalAmount}</h5>
                    </div>
                </div>
                <div class="w3-row">
                    <div class="w3-half w3-container" style={{textAlign: "left"}}>
                        <h5>Mileage Points</h5>
                    </div>
                    <div class="w3-half w3-container" style={{textAlign: "right"}}>
                        <h5>{"-$"}{mileagePoints}</h5>
                    </div>
                </div>
                <hr/>
                <div class="w3-row">
                    <div class="w3-half w3-container" style={{textAlign: "left"}}>
                        <h4 style={{color:"black"}}>Payable Amount</h4>
                    </div>
                    <div class="w3-half w3-container" style={{textAlign: "right"}}>
                        <h3 style={{color:"black"}}>{"$"}{payableAmount}</h3>
                    </div>
                </div>
                </>
            )
        }
        
        return (
            <>
				<div
					className="w3-content w3-margin-top"
					style={{ maxWidth: "1400px" }}
				>
					<div className="w3-row-padding">
						
						<div className="w3-twothird">
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
                                    <div className="w3-col s3">
                                        <b>Flight</b>
                                    </div>
									<div className="w3-col s2">
									<b>Origin</b>
								</div>
								<div className="w3-col s3">
									<b>Destination</b>
								</div>
                                    <div className="w3-col s2">
                                        <b>Depart</b>
                                    </div>
                                    <div className="w3-col s2">
                                        <b>Arrive</b>
                                    </div>
                                   
                                    
                                </div>
                                <hr/>
                                   {selectedFlightDetails}
                            </div>

							<div class="w3-container w3-card w3-white">
                        <h2 class="w3-text-grey w3-padding-16">
                            <i
                                class="
                                    fa fa-user fa-fw
                                    w3-margin-right w3-xxlarge w3-text-teal
                                "
                            ></i
                            >Travellers
                        </h2>
						<div
                                    className="w3-row-padding w3-section w3-opacity"
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        border: "1px black",
                                        fontSize: "22px",
                                    }}
                                >
                                    <div className="w3-col s2">
                                        <b>First Name</b>
                                    </div>
                                    <div className="w3-col s2">
                                        <b>Last Name</b>
                                    </div>
                                    <div className="w3-col s3">
                                        <b>Date of Birth</b>
                                    </div>
                                    <div className="w3-col s3">
                                        <b>Phone Number</b>
                                    </div>
                                    <div className="w3-col s2">
                                        <b>Gender</b>
                                    </div>
                                    
                                    
                        </div>
								<hr/>
								{travellersDetails}
                    </div>

					<div className="w3-row-padding w3-section w3-opacity"
					style={{
						justifyContent: "center",
						alignItems: "center",
						border: "1px black",
						fontSize: "22px",
					}}>
					
					</div>
					
                        </div>
                        <div className="w3-third">
							<div className="w3-white w3-text-grey w3-card-4">
								<div className="w3-container w3-display-container w3-padding-16">
									<h2>Fare Summary</h2>
									<hr />
									
										<b style={{fontSize:"20px", color:"black"}}>
											<label>
											 Base Fare
											</label>
										</b>

                                        <div class="w3-row">
                                            <div class="w3-half w3-container" style={{textAlign: "left"}}>
                                                <h5>Adult(s){" "}({numberOfTraveller} * {"$"}{singlePrice})</h5>
                                            </div>
                                            <div class="w3-half w3-container" style={{textAlign: "right"}}>
                                                <h5>{"$"}{price}</h5>
                                            </div>
                                        </div>
										
                                        <hr/>
										<br />

                                       
										<b style={{fontSize:"20px", color:"black"}}>
											<label>
											 Seat Charges
											</label>
										</b>
                                        <div class="w3-row">
                                        <div class="w3-half w3-container" style={{textAlign: "left"}}>
                                            <h5>Adult(s){" "}({numberOfTraveller} * {"$"}{seatPrice})</h5>
                                        </div>
                                        <div class="w3-half w3-container" style={{textAlign: "right"}}>
                                            <h5>{"$"}{totalSeatPrice}</h5>
                                        </div>
                                    </div>
                                    
                                    <hr/>
                                    <br />
                                    <div class="w3-row">
                                    <div class="w3-half w3-container" style={{textAlign: "left"}}>
                                        <h3 style={{color:"black"}}>Total Amount</h3>
                                    </div>
                                    <div class="w3-half w3-container" style={{textAlign: "right"}}>
                                        <h3 style={{color:"black"}}>{"$"}{totalAmount}</h3>
                                    </div>
                                </div>
									
										<br />
										<p>
											<button
												className="w3-button w3-block w3-left-align"
												style={{
													backgroundColor: "#009688",
													borderRadius: "10px",
													color: "white",
                                                    textAlign:"center"
												}}
												onClick = {this.payByMileage}
											>
											Use Mileage Points : {localStorage.getItem("mileagePoints")}
											</button>
										</p>

                                        <br />
                                        {showMileagePoints}
                                        <br />
										<p>
											<button
												className="w3-button w3-block w3-left-align"
												style={{
													backgroundColor: "#009688",
													borderRadius: "10px",
													color: "white",
                                                    textAlign:"center"
												}}
												onClick = {() => this.payByMoney(totalAmount)}
											>
											Pay and Confirm
											</button>
										</p>
									
									
								</div>
							</div>
							<br />
						</div>
					</div>
				</div>
			</>
        )
    }
}
