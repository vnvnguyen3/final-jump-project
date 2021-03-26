import React, {useState, useEffect} from 'react';
import {Form, FormGroup, Input, Label, Button } from 'reactstrap';

function UpdateRestaurant(props) {

    const [restaurant, setRestaurant] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/update/restaurant/${props.restaurant.id}`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: address,
                description: description,
                name: restaurant
            })
        })
    });

    const onChangeRestaurant = (event) => {
        setRestaurant(event.target.value);
    }

    const onChangeAddress = (event) => {
        setAddress(event.target.value);
    }

    const onChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    return (
        <Form>
            <FormGroup className="formgroup">
                <Label htmlFor="restaurant">Restaurant name </Label>
                <Input type="text" id="restaurant" name="restaurant" 
                    value={restaurant} onChange={onChangeRestaurant} />
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
            <Button type="submit" value="submit" className="button">Update Restaurant</Button>
        </Form>
    )
}

export default UpdateRestaurant;
