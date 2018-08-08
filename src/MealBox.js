import React, { Component } from 'react'
import APIManager from "./APIManager"
import MealCard from "./MealCard"

export default class MealBox extends Component {

    state = {
        mealsToShow: []
    }

    getMeals = () => {
        const currentUser = APIManager.getIdOfCurrentUser()
    APIManager.getMealByDay(currentUser, this.props.dayToShow)
            .then(response => {
                this.setState({ mealsToShow: response })
            })
        }

    componentDidMount() {
        return this.getMeals()
        // APIManager.getMealByDay(this.props.dayToShow)
        //     .then(response => {
        //         this.setState({ mealsToShow: response })
        //     })
    }

    deleteMeal = (mealId) => {
        // APIManager.deleteMeal(mealId)
        //     .then(deletedMeal => this.setState({ mealsToShow: deletedMeal }))
        APIManager.deleteMeal(mealId)
        .then(() => {
            this.getMeals()
        })

    }


    render() {

        return (
            <React.Fragment>
                <h2>{this.props.dayToShow}</h2>
                {this.state.mealsToShow.map(meal =>
                    // console.log("meal in render", meal.id)
                    <MealCard key={meal.id}
                        // {...this.props}
                        getMeals={this.getMeals}
                        // editMeal={this.editMeal} 
                        deleteMeal={this.deleteMeal}
                        meal={meal} />
                )
                }
            </React.Fragment>
        )

    }
}