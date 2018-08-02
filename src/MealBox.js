import React, { Component } from 'react'
import APIManager from "./APIManager"
import MealCard from "./MealCard"

export default class MealBox extends Component {

    state = {
        mealsToShow: []
    }

    componentDidMount() {
        APIManager.getMealByDay(this.props.dayToShow)
            .then(response => {
                this.setState({ mealsToShow: response })
            })
    }


    render() {

        return (
            <React.Fragment>
                <h2>{this.props.dayToShow}</h2>
                {this.state.mealsToShow.map(meal =>
                    // console.log("meal in render", meal.id)
                    <MealCard key={meal.id}
                        {...this.props}
                        // editMeal={this.editMeal} 
                        deleteMeal={this.deleteMeal}
                        meal={meal} />
                )
                }
            </React.Fragment>
        )

    }
}