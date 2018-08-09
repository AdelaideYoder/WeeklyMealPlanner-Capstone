import APIManager from "./APIManager"
import React, { Component } from "react"
import { Button, Form, Label, Input } from 'reactstrap';


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
                <h1>Welcome</h1>
                <div className="login">
                    <Form onSubmit={this.handleLogin}>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <Label htmlFor="inputUserName">
                            UserName:
                </Label>
                        <Input onChange={this.handleFieldChange} type="text"
                            id="userName"
                            placeholder="Enter UserName"
                            required="" />
                        <Label htmlFor="inputEmail">
                            Email address:
                </Label>
                        <Input onChange={this.handleFieldChange} type="email"
                            id="email"
                            placeholder="Email address"
                            required="" autoFocus="" />
                        <Label htmlFor="inputPassword">
                            Password:
                </Label>
                        <Input onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="Password"
                            required="" />
                        <Button type="submit" onClick={() => window.location.reload()
                        }>
                            Sign In
                </Button>
                        <br></br>
                        <input type="checkbox" name="checkbox" /> <Label>REMEMBER ME</Label>
                    </Form>
                </div>

                <div className="register">
                    <Form onSubmit={this.handleRegister}>
                        <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
                        <Label htmlFor="inputUserName">
                            UserName:
    </Label>
                        <Input onChange={this.handleFieldChange} type="text"
                            id="userName"
                            placeholder="Enter UserName"
                            required="" />
                        <Label htmlFor="inputEmail">
                            Email address:
    </Label>
                        <Input onChange={this.handleFieldChange} type="email"
                            id="email"
                            placeholder="Email address"
                            required="" autoFocus="" />
                        <Label htmlFor="inputPassword">
                            Password:
    </Label>
                        <Input onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="Password"
                            required="" />
                        <Button type="submit" onClick={() => window.location.reload()
                        }>
                            Register
    </Button>
                        <br></br>
                    </Form>
                </div>
            </React.Fragment >
        )
    }
}