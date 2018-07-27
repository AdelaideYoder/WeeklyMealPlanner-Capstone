import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./Login"
import ApplicationViews from "./ApplicationViews"


export default class App extends Component {
    isAuthenticated = () => localStorage.getItem("credentials") !== null

    render() {
        return (

            <React.Fragment>
              {/* <Login /> */}
                <Route exact path="/" render={props => {
                    if (this.isAuthenticated()) {
                        return <ApplicationViews />
                        
                    } else {
                        return <Login {...props}/>
                    }
                }} />
                <Route path="/ApplicationViews" component={ApplicationViews} />
            </React.Fragment>
        )
    }
}