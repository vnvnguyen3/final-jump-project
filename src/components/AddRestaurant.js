import React, {useState, Component} from 'react';
import {Form, FormGroup, Input, Label, Button } from 'reactstrap';

function AddRestaurantForm(props) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");

    const handleAddRestaurant = (event) => {
        event.preventDefault();
        const restaurantExists = props.list.filter(restaurant => restaurant.name === name)[0];
        if(name === "" || address === "" || description === "") {
            alert("You cannot leave any field blank");
        } else if(typeof restaurantExists !== 'undefined') {
            alert("Restaurant already exists");
        } else {
            fetch(`http://localhost:5000/add/restaurant`,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: props.list.length + 1,
                    address: address,
                    description: description,
                    name: name
                })
            });
            alert("You have added a new restaurant. Please go to the restaurant list.");
        }
    }

    const onChangeName = (event) => {
        setName(event.target.value);
    }

    const onChangeAddress = (event) => {
        setAddress(event.target.value);
    }

    const onChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    return (
        <div>
            <h1>Add a restaurant</h1>
            <Form onSubmit={handleAddRestaurant}>
                <FormGroup className="formgroup">
                    <Label htmlFor="name">Name </Label>
                    <Input type="text" id="name" name="name" 
                        value={name} onChange={onChangeName} />
                </FormGroup>
                <FormGroup className="formgroup">
                    <Label htmlFor="address">Address </Label>
                    <Input type="text" id="address" name="address" 
                        value={address} onChange={onChangeAddress} />
                </FormGroup>
                <FormGroup className="formgroup">
                    <Label htmlFor="description">Description </Label>
                    <Input type="text" id="description" name="description" 
                        value={description} onChange={onChangeDescription} />
                </FormGroup>
                <Button type="submit" value="submit" className="button">Add Restaurant</Button>
            </Form>
        </div>
    )
}

class AddRestaurant extends Component{
    constructor(props){
        super();
        this.state = {
            isLoaded: false,
            restaurantList: [],
            error: null,
        }
    }
    
    async componentDidMount(){
        try{
            const res = await fetch("http://localhost:5000/restaurants");
            if(!res.ok){
                throw Error(res.statusText);
            }
            const json = await res.json();
            this.setState({
                isLoaded: true,
                restaurantList: json
            })
        } catch(err){
            console.log(err);
            this.setState({
                error: err
            })
        }
    }

    render(){
        const {isLoaded, restaurantList, error} = this.state;
        if(error){
            return <div>Error: {error.message}</div>
        }
        else if(!isLoaded){
            return <div>Loading.....</div>
        }else{
            return(
                <div>
                    <AddRestaurantForm list={restaurantList} />
                </div>
            )
        }
    }
}

export default AddRestaurant;
