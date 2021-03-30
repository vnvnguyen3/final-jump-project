import React, { Component, useState } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

function SignUpForm(props) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleSignUp = (event) => {
        event.preventDefault();
        const userExists = props.list.filter(user => user.userName === username)[0];
        if(username === "" || firstName === "" || lastName === "" || email === "" || password === "" || confirm === "") {
            alert("You cannot leave any field blank");
        } else if(typeof userExists !== 'undefined'){
            alert("Username already exists");
        } 
        else if(password !== confirm) {
            alert("Passwords do not match");
        }else{
            fetch('http://localhost:5000/add/user',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: props.list.length+1,
                    userName: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    role: "USER"
                })
            });
            alert("You have successfully created a new account. Please log in to continue.");
        }
    }

    const onChangeFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const onChangeLastName = (event) => {
        setLastName(event.target.value);
    }
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    const onChangeUsername = (event) => {
        setUsername(event.target.value)
    }
    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }
    const onChangeConfirm = (event) => {
        setConfirm(event.target.value)
    }

    return(
        <Form onSubmit={handleSignUp}>
            <h1>Sign up to create a new account</h1>
            <FormGroup className="formgroup">
                <Label for="firstName">First Name </Label>
                <Input type="text" id="firstName" name="firstName" 
                    value={firstName} onChange={onChangeFirstName} />
            </FormGroup>
            <FormGroup className="formgroup">
                <Label for="lastName">Last Name </Label>
                <Input type="text" id="lastName" name="lastName" 
                    value={lastName} onChange={onChangeLastName} />
            </FormGroup>
            <FormGroup className="formgroup">
                <Label for="email">Email </Label>
                <Input type="text" id="email" name="email" 
                    value={email} onChange={onChangeEmail} />
            </FormGroup>
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
            <FormGroup className="formgroup">
                <Label htmlFor="confirm">Confirm Password </Label>
                <Input type="password" id="confirm" name="confirm" 
                    value={confirm} onChange={onChangeConfirm} />
            </FormGroup>
            <Button type="submit" value="submit" className="button">Sign Up</Button>
        </Form>
    )
}

class SignUp extends Component {
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
                    <SignUpForm list={userList} />
                </div>
            )
        }
    }
}

export default SignUp;
