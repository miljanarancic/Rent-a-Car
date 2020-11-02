import React from 'react'
import { BrowserRouter, Switch, Route, } from "react-router-dom";
import Header from './components/Header/Header'
import RentACar from './pages/RentACar/RentACar'
import Vehicles from './pages/Vehicles/Vehicles'
import Customers from './pages/Customers/Customers'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact>
            <RentACar />
          </Route>
          <Route path="/vehicles">
            <Vehicles />
          </Route>
          <Route path="/customers">
            <Customers />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
