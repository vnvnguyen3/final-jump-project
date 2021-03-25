import React, { Component, useState } from 'react';
import {Switch, Route, Link } from 'react-router-dom';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import Restaurant from './Restaurant';

function SearchBar(){
    const [search, setSearch] = useState("");

    const onChangeSearch = (event) => {
        setSearch(event.target.value);
    }

    return (
        <Form action={`/restaurant/name/${search}`}>
            <FormGroup className="formgroup">
                <Input type="text" id="search" name="search" size="30" 
                    value={search} onChange={onChangeSearch} />
                <Button type="submit" value="submit" className="button">Search</Button>
            </FormGroup>
        </Form>
    )
}

class RestaurantsList extends Component {
    constructor(props){
        super();
        this.state = {
            isLoaded: false,
            restaurantList: [],
            error: null
        }
    }

    async componentDidMount(){
        try{
            const res = await fetch("http://localhost:8080/restaurants");
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
        const restaurants = restaurantList.map((restaurant) => 
            <div>
                <Link to={`/restaurant/id/${restaurant.id}`} className="restaurant-li">{restaurant.name}</Link>
            </div>
        );
        const RestaurantWithId = ({match}) => {
            const restaurant = restaurantList.filter(restaurant => restaurant.id == match.params.restaurantId)[0];
            return (
                <Restaurant title={restaurant.name} location={restaurant.address} description={restaurant.description} />
            );
        }
        const RestaurantWithName = ({match}) => {
            const restaurant = restaurantList.filter(restaurant => restaurant.name === match.params.restaurantName)[0];
            return (
                <Restaurant title={restaurant.name} location={restaurant.address} description={restaurant.description} />
            );
        }
        if(error){
            return <div>Error: {error.message}</div>
        }
        else if(!isLoaded){
            return <div>Loading.....</div>
        }
        else{
            return (
                <div>
                    <Switch>
                        <Route path={`/restaurant/id/:restaurantId`} component={RestaurantWithId}/>
                        <Route path={`/restaurant/name/:restaurantName`} component={RestaurantWithName}/>
                        <Route path='/restaurant' />
                    </Switch>
                    <h2>Select from the list of restaurants</h2>
                    <p>or use the search bar</p>
                    <SearchBar />
                    {restaurants}
                </div>
            )
        }
    }
}

export default RestaurantsList;
