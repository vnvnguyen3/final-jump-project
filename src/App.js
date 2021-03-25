import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import RestaurantsList from './components/RestaurantsList';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/restaurant' component={RestaurantsList} />
          <Route path='/login' component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
