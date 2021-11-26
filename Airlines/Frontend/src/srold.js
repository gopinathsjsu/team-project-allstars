import React, { Component } from "react";

export default class SearchResults extends Component {
    render() {
        return (
            <>
                <div className="w3-content w3-border-left w3-border-right">
                    <nav
                        className="w3-sidebar w3-light-grey w3-collapse w3-top"
                        style={{ zIndex: "3", width: "260px" }}
                        id="mySidebar"
                    >
                        <div className="w3-container w3-display-container w3-padding-16">
                            <i
                                onclick="w3_close()"
                                className="fa fa-remove w3-hide-large w3-button w3-transparent w3-display-topright"
                            ></i>
                            <h3>Rental</h3>
                            <h3>from $99</h3>
                            <h6>per night</h6>
                            <form action="/action_page.php" target="_blank">
                                <p>
                                    <label>
                                        <i className="fa fa-calendar-check-o"></i>{" "}
                                        Check In
                                    </label>
                                </p>
                                <input
                                    className="w3-input w3-border"
                                    type="text"
                                    placeholder="DD MM YYYY"
                                    name="CheckIn"
                                    required
                                />
                                <p>
                                    <label>
                                        <i className="fa fa-calendar-o"></i>{" "}
                                        Check Out
                                    </label>
                                </p>
                                <input
                                    className="w3-input w3-border"
                                    type="text"
                                    placeholder="DD MM YYYY"
                                    name="CheckOut"
                                    required
                                />
                                <p>
                                    <label>
                                        <i className="fa fa-male"></i> Adults
                                    </label>
                                </p>
                                <input
                                    className="w3-input w3-border"
                                    type="number"
                                    value="1"
                                    name="Adults"
                                    min="1"
                                    max="6"
                                />
                                <p>
                                    <label>
                                        <i className="fa fa-child"></i> Kids
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
                                    <button
                                        className="w3-button w3-block w3-green w3-left-align"
                                        type="submit"
                                    >
                                        <i className="fa fa-search w3-margin-right"></i>{" "}
                                        Search availability
                                    </button>
                                </p>
                            </form>
                        </div>
                        <div className="w3-bar-block">
                            <a
                                href="#apartment"
                                className="w3-bar-item w3-button w3-padding-16"
                            >
                                <i className="fa fa-building"></i> Apartment
                            </a>
                            <a
                                href="javascript:void(0)"
                                className="w3-bar-item w3-button w3-padding-16"
                                onclick="document.getElementById('subscribe').style.display='block'"
                            >
                                <i className="fa fa-rss"></i> Subscribe
                            </a>
                            <a
                                href="#contact"
                                className="w3-bar-item w3-button w3-padding-16"
                            >
                                <i className="fa fa-envelope"></i> Contact
                            </a>
                        </div>
                    </nav>

                    <header className="w3-bar w3-top w3-hide-large w3-black w3-xlarge">
                        <span className="w3-bar-item">Rental</span>
                        <a
                            href="javascript:void(0)"
                            className="w3-right w3-bar-item w3-button"
                            onclick="w3_open()"
                        >
                            <i className="fa fa-bars"></i>
                        </a>
                    </header>

                    <div
                        className="w3-overlay w3-hide-large"
                        onclick="w3_close()"
                        style={{ cursor: "pointer" }}
                        title="close side menu"
                        id="myOverlay"
                    ></div>

                    <div
                        className="w3-main w3-white"
                        style={{ marginLeft: "260px" }}
                    ></div>
                    <div
                        className="w3-hide-large"
                        style={{ marginTop: "80px" }}
                    ></div>

                    <div className="w3-container" id="apartment">
                        <h2 className="w3-text-green">The Apartment</h2>
                        <div className="w3-display-container mySlides">
                            <img
                                src="/w3images/livingroom.jpg"
                                style={{ width: "100%", marginBottom: "-6px" }}
                            />
                            <div className="w3-display-bottomleft w3-container w3-black">
                                <p>Living Room</p>
                            </div>
                        </div>
                        <div className="w3-display-container mySlides">
                            <img
                                src="/w3images/diningroom.jpg"
                                style={{ width: "100%", marginBottom: "-6px" }}
                            />
                            <div className="w3-display-bottomleft w3-container w3-black">
                                <p>Dining Room</p>
                            </div>
                        </div>
                        <div className="w3-display-container mySlides">
                            <img
                                src="/w3images/bedroom.jpg"
                                style={{ width: "100%", marginBottom: "-6px" }}
                            />
                            <div className="w3-display-bottomleft w3-container w3-black">
                                <p>Bedroom</p>
                            </div>
                        </div>
                        <div className="w3-display-container mySlides">
                            <img
                                src="/w3images/livingroom2.jpg"
                                style={{ width: "100%", marginBottom: "-6px" }}
                            />
                            <div className="w3-display-bottomleft w3-container w3-black">
                                <p>Living Room II</p>
                            </div>
                        </div>
                    </div>

                    <div className="w3-row-padding w3-section">
                        <div className="w3-col s3">
                            <img
                                className="demo w3-opacity w3-hover-opacity-off"
                                src="/w3images/livingroom.jpg"
                                style={{ width: "100%", cursor: "pointer" }}
                                onclick="currentDiv(1)"
                                title="Living room"
                            />
                        </div>
                        <div className="w3-col s3">
                            <img
                                className="demo w3-opacity w3-hover-opacity-off"
                                src="/w3images/diningroom.jpg"
                                style={{ width: "100%", cursor: "pointer" }}
                                onclick="currentDiv(2)"
                                title="Dining room"
                            />
                        </div>
                        <div className="w3-col s3">
                            <img
                                className="demo w3-opacity w3-hover-opacity-off"
                                src="/w3images/bedroom.jpg"
                                style={{ width: "100%", cursor: "pointer" }}
                                onclick="currentDiv(3)"
                                title="Bedroom"
                            />
                        </div>
                        <div className="w3-col s3">
                            <img
                                className="demo w3-opacity w3-hover-opacity-off"
                                src="/w3images/livingroom2.jpg"
                                style={{ width: "100%", cursor: "pointer" }}
                                onclick="currentDiv(4)"
                                title="Second Living Room"
                            />
                        </div>
                    </div>

                    <div className="w3-container">
                        <h4>
                            <strong>The space</strong>
                        </h4>
                        <div class="w3-row w3-large">
                            <div class="w3-col s6">
                                <p>
                                    <i class="fa fa-fw fa-male"></i> Max people:
                                    4
                                </p>
                                <p>
                                    <i class="fa fa-fw fa-bath"></i> Bathrooms:
                                    2
                                </p>
                                <p>
                                    <i class="fa fa-fw fa-bed"></i> Bedrooms: 1
                                </p>
                            </div>
                            <div class="w3-col s6">
                                <p>
                                    <i class="fa fa-fw fa-clock-o"></i> Check
                                    In: After 3PM
                                </p>
                                <p>
                                    <i class="fa fa-fw fa-clock-o"></i> Check
                                    Out: 12PM
                                </p>
                            </div>
                        </div>
                        <hr></hr>

                        <h4>
                            <strong>Amenities</strong>
                        </h4>
                        <div class="w3-row w3-large">
                            <div class="w3-col s6">
                                <p>
                                    <i class="fa fa-fw fa-shower"></i> Shower
                                </p>
                                <p>
                                    <i class="fa fa-fw fa-wifi"></i> WiFi
                                </p>
                                <p>
                                    <i class="fa fa-fw fa-tv"></i> TV
                                </p>
                            </div>
                            <div class="w3-col s6">
                                <p>
                                    <i class="fa fa-fw fa-cutlery"></i> Kitchen
                                </p>
                                <p>
                                    <i class="fa fa-fw fa-thermometer"></i>{" "}
                                    Heating
                                </p>
                                <p>
                                    <i class="fa fa-fw fa-wheelchair"></i>{" "}
                                    Accessible
                                </p>
                            </div>
                        </div>
                        <hr></hr>

                        <h4>
                            <strong>Extra Info</strong>
                        </h4>
                        <p>
                            Our apartment is really clean and we like to keep it
                            that way. Enjoy the lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p>
                            We accept:{" "}
                            <i class="fa fa-credit-card w3-large"></i>{" "}
                            <i class="fa fa-cc-mastercard w3-large"></i>{" "}
                            <i class="fa fa-cc-amex w3-large"></i>{" "}
                            <i class="fa fa-cc-cc-visa w3-large"></i>
                            <i class="fa fa-cc-paypal w3-large"></i>
                        </p>
                        <hr></hr>

                        <h4>
                            <strong>Rules</strong>
                        </h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                        </p>
                        <p>
                            Subscribe to receive updates on available dates and
                            special offers.
                        </p>
                        <p>
                            <button
                                class="w3-button w3-green w3-third"
                                onclick="document.getElementById('subscribe').style.display='block'"
                            >
                                Subscribe
                            </button>
                        </p>
                    </div>

                    <div className="w3-container" id="contact">
                        <h2>Contact</h2>
                        <i
                            className="fa fa-map-marker"
                            style={{ width: "30px" }}
                        ></i>{" "}
                        Chicago, US
                        <br />
                        <i
                            className="fa fa-phone"
                            style={{ width: "30px" }}
                        ></i>{" "}
                        Phone: +00 151515
                        <br />
                        <i className="fa fa-envelope" style={{ width: "30px" }}>
                            {" "}
                        </i>{" "}
                        Email: mail@mail.com
                        <br />
                        <p>Questions? Go ahead, ask them:</p>
                        <form action="/action_page.php" target="_blank">
                            <p>
                                <input
                                    className="w3-input w3-border"
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="Name"
                                />
                            </p>
                            <p>
                                <input
                                    className="w3-input w3-border"
                                    type="text"
                                    placeholder="Email"
                                    required
                                    name="Email"
                                />
                            </p>
                            <p>
                                <input
                                    className="w3-input w3-border"
                                    type="text"
                                    placeholder="Message"
                                    required
                                    name="Message"
                                />
                            </p>
                            <button
                                type="submit"
                                className="w3-button w3-green w3-third"
                            >
                                Send a Message
                            </button>
                        </form>
                    </div>
                    <footer
                        className="w3-container w3-padding-16"
                        style={{ marginTop: "32px" }}
                    >
                        Powered by{" "}
                        <a
                            href="https://www.w3schools.com/w3css/default.asp"
                            title="W3.CSS"
                            target="_blank"
                            className="w3-hover-text-green"
                        >
                            w3.css
                        </a>
                    </footer>
                </div>
            </>
        );
    }
}
