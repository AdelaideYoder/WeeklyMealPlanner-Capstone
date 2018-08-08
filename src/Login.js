import APIManager from "./APIManager"
import React, { Component } from "react"
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default class Login extends Component {
    state = {
        email: " ",
        userName: " ",
        password: " "
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)

    }

    handleRegister = (e) => {
        e.preventDefault()
        const newUser = {
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password,
        }
        APIManager.addUser(newUser)
            .then((response) => {
                const userName = response.userName
                APIManager.getUserByUserName(userName)
                    .then((taco) => {
                        // console.log(taco[0].id)
                        localStorage.setItem(
                            "credentials",
                            JSON.stringify({
                                userName: this.state.userName,
                                email: this.state.email,
                                password: this.state.password,
                                currentUserId: taco[0].id

                            })

                        )
                    })
            })

    }


    // Simplistic handler for login submit
    handleLogin = (e) => {
        e.preventDefault()
        APIManager.getUserByUserName(this.state.userName)
            .then((taco) => {
                // console.log(taco[0].id)
                localStorage.setItem(
                    "credentials",
                    JSON.stringify({
                        userName: this.state.userName,
                        email: this.state.email,
                        password: this.state.password,
                        currentUserId: taco[0].id

                    })

                )
            })

    }

    render() {
        return (
            <React.Fragment>
                <div className="login">
                    <Form onSubmit={this.handleLogin}>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <label htmlFor="inputUserName">
                            UserName:
                </label>
                        <input onChange={this.handleFieldChange} type="text"
                            id="userName"
                            placeholder="Enter UserName"
                            required="" />
                        <label htmlFor="inputEmail">
                            Email address:
                </label>
                        <input onChange={this.handleFieldChange} type="email"
                            id="email"
                            placeholder="Email address"
                            required="" autoFocus="" />
                        <label htmlFor="inputPassword">
                            Password:
                </label>
                        <input onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="Password"
                            required="" />
                        <button type="submit" onClick={() => window.location.reload()
                        }>
                            Sign In
                </button>
                        <br></br>
                        <input type="checkbox" name="checkbox" /> <label>REMEMBER ME</label>
                    </Form>
                </div>

                <div className="login">
                    <Form onSubmit={this.handleRegister}>
                        <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
                        <label htmlFor="inputUserName">
                            UserName:
    </label>
                        <input onChange={this.handleFieldChange} type="text"
                            id="userName"
                            placeholder="Enter UserName"
                            required="" />
                        <label htmlFor="inputEmail">
                            Email address:
    </label>
                        <input onChange={this.handleFieldChange} type="email"
                            id="email"
                            placeholder="Email address"
                            required="" autoFocus="" />
                        <label htmlFor="inputPassword">
                            Password:
    </label>
                        <input onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="Password"
                            required="" />
                        <button type="submit" onClick={() => window.location.reload()
                        }>
                            Register
    </button>
                        <br></br>
                    </Form>
                </div>
            </React.Fragment >
        )
    }
}