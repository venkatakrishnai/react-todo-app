import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import List from "./items/list";
import Form from "./items/form";

function App() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <Router>
        <Switch>
          <Route path="/" exact>
            <List />
          </Route>
          <Route path="/item/:item">
            <Form />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
