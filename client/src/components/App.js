import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
        // api.loadUser();
    }

    handleLogoutClick(e) {
        api.logout();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Share.</h1>
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/add-product">Add product</Link>
                    {!api.isLoggedIn() && <Link to="/signup">Signup</Link>}
                    {!api.isLoggedIn() && <Link to="/login">Login</Link>}
                    {api.isLoggedIn() && (
                        <Link to="/" onClick={e => this.handleLogoutClick(e)}>
                            Logout
                        </Link>
                    )}
                    <Link to="/userProfile">UserProfile</Link>
                </header>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/products" component={Products} />
                    <Route path="/add-product" component={AddProduct} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/userProfile" component={UserProfile} />
                    <Route render={() => <h2>404</h2>} />
                </Switch>
            </div>
        );
    }
}

export default App;
