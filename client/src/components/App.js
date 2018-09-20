import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Products from './pages/Products';
import Searchbar from './Searchbar';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

let NavBrandStyle = {
    color: '#fff',
    marginRight: '15vw',
    fontWeight: 600,
    textDecoration: 'none',
    fontSize: '25px'
};

class App extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            filteredText: '',
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
    handleChange = e => {
        this.setState({ filteredText: e.target.value });
    };

    render() {
        return (
            <div>
                <Navbar className="navbar-header" expand="md">
                    <NavbarBrand style={NavBrandStyle} href="/">
                        Share.
                    </NavbarBrand>
                    <NavbarToggler
                        onClick={this.toggle}
                        style={{
                            color: '#fff'
                        }}
                    />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Searchbar
                            filteredText={this.state.filteredText}
                            handleChange={this.handleChange}
                        />
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink
                                    style={{
                                        color: '#fff',
                                        marginRight: '5vw',
                                        fontWeight: 550,
                                        textDecoration: 'none',
                                        fontSize: '18px'
                                    }}
                                    to="/"
                                >
                                    Home{' '}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    style={{
                                        color: '#fff',
                                        marginRight: '5vw',
                                        fontWeight: 550,
                                        textDecoration: 'none',
                                        fontSize: '18px'
                                    }}
                                    to="/add-product"
                                >
                                    Add product
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                {!api.isLoggedIn() && (
                                    <NavLink
                                        style={{
                                            color: '#fff',
                                            marginRight: '5vw',
                                            fontWeight: 550,
                                            textDecoration: 'none',
                                            fontSize: '18px'
                                        }}
                                        to="/signup"
                                    >
                                        Signup
                                    </NavLink>
                                )}
                            </NavItem>
                            <NavItem>
                                {!api.isLoggedIn() && (
                                    <NavLink
                                        style={{
                                            color: '#fff',
                                            marginRight: '5vw',
                                            fontWeight: 550,
                                            textDecoration: 'none',
                                            fontSize: '18px'
                                        }}
                                        to="/login"
                                    >
                                        Login
                                    </NavLink>
                                )}
                            </NavItem>
                            <NavItem>
                                {api.isLoggedIn() && (
                                    <NavLink
                                        style={{
                                            color: '#fff',
                                            marginRight: '5vw',
                                            fontWeight: 550,
                                            textDecoration: 'none',
                                            fontSize: '18px'
                                        }}
                                        to="/"
                                        onClick={e => this.handleLogoutClick(e)}
                                    >
                                        Logout
                                    </NavLink>
                                )}
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    style={{
                                        color: '#fff',
                                        marginRight: '3vw',
                                        fontWeight: 550,
                                        textDecoration: 'none',
                                        fontSize: '18px'
                                    }}
                                    to="/userProfile"
                                >
                                    User Profile
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                {/* <Navbar className="navbar-header">
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
                </Navbar> */}

                <Switch>
                    <Route
                        path="/"
                        exact
                        component={() => <Products filteredText={this.state.filteredText} />}
                    />
                    <Route path="/add-product" component={AddProduct} />
                    <Route path="/product-detail/:id" component={ProductDetail} />
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
