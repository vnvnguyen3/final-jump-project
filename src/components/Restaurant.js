import React, {Component} from 'react';
import Review from './Review';
import UpdateRestaurant from './UpdateRestaurant';
import CreateReview from './CreateReview';
import { Button } from 'reactstrap';

class Restaurant extends Component {
    constructor(){
        super();
        this.state = {
            loggedIn:true,
            admin:true,
            leaveReview:false,
            updateRestaurant:false
        }
        this.leaveReview = this.leaveReview.bind(this);
    }
    
    leaveReview(){
        this.setState({leaveReview : !this.state.leaveReview})
    }

    updateRestaurant(){
        this.setState({updateRestaurant : !this.state.updateRestaurant})
    }

    render(){
        const reviewList = [
            {
                id: "1",
                score: "1",
                comment: "this place sucks",
                username: "jonnymally"
            },{
                id: "2",
                score: "2",
                comment: "overrated as hell",
                username: "R-yay"
            }
        ];
        const reviews = reviewList.map((review) => 
            <Review score={review.score} comment={review.comment} username={review.username} />
        );
        return (
            <div>
                <h1>{this.props.title} 
                {this.state.admin ? <Button type="submit" value="submit" className="button" onClick={() => this.updateRestaurant()}>Update</Button>: ""}                
                </h1>
                {this.state.updateRestaurant ? <UpdateRestaurant />
                :<div>
                    <p>{this.props.location}</p>
                    <p>{this.props.description}</p>
                </div>}   
                <h2>Reviews</h2>
                {reviews}
                {this.state.loggedIn ? 
                    <Button type="submit" value="submit" className="button" onClick={() => this.leaveReview()}>Leave a review</Button>
                    : "You must be logged in to leave a review"
                }
                {this.state.leaveReview && 
                    <CreateReview />}
            </div>
        )
    }
}

export default Restaurant;
