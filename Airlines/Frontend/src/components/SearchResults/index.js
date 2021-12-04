import React, { Component } from "react";
import plane from "../../images/plane.jpg";
import "./SearchResults.css";
import axios from "axios";
import Server from "../../webConfig";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";


export default class SearchResults extends Component {
    state= {
        flights:{},
        departureFrom:"",
        arrivalAt:"",
        departureDate:"",
        travellers:0,
        type:"",
        reservation : false
    }

    onChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

    onSubmitSearch = (e) => {
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
				if (response.status === 200 ) {
					this.setState({
						flights:response.data
					})
					localStorage.setItem("flights", JSON.stringify(response.data));
                    localStorage.setItem("travelType", searchData.type);
                    localStorage.setItem("numberOfTraveller", this.state.travellers);
				}
			})
			.catch((error) => {
				console.log("error:", error);
				swal("", "Sorry! There are no flights for given inputs. Try to search for other dates/places", "warning");
			});
	};

    onSelect = async (id) => {
        console.log("id----", typeof(id));
        const flights = this.state.flights;
        let reservation ={}
        const travelType = localStorage.getItem("travelType");
        const numberOfTraveller = parseInt(localStorage.getItem("numberOfTraveller"));
        console.log("travelType", travelType);
        flights.forEach(flight => {
            if(id === flight._id){
                const price = travelType === "economy" ? flight.economySeatPrice*numberOfTraveller : flight.businessSeatPrice*numberOfTraveller
                reservation = {
                    flight: flight.flightName,
                    origin: flight.departureFrom,
                    destination: flight.arrivalAt,
                    departureDate: flight.departureDate,
                    arrivalDate: flight.arrivalDate,
                    travelType: travelType,
                    flightId: id,
                    price: price,
                    arrivalTime: flight.arrivalTime,
                    departureTime: flight.departureTime
                }
                localStorage.setItem("selectedFlight", JSON.stringify(flight));
                localStorage.setItem("flightId", flight._id);

            }
        });

        console.log("Reservations: ", reservation);
        localStorage.setItem("reservationDetails", JSON.stringify(reservation));
        
        this.setState({
            ...this.state,
            reservation: true
        })
        
    }

    componentWillMount = async () => {
        const flights = JSON.parse(localStorage.getItem("flights"));
        this.setState({
            flights:flights
        })
        
    }
    render() {
        let flightDetails ="";
        if(this.state && this.state.flights){
            console.log("flightsss",this.state.flights)
            let flights = {};
            flights = this.state.flights;
            flightDetails = flights.map(flight => {
                console.log("ID__", flight._id)
                return(
                <>
                    <div
                class="w3-row-padding w3-section"
                id={flight._id}
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px black",
                    fontSize: "15px",
                    
                }}
            >
                <div className="w3-col s2 rt">
                    <b>{flight.flightName}</b>
                </div>
                <div className="w3-col s2 rt">
                    
                    <b>{flight.departureDate.split('T')[0]}</b>
                    <p>at {flight.departureDate.split('T')[1].split(":")[0]} : {flight.departureDate.split('T')[1].split(":")[1]}</p>
                </div>
                <div className="w3-col s2 rt">
                    <b>{flight.arrivalDate.split('T')[0]}</b>
                    <p>at {flight.arrivalDate.split('T')[1].split(":")[0]} : {flight.arrivalDate.split('T')[1].split(":")[1]}</p>
                </div>
                <div className="w3-col s2 rt">
                    <b>Duration</b>
                </div>
                <div className="w3-col s2 rt">
                    <b>{flight.economySeatPrice}</b>
                </div>
                <div className="w3-col s2 rt">
                <button
                className="w3-button w3-block "
                style={{
                    backgroundColor: "#009688",
                    borderRadius: "10px",
                    color: "white",
                }}
                type="submit"
                onClick = { () => this.onSelect(flight._id)}
            >
                Select
            </button>
                </div>
            </div>       
                    <hr />
                </>
                )
            })
        }else{
            flightDetails = (
                <h1>Loading</h1>
            )
            window.location.reload()
        }
        if(this.state && this.state.reservation){
            return( <Redirect to="/travellerinfo"/>)
        }
        return (
            <div className="searchresults_main">
                <div
                    className="w3-content w3-margin-top"
                    style={{ maxWidth: "1400px" }}
                >
                    <div className="w3-row-padding">
                        <div className="w3-third">
                            <div className="w3-white w3-text-grey w3-card-4">
                                <div className="w3-container w3-display-container w3-padding-16">
                                    <img
                                        src={plane}
                                        alt=""
                                        style={{ width: "100%" }}
                                    />
                                    <br />
                                    <h2>Update Search</h2>
                                    <hr />
                                    <form
                                        onSubmit={this.onSubmitSearch}
                                    >
                                        <p>
                                            <label>
                                                <i className=" fa fa-globe fa-fw"></i>{" "}
                                                From
                                            </label>
                                        </p>
                                        <input
                                            className="w3-input w3-border"
                                            type="text"
                                            placeholder="San Jose"
                                            name="From"
                                            required
                                            onChange={this.onChange}
                                            id="departureFrom"
                                        />
                                        <br />
                                        <p>
                                            <label>
                                                <i className="f fa fa-globe fa-fw"></i>{" "}
                                                To
                                            </label>
                                        </p>
                                        <input
                                            className="w3-input w3-border"
                                            type="text"
                                            placeholder="Atlanta"
                                            name="To"
                                            required
                                            onChange={this.onChange}
                                            id="arrivalAt"
                                        />
                                        <br />
                                        <p>
                                            <label>
                                                <i className="fa fa-calendar-check-o"></i>{" "}
                                                Date
                                            </label>
                                        </p>
                                        <input
                                            className="w3-input w3-border"
                                            type="Date"
                                            name="Date"
                                            onChange={this.onChange}
                                            id="departureDate"
                                        />
                                        <br /> 
                                        <p>
                                            <label>
                                                <i className="fa fa-male"></i>{" "}
                                                Travellers
                                            </label>
                                        </p>
                                        <input
                                            className="w3-input w3-border"
                                            type="number"
                                            name="travellers"
                                            min="0"
                                            max="6"
                                            onChange={this.onChange}
                                            id="numberOfTravellers"
                                        />

                                        <br></br>
                                        <p>
                                            <label>
                                                <i className="fa fa-suitcase fa-fw"></i>{" "}
                                                Booking Type
                                            </label>
                                        </p>
                                        <select
                                            className="w3-input w3-border"
                                            id="type"
                                            name="type"
                                            onChange={this.onChange}
                                        >
                                            <option
                                                value=""
                                                selected
                                                disabled
                                                hidden
                                            >
                                                Select Booking type
                                            </option>
                                            <option value="economy">
                                                Economy
                                            </option>
                                            <option value="business">
                                                Business
                                            </option>
                                        </select>
                                        <br />
                                        <p>
                                            <button
                                                className="w3-button w3-block w3-left-align"
                                                style={{
                                                    backgroundColor: "#009688",
                                                    borderRadius: "10px",
                                                    color: "white",
                                                }}
                                                type="submit"
                                            >
                                                <i className="fa fa-search w3-margin-right"></i>{" "}
                                                Update
                                            </button>
                                        </p>
                                    </form>
                                </div>
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
                                    <div className="w3-col s2">
                                        <b>Flight</b>
                                    </div>
                                    <div className="w3-col s2">
                                        <b>Depart</b>
                                    </div>
                                    <div className="w3-col s2">
                                        <b>Arrive</b>
                                    </div>
                                    <div className="w3-col s2">
                                        <b>Duration</b>
                                    </div>
                                    <div className="w3-col s2">
                                        <b>Price($)</b>
                                    </div>
                                    <div className="w3-col s2">
                                        
                                    </div>
                                    
                                </div>
                                <hr/>
                                    <div>{flightDetails}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
