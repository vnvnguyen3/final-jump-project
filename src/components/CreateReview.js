import React, { useState } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

function CreateReview(props) {
    
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");
    
    const handleReview = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/add/rating',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: props.id,
                rating: rating,
                comment: comment,
                ratingUser: {id: props.user.id},
                ratingRestaurant: {id: props.restaurant.id}
            })
        });
        alert("Review Submitted");
    }

    const onChangeComment = (event) => {
        setComment(event.target.value);
    }

    const onChangeRating = (event) => {
        setRating(event.target.value);
    }

    return (
        <Form onSubmit={handleReview}>
            <h3>Leave a review</h3>
            <p>Click submit ONLY ONCE, then refresh or exit page and go back to see submitted review</p>
            <FormGroup className="formgroup">
                <Label for="comment">Comment </Label>
                <Input type="text" id="comment" name="comment" size="60"
                    value={comment} onChange={onChangeComment} />
            </FormGroup>
            <FormGroup className="formgroup">
                <Label for="rating">Rating </Label>
                <Input type="number" id="rating" name="rating" min="1" max="5" placeholder="1"
                    value={rating} onChange={onChangeRating} />
            </FormGroup>
            <Button type="submit" value="submit" className="button">Submit Review</Button>
        </Form>
    )
}

export default CreateReview;
