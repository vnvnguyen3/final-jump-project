import React, {useState} from 'react';
import {Form, FormGroup, Input, Label, Button } from 'reactstrap';

function UpdateRestaurant() {

    const [restaurant, setRestaurant] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");

    const handleUpdate = (event) => {
        alert(restaurant + " \n" + address + " \n" + description);
        setRestaurant("");
        setAddress("");
        setDescription("");
        event.preventDefault();
    }

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
        <Form onSubmit={handleUpdate}>
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
