import React, {Component} from 'react';
import Review from './Review';
import UpdateRestaurant from './UpdateRestaurant';
import CreateReview from './CreateReview';
import { Button } from 'reactstrap';

class Restaurant extends Component {
    constructor(){
        super();
        this.state = {
            leaveReview:false,
            updateRestaurant:false,
            isLoaded: false,
            reviewList: [],
            error: null
        }
        this.leaveReview = this.leaveReview.bind(this);
    }
    
    leaveReview(){
        this.setState({leaveReview : !this.state.leaveReview})
    }

    updateRestaurant(){
        this.setState({updateRestaurant : !this.state.updateRestaurant})
    }
    async componentDidMount(){
        try{
            const res = await fetch("http://localhost:8080/ratings");
            if(!res.ok){
                throw Error(res.statusText);
            }
            const json = await res.json();
            this.setState({
                isLoaded: true,
                reviewList: json
            })
        } catch(err){
            console.log(err);
            this.setState({
                error: err
            })
        }
    }
    render(){
        const reviewList = this.state.reviewList.filter(review => review.ratingRestaurant.id === this.props.restaurant.id);
        const reviews = reviewList.map((review) => 
            <Review score={review.rating} comment={review.comment} username={review.ratingUser.userName} />
        );
        return (
            <div>
                <h1>{this.props.restaurant.name} 
                {this.props.user.role === "ADMIN" ? <Button type="submit" value="submit" className="button" onClick={() => this.updateRestaurant()}>Update</Button>: ""}                
                </h1>
                {this.state.updateRestaurant ? <UpdateRestaurant restaurant={this.props.restaurant} />
                :<div>
                    <p>{this.props.restaurant.address}</p>
                    <p>{this.props.restaurant.description}</p>
                </div>}   
                <h2>Reviews</h2>
                {reviews}
                {this.props.user.role ==="USER" || this.props.user.role === "ADMIN" ? 
                    <Button type="submit" value="submit" className="button" onClick={() => this.leaveReview()}>Leave a review</Button>
                    : "You must be logged in to leave a review"
                }
                {this.state.leaveReview && 
                    <CreateReview user={this.props.user} restaurant={this.props.restaurant} />}
            </div>
        )
    }
}

export default Restaurant;
