import React, { Component } from 'react'
import MealCard from "./MealCard"
import Database from "./APIManager"


export default class DayOfTheWeek extends Component {
    state = {
        meals: [],
        mealsToEdit: {}
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
        // let timestamp = Moment().format("YYYY-MM-DD hh:mm:ss a");
        const newObject = {
            nameOfMeal: this.state.nameOfMeal,
            date: this.state.date,
            url: this.state.url,
            // creationDateTime: timestamp,
            userId: Database.getIdOfCurrentUser()
        }
        Database.addMeal(newObject)
            .then(DayOfTheWeek => {
                Database.gettingAllMealsFromDatabase()
                    .then(meals => {
                        this.setState({ meals: meals })
                    }
                    )
            })
    }


    render() {
        return (
            <div>
                <form id="mealForm" onSubmit={this.addMeal.bind(this)}>
                    <h1 id="day-title" className="h3 mb-3 font-weight-normal">Monday</h1>

                    <label htmlFor="nameOfMeal">
                        New Meal:
                </label>
                    <input onChange={this.messageFormInput} type="text"
                        id="nameOfMeal"
                        placeholder="Enter Meal"
                        required="" autoFocus="" />

                    <label htmlFor="date">
                        Date:
                </label>
                    <input id="datepicker" onChange={this.messageFormInput} type="date"
                        id="date"
                        placeholder="Enter Date"
                        required="" autoFocus="" />

                    <label htmlFor="url">
                        Recipe URL:
                </label>
                    <input onChange={this.messageFormInput} type="text"
                        id="url"
                        placeholder="Optional"
                        required="" autoFocus="" />

                    <button type="submit">
                        Submit
                </button>
                </form>

                {
                    this.state.meals.map(meal =>
                        // console.log("meal in render", meal.id)
                        <MealCard key={meal.id}
                        {...this.props} 
                            // EditChat={this.EditChat} 
                            meal={meal} />
                    )
                }
            </div>
        )
    }
}