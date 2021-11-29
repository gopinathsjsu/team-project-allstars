import React, { Component } from "react";
import SearchResults from "../components/SearchResults";
import Navbar from "../components/Navbar";

export default class searchresults extends Component {
    render() {
        return (
            <>
                <Navbar/>
                <SearchResults />
            </>
        );
    }
}
