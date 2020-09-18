import React from "react";
import "./styles.css";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundry";
import Forms from "./Pages/Form";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <ErrorBoundary>
            <Home />
          </ErrorBoundary>
        </Route>
        <Route exact path="/form">
          <ErrorBoundary>
            <Forms />
          </ErrorBoundary>
        </Route>
        <Route exact path="/profile">
          <ErrorBoundary>
            <Profile />
          </ErrorBoundary>
        </Route>
      </Switch>
    </div>
  );
}
