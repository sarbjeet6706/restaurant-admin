import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Reservation from "./pages/Reservation";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Main>
          <PrivateRoute exact path="/dashboard" component={Home} />
          <PrivateRoute exact path="/orders" component={Orders} />
          <PrivateRoute exact path="/reservation" component={Reservation} />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
