import React, {useEffect} from 'react';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import {BrowserRouter as Router, Switch, Route, Link, useHistory} from 'react-router-dom'
import Detail from './Components/Detail';
import Login from './Components/Login';
import {useDispatch } from 'react-redux'
import { setUserLogin, setSignOut} from './features/user/userSlice';
import {auth} from './firebase'

function App() {

 
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/detail/:id">
            <Detail />
          </Route>
          <Route path="/">
              <Login />

          </Route>
              
            
        </Switch>
          
        
        
      </Router>
    </div>
  );
}

export default App;
