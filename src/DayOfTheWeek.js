import React, { Component } from 'react'
import MealCard from "./MealCard"
import Database from "./APIManager"


export default class DayOfTheWeek extends Component {
    state = {
        meals: [],
        mealsToEdit: {}
    }

    //"fetching" the state from the database 
    componentDidMount() {
        Database.gettingAllMealsFromDatabase()
            .then(meals => {
                this.setState({ meals: meals })
            }
            )
    }

    //checking to see if the state has changed
    messageFormInput = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        // console.log("stateToChange", stateToChange)
        this.setState(stateToChange)
        // console.log("this.state", this.state)
    }
    getUserNameByUserId = (userId) => {
        Database.getUserNameByUserId(userId)
            .then(userName => this.setState({ meals: userName }))
    }
    addMeal = (event) => {
        event.preventDefault()
        // let timestamp = Moment().format("YYYY-MM-DD hh:mm:ss a");
        const newObject = {
            message: this.state.MealCard,
            // creationDateTime: timestamp,
            userId: Database.getIdOfCurrentUser()
        }
        Database.addMeal(newObject)
            .then(DayOfTheWeek => {
                this.setState({ meals: DayOfTheWeek })
            })
    }


    render() {
        return (
            <form id="mealForm" onSubmit={this.addMeal}>
                <h1 id="day-title" className="h3 mb-3 font-weight-normal">Monday</h1>
                
                <label id="mealNameInput" htmlFor="MealName">
                    New Meal:
                </label>
                <input onChange={this.messageFormInput} type="text"
                    id="MealName"
                    placeholder="Enter Meal"
                    required="" autoFocus="" />
                
                <label htmlFor="MealDate">
                    Date:
                </label>
                <input id="datepicker" onChange={this.messageFormInput} type="text"
                    id="MealDate"
                    placeholder="Enter Date"
                    required="" autoFocus="" />
                
                <label htmlFor="MealRecipeURL">
                    Recipe URL:
                </label>
                <input onChange={this.messageFormInput} type="text"
                    id="MealRecipeURL"
                    placeholder="Optional"
                    required="" autoFocus="" />
                
                <button type="submit">
                    Submit
                </button>
            </form>
        )
    }
}