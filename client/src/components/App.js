import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            products: []
        };
    }

    handleLogoutClick(e) {
        api.logout();
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar className="App-header">
                    <NavbarBrand href="/" id="logo">
                        Share.
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen}>
                        <Nav className="ml-auto">
                            <NavItem>
                                <NavLink to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/add-product">Add product</NavLink>
                            </NavItem>
                            <NavItem>
                                {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
                            </NavItem>
                            <NavItem>
                                {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
                            </NavItem>
                            <NavItem>
                                {api.isLoggedIn() && (
                                    <NavLink to="/" onClick={e => this.handleLogoutClick(e)}>
                                        Logout
                                    </NavLink>
                                )}
                            </NavItem>
                            <NavItem>
                                <NavLink to="/userProfile">UserProfile</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Switch>
                    <Route path="/" exact component={Products} />
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
