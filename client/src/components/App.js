import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import UserProfile from './pages/UserProfile';
import UserProfile2 from './pages/UserProfile2';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './Navbar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredText: '',
            products: []
        };
    }

    render() {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route
                        path="/"
                        exact
                        component={() => <Products filteredText={this.state.filteredText} />}
                    />
                    <Route path="/add-new-product" component={AddProduct} />
                    <Route path="/product-detail/:id" component={ProductDetail} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/user-profile" component={UserProfile} />
                    <Route path="/user/:id" component={UserProfile2} />
                    <Route path="/chat" component={Chat} />
                    <Route render={() => <h2>404</h2>} />
                </Switch>
            </div>
        );
    }
}

export default App;
