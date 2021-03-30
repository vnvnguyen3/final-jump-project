import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import RestaurantsList from './components/RestaurantsList';
import User from './components/User';
import SignUp from './components/SignUp';
import AddRestaurant from './components/AddRestaurant';
import { Component } from 'react';

class App extends Component {
  constructor(props){
    super();
    this.state = {
        isLoaded: false,
        userList: [],
        error: null,
        user: {}
    }
  }

  async componentDidMount(){
      try{
          const res = await fetch("http://localhost:5000/users");
          if(!res.ok){
              throw Error(res.statusText);
          }
          const json = await res.json();
          this.setState({
              isLoaded: true,
              userList: json
          })
      } catch(err){
          console.log(err);
          this.setState({
              error: err
          })
      }
  }

  updateUser = (user) => {
    this.setState({user: user});
  }

  render(){
    const {isLoaded, error} = this.state;
    if(error){
      return <div>Error: {error.message}</div>
    }
    else if(!isLoaded){
        return <div>Loading.....</div>
    }else{
      return (
        <div className="App">
          <Router>
            <Header user={this.state.user} />
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/restaurant'>
                <RestaurantsList user={this.state.user} />
              </Route>
              <Route path='/login'>
                <Login onSelectUser={this.updateUser} />
              </Route>
              <Route path='/signup'>
                <SignUp />
              </Route>
              <Route path='/users/:username'>
                <User user={this.state.user} />
              </Route>
              <Route path='/addrestaurant' component={AddRestaurant} />
            </Switch>
          </Router>
        </div>
      );
    }
  }
}

export default App;
