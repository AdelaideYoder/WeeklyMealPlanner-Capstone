import React, { Component } from 'react'
import APIManager from "./APIManager"
import Moment from "moment"
import { Card, CardBody, Button, CardTitle, CardText, Form, Input  } from 'reactstrap';

export default class MealCard extends Component  {
    state = {

        viewForm: false,
        mealToEdit: {...this.props.meal}

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
        // event.preventDefault()
        APIManager.handleEdit(this.state.mealToEdit)
            //refresh just the card
            // APIManager.getOneMealCard(event)
            .then(MealCard => {
                this.setState({mealToEdit: MealCard, viewForm: false})
                this.props.getMeals()
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
        <Card>
            <CardBody>
                <CardTitle className="card-title">
                    {this.props.meal.nameOfMeal}
                </CardTitle>
                <CardText>
                <p>
                {Moment(this.props.meal.date).format("dddd")}
                </p>
                <p>
                {Moment(this.props.meal.date).format(" M/D/YY")}
                </p>
                <p>
                    {this.props.meal.url}
                </p>
                <Button href="#" onClick={() => this.editMeal(this.props.meal.id)}>Edit</Button>
                <Button href="#" onClick={() => this.props.deleteMeal(this.props.meal.id)}>Delete</Button>
                </CardText>
            </CardBody>
            </Card>
            )
            } else {
                return (
                    <Form id="editForm" onSubmit={this.handleEdit}>
                        {/* <h1 className="h3 mb-3 font-weight-normal">Edit Meal</h1> */}
                        {/* <label htmlFor="nameOfMeal">
                            New Meal:
                        </label> */}
                        <Input onChange={this.handleFieldChange} type="text"
                            id="nameOfMeal"
                            placeholder="Enter Meal"
                            value={this.state.mealToEdit.nameOfMeal}
                            required="" autoFocus="" />

                        {/* <label htmlFor="date">
                            Date:
                        </label> */}
                        <Input id="datepicker" onChange={this.handleFieldChange} type="date"
                            id="date"
                            placeholder="Enter Date"
                            value={this.state.mealToEdit.date}
                            required="" autoFocus="" />

                        {/* <label htmlFor="url">
                            Recipe URL:
                        </label> */}
                        <Input onChange={this.handleFieldChange} type="text"
                            id="url"
                            placeholder="Optional"
                            value={this.state.mealToEdit.url}
                            required="" autoFocus="" />
                        <Button type="submit">
                            Update
                        </Button>
                    </Form>
                )
            }
        // </React.Fragment>
}
}
