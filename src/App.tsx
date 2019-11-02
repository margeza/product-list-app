import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ProductDetails from './pages/product-details/product-details.component'


function App () {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/details/:productId' component={ProductDetails} />
      </Switch>
    </Router>
  );
}

export default App;
