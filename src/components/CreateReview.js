import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

function CreateReview(props) {
    
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");

    useEffect(() => {
        fetch('http://localhost:8080/add/rating',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rating: rating,
                comment: comment,
                ratingUser: props.user,
                ratingRestaurant: props.restaurant
            })
        })
    });

    const onChangeComment = (event) => {
        setComment(event.target.value);
    }

    const onChangeRating = (event) => {
        setRating(event.target.value);
    }

    return (
        <Form>
            <h3>Leave a review</h3>
            <FormGroup className="formgroup">
                <Label for="comment">Comment </Label>
                <Input type="text" id="comment" name="comment" size="60"
                    value={comment} onChange={onChangeComment} />
            </FormGroup>
            <FormGroup className="formgroup">
                <Label for="rating">Rating </Label>
                <Input type="number" id="rating" name="rating" min="1" max="5" 
                    value={rating} onChange={onChangeRating} />
            </FormGroup>
            <Button type="submit" value="submit" className="button">Submit Review</Button>
        </Form>
    )
}

export default CreateReview;
