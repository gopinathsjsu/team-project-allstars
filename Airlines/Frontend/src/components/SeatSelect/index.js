import React, { Component } from 'react'
import Magnifier from "react-magnifier";
import yourImage from "../../images/flightMap.jpg";


export default class SeatSelect extends Component {
    render() {
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
                                    {/*<div>{flightDetails}</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}


