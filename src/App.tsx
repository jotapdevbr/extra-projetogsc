import * as React from "react";
import { Route, Switch } from "wouter";
import AppHome from "./routes/root";
import AppLink from "./routes/links";
import AddLink from "./routes/linksAdd";
import AppDownload from "./routes/downloads";
import AddDownload from "./routes/downloadsAdd";
import AppManual from "./routes/manuais";
import AddManual from "./routes/manuaisAdd";

const App: React.FC = () => (
  <Switch>
    <Route path="/" component={AppHome} />
    <Route path="/links" component={AppLink} />
    <Route path="/links/adicionar" component={AddLink} />
    <Route path="/downloads" component={AppDownload} />
    <Route path="/downloads/adicionar" component={AddDownload} />
    <Route path="/manuais" component={AppManual} />
    <Route path="/manuais/adicionar" component={AddManual} />
  </Switch>
);

export default App;
