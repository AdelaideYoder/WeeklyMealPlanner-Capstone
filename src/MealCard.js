import React from "react"
// import { Card, Button, CardTitle, CardText } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default props => {
    // console.log(props, "props")
    return (
        <React.Fragment>
        <div>
        <div className="card-body">
                        <h5 className="card-title">
                            {props.meal.nameOfMeal}
                        </h5>
                        <p>
                            {props.meal.date}
                        </p>
                        <p>
                            {props.meal.url}
                        </p>
                    </div>
                {/* <a href="#" onClick={() => props.EditChat(props.message.id)}>Edit</a> */}
        </div>
        </React.Fragment>
    )
}
