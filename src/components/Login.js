import React, { Component, useState } from 'react';
import {Form, FormGroup, Input, Label, Button } from 'reactstrap';
import {Switch, Route, Link } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        alert("Username: " + username + " Password: " + password);
        setUsername("");
        setPassword("");
        event.preventDefault();
    }

    const onChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    return (
        <div>
            <h1>Please Log In</h1>
            <Form action='/login/success'>
                <FormGroup className="formgroup">
                    <Label htmlFor="username">Username </Label>
                    <Input type="text" id="username" name="username" 
                        value={username} onChange={onChangeUsername} />
                </FormGroup>
                <FormGroup className="formgroup">
                    <Label htmlFor="password">Password </Label>
                    <Input type="password" id="password" name="password" 
                        value={password} onChange={onChangePassword} />
                </FormGroup>
                <Button type="submit" value="submit" className="button">Login</Button>
            </Form>
        </div>
    )
}

function LoggedIn() {
    return(
        <div>
            <h1>You are successfully logged in</h1>
        </div>
    )
}

class Login extends Component {
    constructor(props){
        super();
        this.state = {
            isLoaded: false,
            userList: [],
            error: null
        }
    }

    async componentDidMount(){
        try{
            const res = await fetch("http://localhost:8080/users");
            if(!res.ok){
                throw Error(res.statusText);
            }
            const json = await res.json();
            this.setState({
                isLoaded: true,
                userList: json
            })
        } catch(err){
            console.log(err);
            this.setState({
                error: err
            })
        }
    }
    render(){
        const {isLoaded, userList, error} = this.state;
        return(
            <Switch>
                <Route path='/login' component={LoginForm} />
                <Route path='/login/success' component={LoggedIn} />
            </Switch>
        )
    }
}

export default Login;