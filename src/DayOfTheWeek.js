import React, { Component } from 'react'
import MealCard from "./MealCard"
import APIManager from "./APIManager"
import Moment from "moment"
import WeekPlan from "./WeekPlan"
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class DayOfTheWeek extends Component {
    state = {
        meals: [],
        // mealsToEdit: {}
    }

    // "fetching" the state from the database 
    componentDidMount() {
        APIManager.gettingAllMealsFromDatabase()
            .then(meals => {
                // console.log("meals", meals)
                this.setState({ meals: meals })
            }
            )
    }

    reloadPage = () => {
        window.location.reload(true);
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
        APIManager.getUserNameByUserId(userId)
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
            userId: APIManager.getIdOfCurrentUser()
        }
        console.log(event.target.childNodes)
        // const childNodeArray = event.target.childNodes
        APIManager.addMeal(newObject)
            .then(DayOfTheWeek => {
                APIManager.gettingAllMealsFromDatabase()
                    .then(meals => {
                        this.setState({ meals: meals })
                    })
            })
            this.refs.nameOfMeal.value = ""
            this.refs.dateOfMeal.value = ""
            this.refs.urlOfMeal.value = ""
            this.reloadPage()
    }



    // deleteMeal = (mealId) => {
    //     APIManager.deleteMeal(mealId)
    //         .then(deletedMeal => this.setState({ meals: deletedMeal }))
    // }

    render() {
        return (
            <React.Fragment>
                <Form className="grid-item" id="mealForm" onSubmit={this.addMeal.bind(this)}>
                    <h1 id="day-title" className="h3 mb-3 font-weight-normal">Weekly Meal Planner</h1>

                    <Label htmlFor="nameOfMeal">
                        New Meal:
                </Label>
                    <Input onChange={this.messageFormInput} type="text"
                        id="nameOfMeal"
                        ref="nameOfMeal"
                        placeholder="Enter Meal"
                        required="" autoFocus="" />

                    <Label htmlFor="date">
                        Date:
                </Label>
                    <Input id="datepicker" onChange={this.messageFormInput} type="date"
                        id="date"
                        placeholder="Enter Date"
                        ref="dateOfMeal"
                        required="" autoFocus="" />

                    <Label htmlFor="url">
                        Recipe URL:
                </Label>
                    <Input onChange={this.messageFormInput} type="text"
                        id="url"
                        placeholder="Optional"
                        ref="urlOfMeal"
                        required="" autoFocus="" />

                    <Button type="submit">
                        Submit
                </Button>
                </Form>

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
                <WeekPlan className="grid-container" />
            </React.Fragment>
        )
    }
}