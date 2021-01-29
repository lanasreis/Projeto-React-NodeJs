import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Switch, Route } from "react-router-dom";

class App extends Component{
  render(){
    return (
      <div>
        <nav className="navbar bavbar-expand navbar-dark bg-dark">
          <a href="/tutorials" className="navbar-brand"></a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
            <Route exact path="/add" component={AddTutorial} />
            <Route path="/tutorials/:id" component={Tutorial} />            
          </Switch>
        </div>

      </div>
    )
  }
}

export default App;
