import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Editor from "./Editor";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/editor">
        <Editor />
      </Route>
    </Router>
  );
}

export default App;
