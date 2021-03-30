import React, { Component, useState, useEffect } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

function EditReview(props){

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/update/rating/${props.review.id}`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: props.review.id,
                rating: rating,
                comment: comment,
                ratingUser: { id: props.review.ratingUser.id },
                ratingRestaurant: { id: props.review.ratingRestaurant.id }
            })
        })
    });

    const onChangeComment = (event) => {
        setComment(event.target.value);
    }

    const onChangeRating = (event) => {
        setRating(event.target.value);
    }

    return(
        <Form>
            <h3>Edit your review</h3>
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

class Review extends Component {
    constructor(){
        super();
        this.state={
            editReview: false
        }
    }

    editReview(){
        this.setState({editReview : !this.state.editReview})
    }

    render(){
        return (
            <div className="review">
                <p>{this.props.review.rating}/5 {this.props.review.comment}</p>
                <p>
                    -{this.props.review.ratingUser.userName} 
                    {this.props.review.ratingUser.userName === this.props.user.userName ? 
                    <Button type="submit" value="submit" className="button" 
                    onClick={() => this.editReview()}
                    >Edit</Button>: ""}
                    {this.state.editReview ? <EditReview review={this.props.review} /> : ""}
                </p>
                <br/>
            </div>
        )
    }
}

export default Review;
