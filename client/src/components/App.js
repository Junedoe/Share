import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import UserProfile from './pages/UserProfile';
import EditProfile from './pages/EditProfile';
import EditProduct from './pages/EditProduct';
import ChatApp from './chat/ChatApp';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './Navbar';
import api from '../api';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredText: '',
            products: []
        };
    }

    handleChange = e => {
        this.setState({ filteredText: e.target.value });
    };

    render() {
        return (
            <div>
                <Navbar filteredText={this.state.filteredText} handleChange={this.handleChange} />
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={props => <Products filteredText={this.state.filteredText} />}
                    />
                    <Route path="/add-new-product" component={AddProduct} />
                    <Route path="/product-detail/:id" component={ProductDetail} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route
                        path="/user-profile"
                        key="my-profile"
                        render={props => <UserProfile filteredText={this.state.filteredText} />}
                    />
                    <Route
                        path="/user/:id"
                        key="other-profile"
                        render={props => (
                            <UserProfile {...props} filteredText={this.state.filteredText} />
                        )}
                    />

                    <Route path="/edit-profile" component={EditProfile} />
                    <Route path="/edit-product/:id" component={EditProduct} />
                    <Route path="/chat" component={ChatApp} />
                    <Route render={() => <h2>404</h2>} />
                </Switch>
                {api.isLoggedIn() && (
                    <div id="round-button">
                        <Link className="round-button-circle" to="/add-new-product">
                            <img src="/images/Btn-add.png" alt="" />
                        </Link>
                    </div>
                )}
            </div>
        );
    }
}

export default App;
