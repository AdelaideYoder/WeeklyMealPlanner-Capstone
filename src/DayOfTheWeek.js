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

    deleteMeal = (mealId) => {
        Database.deleteMeal(mealId) 
            .then(deletedMeal => this.setState({ meals: deletedMeal }))
    }

    handleEdit = (event) => {
        event.preventDefault()
        fetch(`http://localhost:5002/meals/${this.state.mealToEdit.id}`, {
            method: "PUT",
            body: JSON.stringify(this.state.mealToEdit),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => { return fetch("http://localhost:5002/meals?_expand=user") })
            .then(a => a.json())
            .then(DayOfTheWeek => {
                this.setState({
                    meals: DayOfTheWeek
                })
            })
    }

    editMeal = (mealId) => {
        console.log("mealId", mealId)
        // Delete the specified meal from the API
        fetch(`http://localhost:5002/meals/${mealId}`)

            // Once the new array of meals is retrieved, set the state
            .then(a => a.json())
            .then(DayOfTheWeek => {
                this.setState({
                    mealToEdit: DayOfTheWeek
                })
            })
    }

    handleFieldChange = (event) => {
        const stateToChange = this.state.mealToEdit
        stateToChange[event.target.id] = event.target.value
        this.setState({ mealToEdit: stateToChange })
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
                            editMeal={this.editMeal} 
                            deleteMeal={this.deleteMeal}
                            meal={meal} />
                    )
                }
            </div>
        )
    }
}