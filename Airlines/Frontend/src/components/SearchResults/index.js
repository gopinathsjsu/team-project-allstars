import React, { Component } from "react";
import plane from "../../images/plane.jpg";
export default class SearchResults extends Component {
    
    render() {
        return (
            <>
                
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
                                        action="/action_page.php"
                                        target="_blank"
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
                                            value="1"
                                            name="Date"
                                            min="1"
                                            max="6"
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
                                            value="0"
                                            name="Kids"
                                            min="0"
                                            max="6"
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
                                    class="w3-row-padding w3-section w3-opacity"
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        border: "1px black",
                                        fontSize: "18px",
                                    }}
                                >
                                    <div class="w3-col s2">
                                        <b>Depart</b>
                                    </div>
                                    <div class="w3-col s2">
                                        <b>Arrive</b>
                                    </div>
                                    <div class="w3-col s2">
                                        <b>Duration</b>
                                    </div>
                                    <div class="w3-col s3">
                                        <b>Price</b>
                                    </div>
                                    <div class="w3-col s3">
                                        <b>Select</b>
                                    </div>
                                </div>

                                <div className="w3-container">
                                    <h5 className="w3-opacity">
                                        <b>
                                            Front End Developer / w3schools.com
                                        </b>
                                    </h5>
                                    <h6 className="w3-text-teal">
                                        <i className="fa fa-calendar fa-fw w3-margin-right"></i>
                                        Jan 2015 -
                                        <span className="w3-tag w3-teal w3-round">
                                            Current
                                        </span>
                                    </h6>
                                    <p>
                                        Lorem ipsum dolor sit amet. Praesentium
                                        magnam consectetur vel in deserunt
                                        aspernatur est reprehenderit sunt hic.
                                        Nulla tempora soluta ea et odio, unde
                                        doloremque repellendus iure, iste.
                                    </p>
                                    <hr />
                                </div>

                                <div className="w3-container">
                                    <h5 className="w3-opacity">
                                        <b>Web Developer / something.com</b>
                                    </h5>
                                    <h6 className="w3-text-teal">
                                        <i className="fa fa-calendar fa-fw w3-margin-right"></i>
                                        Mar 2012 - Dec 2014
                                    </h6>
                                    <p>
                                        Consectetur adipisicing elit.
                                        Praesentium magnam consectetur vel in
                                        deserunt aspernatur est reprehenderit
                                        sunt hic. Nulla tempora soluta ea et
                                        odio, unde doloremque repellendus iure,
                                        iste.
                                    </p>
                                    <hr />
                                </div>

                                <div className="w3-container">
                                    <h5 className="w3-opacity">
                                        <b>
                                            Graphic Designer /
                                            designsomething.com
                                        </b>
                                    </h5>
                                    <h6 className="w3-text-teal">
                                        <i className="fa fa-calendar fa-fw w3-margin-right"></i>
                                        Jun 2010 - Mar 2012
                                    </h6>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit.
                                    </p>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
