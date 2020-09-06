import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';

import Login from "./components/Login"
import Header from "./components/Header"

function App() {
  return (
    <Router>
      
      <div>
        <Header />
        <br />
      <Route path="/" exact component={Login} />
      </div>
    </Router>
  );
}

export default App;