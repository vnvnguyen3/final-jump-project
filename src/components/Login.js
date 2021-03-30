import React, { Component, useState } from 'react';
import {Form, FormGroup, Input, Label, Button } from 'reactstrap';

function LoginForm(props) {
    const list = props.list;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        const user = list.filter(user => user.userName === username && user.password === password)[0];
        if (typeof user !== 'undefined'){
            props.onSelectUser(user);
            alert("You have successfully logged in");
        }
        else{
            alert("Incorrect username and/or password");
        }
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
            <Form onSubmit={handleLogin}>
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
    constructor(props){
        super();
        this.state = {
            isLoaded: false,
            userList: [],
            error: null,
        }
    }
    
    async componentDidMount(){
        try{
            const res = await fetch("http://localhost:5000/users");
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

    updateUser = (user) => {
        this.props.onSelectUser(user);
    }

    render(){
        const {isLoaded, userList, error} = this.state;
        if(error){
            return <div>Error: {error.message}</div>
        }
        else if(!isLoaded){
            return <div>Loading.....</div>
        }else{
            return(
                <div>
                    <LoginForm list={userList} onSelectUser={this.updateUser} />
                </div>
            )
        }
    }
}

export default Login;