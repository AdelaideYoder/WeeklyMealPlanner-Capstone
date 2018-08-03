import React, {Component} from 'react'
import MealBox from "./MealBox"

export default class WeekPlan extends Component {
    // console.log(props, "props")

    render() {
        return (
            <React.Fragment>
                <div className="monCol">
                <MealBox className="monday" dayToShow="Monday" />
                </div>
                <div className="tueCol">
                <MealBox className="tuesday" dayToShow="Tuesday" />
                </div>
                <div className="wedCol">
                <MealBox className="wednesday" dayToShow="Wednesday" />
                </div>
                <div className="thursCol">
                <MealBox className="thursday" dayToShow="Thursday" />
                </div>
                <div className="friCol">
                <MealBox className="friday" dayToShow="Friday" />
                </div>

            </React.Fragment>
        )
    }

}
