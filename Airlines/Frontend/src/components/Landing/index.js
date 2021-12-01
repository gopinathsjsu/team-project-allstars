import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainNavbar from "../MainNavbar";
import Sidebar from "..Sidebar";
import plane from "../../images/landing-plane.svg";
import './landing.css';

const Landing = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <MainNavbar toggle={toggle} />
            <div class="landing_main">
                <div class="landing_main-container">
                    <div class="landing_main-content">
                        <h1>Exploring The World In Comfort</h1>
                        <p>Travel has never been this easy. Greatest Reward, Luxury Travel.</p>
                        <button class = "landing_main-btn"><Link to="/SignUp">Register Now</Link></button>
                    </div>
                    <div class="landing_main-img-container">
                        <img src={plane} alt="Plane" id="landing_main-img"></img>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Landing;
