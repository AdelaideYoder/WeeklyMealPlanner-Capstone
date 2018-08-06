import React, {Component} from 'react'
import MealBox from "./MealBox"

export default class WeekPlan extends Component {
    // console.log(props, "props")

    render() {
        return (
            <React.Fragment>
                <div className="monCol grid-item">
                <MealBox className="monday" dayToShow="Monday" />
                </div>
                <div className="tueCol grid-item">
                <MealBox className="tuesday" dayToShow="Tuesday" />
                </div>
                <div className="wedCol grid-item">
                <MealBox className="wednesday" dayToShow="Wednesday" />
                </div>
                <div className="thursCol grid-item">
                <MealBox className="thursday" dayToShow="Thursday" />
                </div>
                <div className="friCol grid-item">
                <MealBox className="friday" dayToShow="Friday" />
                </div>

            </React.Fragment>
        )
    }

}
