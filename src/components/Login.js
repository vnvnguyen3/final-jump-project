import React, { Component, useState } from 'react';
import {Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { Route } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    return (
        <div>
            <h1>Please Log In</h1>
            <Form action={`/user/${username}`}>
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

class Login extends Component {
    render(){
        return(
            <div>
                <Route path='/login' component={LoginForm} />
            </div>
        )
    }
}

export default Login;