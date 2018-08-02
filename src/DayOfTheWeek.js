import React, { Component } from 'react'
import MealCard from "./MealCard"
import Database from "./APIManager"
import Moment from "moment"
import WeekPlan from "./WeekPlan"

export default class DayOfTheWeek extends Component {
    state = {
        meals: [],
        // mealsToEdit: {}
    }

    // "fetching" the state from the database 
    componentDidMount() {
        Database.gettingAllMealsFromDatabase()
            .then(meals => {
                // console.log("meals", meals)
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
        console.log("event.target", event.target)
        // let timestamp = Moment().format("YYYY-MM-DD hh:mm:ss a");
        const newObject = {
            nameOfMeal: this.state.nameOfMeal,
            date: this.state.date,
            url: this.state.url,
            dayOfTheWeek:   Moment(this.state.date).format("dddd"),
            // creationDateTime: timestamp,
            userId: Database.getIdOfCurrentUser()
        }
        console.log(event.target.childNodes)
        // const childNodeArray = event.target.childNodes
        Database.addMeal(newObject)
            .then(DayOfTheWeek => {
                Database.gettingAllMealsFromDatabase()
                    .then(meals => {
                        this.setState({ meals: meals })
                    })
            })
            this.refs.nameOfMeal.value = ""
            this.refs.dateOfMeal.value = ""
            this.refs.urlOfMeal.value = ""
    }

    deleteMeal = (mealId) => {
        Database.deleteMeal(mealId)
            .then(deletedMeal => this.setState({ meals: deletedMeal }))
    }




    render() {
        return (
            <div>
                <form className="grid-item" id="mealForm" onSubmit={this.addMeal.bind(this)}>
                    <h1 id="day-title" className="h3 mb-3 font-weight-normal">WMP</h1>

                    <label htmlFor="nameOfMeal">
                        New Meal:
                </label>
                    <input onChange={this.messageFormInput} type="text"
                        id="nameOfMeal"
                        ref="nameOfMeal"
                        placeholder="Enter Meal"
                        required="" autoFocus="" />

                    <label htmlFor="date">
                        Date:
                </label>
                    <input id="datepicker" onChange={this.messageFormInput} type="date"
                        id="date"
                        placeholder="Enter Date"
                        ref="dateOfMeal"
                        required="" autoFocus="" />

                    <label htmlFor="url">
                        Recipe URL:
                </label>
                    <input onChange={this.messageFormInput} type="text"
                        id="url"
                        placeholder="Optional"
                        ref="urlOfMeal"
                        required="" autoFocus="" />

                    <button type="submit">
                        Submit
                </button>
                </form>

                {/* {
                    this.state.meals.map(meal =>
                        // console.log("meal in render", meal.id)
                        <MealCard key={meal.id}
                            {...this.props}
                            // editMeal={this.editMeal} 
                            deleteMeal={this.deleteMeal}
                            meal={meal} />
                    )
                } */}
                <WeekPlan />
            </div>
        )
    }
}