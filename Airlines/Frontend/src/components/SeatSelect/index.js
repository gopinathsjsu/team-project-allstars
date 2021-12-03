import React, { Component } from 'react'
import Magnifier from "react-magnifier";
import yourImage from "../../images/flightMap.jpg";
import axios from "axios";
import Select from 'react-select';
import { Multiselect } from "multiselect-react-dropdown";
import { Redirect } from "react-router";
export default class SeatSelect extends Component {

    state = {
        reservation : {},
        selectedSeat : [],
        count : localStorage.getItem("numberOfTravellers"),
        continue: false
    }

    onSelect = (data) => {
        console.log("data", data)
        this.setState({
          selectedSeat: data,
        });
        console.log('selected', this.state.selectedSeat);
      };

    componentDidMount = () => {
        // const reservation = JSON.parse(localStorage.getItem("reservationDetails"));
        const travelType = localStorage.getItem("travelType");
     //   const reservation_id = reservation.flightId;
        const selectedflight = JSON.parse(localStorage.getItem("selectedFlight"));
        const seatAvailable = travelType === "economy" ? selectedflight.economySeatsBooked : selectedflight.businessSeatsBooked; 
        console.log("Selected Seats", seatAvailable);
        let seatavailable = []
        let count = 0
        if(travelType === "economy"){
            count = 20;
        }
        

        seatAvailable.forEach(seat => {
            if( seat === false){
                count+=1;
                seatavailable.push({
                    label: count,
                    value : count
                });
            }else{
                count+=1;
            }
            
        })
        console.log("Seat Available", seatavailable);
        this.setState({
            seatAvailable: seatavailable
        })


    }

    onContinue = () => {
		let reservations = JSON.parse(localStorage.getItem("reservationDetails"));
		let travellers = reservations.travellers;
        let selectedSeats = this.state.selectedSeat;
        console.log("SS", selectedSeats);
        let count = 0;
        for(let i = 0; i<travellers.length; i++){
            travellers[i].seatNumber = selectedSeats[i].value;
        }

        reservations.travellers = travellers;
        console.log(reservations);
		localStorage.setItem("reservationDetails", JSON.stringify(reservations));
		this.setState({
			continue: true
		})
	}


    render() {
        if(this.state.continue){
            return( <Redirect to="/confirmation" />)
        }
        // const {selectedOption} = this.state;
        console.log("Seat Avails;;dd", this.state.seatAvailable);
        let reservationDetails = JSON.parse(localStorage.getItem("reservationDetails"));
		let selectedFlightDetails = (
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
           
			</>
		)
        return (
            <>
            <div className="searchresults_main">
                <div
                    className="w3-content w3-margin-top"
                    style={{ maxWidth: "1400px" }}
                >
                    <div className="w3-row-padding">
                        <div className="w3-third" style={{width:"300px", justifyContent:"center", alignItems:"center"}}>
                            
                                <div className="w3-container w3-display-container w3-padding-16">

                                    <Magnifier src={yourImage} 
                                        width="183px" 
                                        height="100%" 
                                        mgShape="square"
                                        mgWidth={120}
                                        mgHeight={120}
                                    />
                                    
                                </div>
                            <br />
                        </div>

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
                        
                               <Multiselect
                                options={this.state.seatAvailable}
                                displayValue="label"
                                placeholder="Select seat(s)"
                                onSelect={this.onSelect}
                                
                                style={{ chips: { background: '#009688' } }}
                                />
                          

                        </div>
								<hr/>
						
                    </div>

                    <div className="w3-row-padding w3-section w3-opacity"
					style={{
						justifyContent: "center",
						alignItems: "center",
						border: "1px black",
						fontSize: "22px",
					}}>
					<button
												className="w3-button w3-block w3-left-align"
												style={{
													backgroundColor: "#009688",
													borderRadius: "10px",
													color: "white",
												}}
												onClick = {this.onContinue}
											>
												
												Continue{" "}
												<i className="fa fa-arrow-right w3-margin-right"></i>{" "}
											</button>
					</div>
					
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}


