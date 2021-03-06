import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';
import api from '../api';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    handleLogoutClick = e => {
        api.logout();
    };

    handleClick = e => {
        e.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <div>
                <nav className="navbar">
                    <div
                        id="side-nav"
                        className={
                            this.state.isOpen ? 'open-side-menu side-nav' : 'closed-side-menu side-nav'
                        }
                    >
                        <div className="side-nav-search">
                            <Searchbar
                                filteredText={this.props.filteredText}
                                handleChange={this.props.handleChange}
                            />
                        </div>
                        <a href={null} className="btn-close" onClick={e => this.handleClick(e)}>
                            &times;
                        </a>
                        <a href="/">Home</a>
                        {api.isLoggedIn() && <a href="/user-profile">My Profile</a>}
                        {api.isLoggedIn() && <a href="/add-new-product">Add Product</a>}
                        {api.isLoggedIn() && <a href="/chat">Chat</a>}
                        {!api.isLoggedIn() && <Link to="/signup"> Signup</Link>}
                        {!api.isLoggedIn() && <a href="/login">Login</a>}
                        {api.isLoggedIn() && (
                            <a href="/logout" onClick={e => this.handleLogoutClick(e)}>
                                Logout
                            </a>
                        )}
                    </div>
                    <span className="open-slide">
                        <a href={null} onClick={this.handleClick}>
                            <svg width="30" height="30">
                                <path d="M0,5 30,5" stroke="#fff" strokeWidth="5" />
                                <path d="M0,14 30,14" stroke="#fff" strokeWidth="5" />
                                <path d="M0,23 30,23" stroke="#fff" strokeWidth="5" />
                            </svg>
                        </a>
                    </span>
                    <div id="nav-brand">
                        <Link to="/">Share.</Link>
                    </div>
                    <div className="nav-links-row">
                        <ul className="navbar navbar-navb-li">
                            <li>{!api.isLoggedIn() && <Link to="/">Home</Link>}</li>
                            <li>{api.isLoggedIn() && <Link to="/user-profile">My Profile</Link>}</li>
                            <li>{api.isLoggedIn() && <Link to="/chat">Chat</Link>}</li>
                            <li>{!api.isLoggedIn() && <Link to="/signup">Signup</Link>}</li>
                            <li>{!api.isLoggedIn() && <Link to="/login">Login</Link>}</li>
                            <li>
                                {api.isLoggedIn() && (
                                    <Link to="/" onClick={e => this.handleLogoutClick(e)}>
                                        Logout
                                    </Link>
                                )}
                            </li>
                            <li className="navbar-navb-search">
                                <Searchbar
                                    filteredText={this.props.filteredText}
                                    handleChange={this.props.handleChange}
                                />
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;
