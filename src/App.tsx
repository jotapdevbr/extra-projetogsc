import * as React from "react";
import { Route, Switch } from "wouter";
import AppHome from "./routes/root";

const App: React.FC = () => (
  <Switch>
    <Route path="/" component={AppHome} />
  </Switch>
);

export default App;
