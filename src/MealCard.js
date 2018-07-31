import React, { Component } from 'react'
import Database from "./APIManager"
// import { Card, Button, CardTitle, CardText } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class MealCard extends Component  {
    state = {
        viewForm: false
    }

    editMeal = (mealId) => {
        // console.log("mealId", mealId)
        fetch(`http://localhost:5002/meals/${mealId}`)
            // Once the new array of meals is retrieved, set the state
            .then(a => a.json())
            .then(meals => {
                this.setState({mealToEdit: meals, viewForm: true})
            })
    }

    handleEdit = (event) => {
        event.preventDefault()
        fetch(`http://localhost:5002/meals/${this.state.mealToEdit.id}`, {
            method: "PUT",
            body: JSON.stringify(this.state.mealToEdit),
            headers: {"Content-Type": "application/json"}
        }).then(() => { return fetch("http://localhost:5002/meals?_expand=user") })
            .then(a => a.json())
            .then(MealCard => {
                this.setState({mealToEdit: MealCard, viewForm: false})
            })
    }

    handleFieldChange = (event) => {
        const stateToChange = this.state.mealToEdit
        stateToChange[event.target.id] = event.target.value
        this.setState({ mealToEdit: stateToChange })
    }
    // console.log(this.props, "this.props")
    render() {
        if(!this.state.viewForm) {
    return (
        // <React.Fragment>
            <div className="card-body">
                <h5 className="card-title">
                    {this.props.meal.nameOfMeal}
                </h5>
                <p>
                    {this.props.meal.date}
                </p>
                <p>
                    {this.props.meal.url}
                </p>
                <a href="#" onClick={() => this.editMeal(this.props.meal.id)}>Edit</a>
                <a href="#" onClick={() => this.props.deleteMeal(this.props.meal.id)}>Delete</a>
            </div>
            )
            } else {
                return (
                    <form id="editForm" onSubmit={this.handleEdit}>
                        {/* <h1 className="h3 mb-3 font-weight-normal">Edit Meal</h1> */}
                        {/* <label htmlFor="nameOfMeal">
                            New Meal:
                        </label> */}
                        <input onChange={this.handleFieldChange} type="text"
                            id="nameOfMeal"
                            placeholder="Enter Meal"
                            value={this.state.mealToEdit.nameOfMeal}
                            required="" autoFocus="" />

                        {/* <label htmlFor="date">
                            Date:
                        </label> */}
                        <input id="datepicker" onChange={this.handleFieldChange} type="date"
                            id="date"
                            placeholder="Enter Date"
                            value={this.state.mealToEdit.date}
                            required="" autoFocus="" />

                        {/* <label htmlFor="url">
                            Recipe URL:
                        </label> */}
                        <input onChange={this.handleFieldChange} type="text"
                            id="url"
                            placeholder="Optional"
                            value={this.state.mealToEdit.url}
                            required="" autoFocus="" />
                        <button type="submit">
                            Update
                        </button>
                    </form>
                )
            }
        // </React.Fragment>
}
}
