import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import UserProfile from './pages/UserProfile';
import EditProfile from './pages/EditProfile';
import EditProduct from './pages/EditProduct';
import ChatApp from './pages/Chat';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './Navbar';
import ChatNew from './pages/chatNew';

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

                    <Route path="/chat" component={ChatApp} />
                    <Route path="/edit-profile" component={EditProfile} />
                    <Route path="/edit-product" component={EditProduct} />
                    <Route path="/chatnew/:id" component={ChatNew} />

                    <Route render={() => <h2>404</h2>} />
                </Switch>
            </div>
        );
    }
}

export default App;
