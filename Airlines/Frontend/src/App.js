import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import SigninPage from "./pages/signin";
import SignUpPage from "./pages/signup";
function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/signin" component={SigninPage}></Route>
					<Route exact path="/signup" component={SignUpPage}></Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
