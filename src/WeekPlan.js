import React from 'react'
import MealBox from "./MealBox"

export default props => {
    // console.log(props, "props")
    

    return (
        <div>
        <MealBox className="grid-item" id="Mon" dayToShow="Monday" />
        <MealBox className="grid-item" id="Tue" dayToShow="Tuesday" />
        <MealBox className="grid-item" id="Wed" dayToShow="Wednesday" />
        <MealBox className="grid-item" id="Thurs" dayToShow="Thursday" />
        <MealBox className="grid-item" id="Fri" dayToShow="Friday" />

        </div>
    )
}
