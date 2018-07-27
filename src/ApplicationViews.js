import React, { Component } from "react"
import './App.css';
import "./index.css"
import DayOfTheWeek from "./DayOfTheWeek";



class ApplicationViews extends Component {
  render() {
    return (

    <React.Fragment>
      <DayOfTheWeek />
    </React.Fragment>
    )
  }
}

export default ApplicationViews;