import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import SigninPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import DashBoardPage from "./pages/dashboard";
import SearchResultsPage from "./pages/searchresults";
import LandingPage from "./pages/landing";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeDashboardPage from "./pages/employeeDashboard";
import FlightAddition from "./pages/addFlight";
import TravellerInfoPage from "./pages/travellerInfo";
import "bootstrap/dist/css/bootstrap.min.css";
import SeatSelect from "./pages/seatselect";
import reservations from "./pages/reservations";
import ConfirmationPage from "./pages/confirmation"

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={LandingPage}></Route>
					<Route exact path="/signin" component={SigninPage}></Route>
					<Route exact path="/signup" component={SignUpPage}></Route>
					<Route exact path="/dashboard" component={DashBoardPage}></Route>
					<Route
						exact
						path="/searchresults"
						component={SearchResultsPage}
					></Route>
					<Route
						exact
						path="/travellerinfo"
						component={TravellerInfoPage}
					></Route>
					<Route exact path="/reservations" component={reservations}></Route>
					<Route
						exact
						path="/employee/dashboard"
						component={EmployeeDashboardPage}
					></Route>
					<Route
						exact
						path="/employee/addFlight"
						component={FlightAddition}
					></Route>
					<Route exact path="/seatselect" component={SeatSelect}></Route>
					<Route exact path="/confirmation" component={ConfirmationPage}></Route>
					
				</Switch>
			</Router>
		</div>
	);
}
export default App;
