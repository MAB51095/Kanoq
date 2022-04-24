import React from "react";
import { Route, Switch } from "react-router-dom";
import Clients from "./pages/Clients";

import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/Clients" component={Clients} />

        <Route
          render={function () {
            return <NotFound />;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
