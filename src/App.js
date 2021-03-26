import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import RestaurantsList from './components/RestaurantsList';
import User from './components/User';
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
          const res = await fetch("http://localhost:8080/users");
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
    const {isLoaded, userList, error} = this.state;
    const LoggedIn = ({match}) => {
      const user = userList.filter(user => user.userName == match.params.username)[0];
      return(
          <User user={user} onSelectUser={this.updateUser} />
      );
    }
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
              <Route path='/restaurant' component={RestaurantsList}>
                <RestaurantsList user={this.state.user} />
              </Route>
              <Route path='/login' component={Login} />
              <Route path='/user/:username' component={LoggedIn} />
            </Switch>
          </Router>
        </div>
      );
    }
  }
}

export default App;
