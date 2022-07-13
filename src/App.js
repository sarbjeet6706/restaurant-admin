import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Reservation from "./pages/Reservation";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <ProtectedRoute
            exact
            path="/dashboard"
            component={Home}
            auth={true}
          />
          <ProtectedRoute exact path="/orders" component={Orders} auth={true} />
          <ProtectedRoute
            exact
            path="/reservation"
            component={Reservation}
            auth={true}
          />
          <ProtectedRoute
            exact
            path="/profile"
            component={Profile}
            auth={true}
          />
          <Route from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
