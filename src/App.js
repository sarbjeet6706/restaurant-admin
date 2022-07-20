import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Reservation from "./pages/Reservation";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <ToastContainer hideProgressBar={true} />
      <Switch>
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/dashboard" component={Home} auth={true} />
          <Route exact path="/orders" component={Orders} auth={true} />
          <Route
            exact
            path="/reservation"
            component={Reservation}
            auth={true}
          />
          {/* <Route
            exact
            path="/profile"
            component={Profile}
            auth={false}
          /> */}
          <Route from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
