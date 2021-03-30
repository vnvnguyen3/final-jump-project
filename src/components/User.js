import React, { Component, useState, useEffect } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

function UpdateUser(props){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/update/user/${props.user.id}`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: props.user.id,
                userName: props.user.userName,
                password: props.user.password,
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: props.user.role
            })
        })
    });

    const onChangeFirstName = (event) => {
        setFirstName(event.target.value);
    }

    const onChangeLastName = (event) => {
        setLastName(event.target.value);
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    return(
        <Form>
            <h3>Update your info</h3>
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
            <Button type="submit" value="submit" className="button">Update User</Button>
        </Form>
    )
}

class User extends Component {
    constructor(){
        super();
        this.state={
            updateUser: false
        }
    }

    updateUser(){
        this.setState({updateUser: !this.state.updateUser})
    }

    render(){
        return (
            <div>
                <h1>{this.props.user.userName}</h1>
                <p>Full name: {this.props.user.firstName} {this.props.user.lastName}</p>
                <p>Email: {this.props.user.email}</p>
                <p>Role: {this.props.user.role}</p>
                <Button type="submit" value="submit" className="button" onClick={() => this.updateUser()}>Update Info</Button>
                {this.state.updateUser ? <UpdateUser user={this.props.user} />: ""}
            </div>
        );
    }
}

export default User;
