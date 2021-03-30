import React, {useState, useEffect} from 'react';
import {Form, FormGroup, Input, Label, Button } from 'reactstrap';

function UpdateRestaurant(props) {

    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/update/restaurant/${props.restaurant.id}`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: props.restaurant.id,
                address: address,
                description: description,
                name: props.restaurant.name
            })
        })
    });

    const onChangeAddress = (event) => {
        setAddress(event.target.value);
    }

    const onChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    return (
        <Form>
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
