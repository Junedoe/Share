import React, { Component } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
            email: '',
            street: '',
            district: '',
            city: '',
            initial: false
        };
        this.handleNextClick = this.handleNextClick.bind(this);
    }

    handleInputChange(stateFieldName, event) {
        this.setState({
            [stateFieldName]: event.target.value
        });
    }

    handleClick(e) {
        e.preventDefault();
        let data = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            email: this.state.email,
            street: this.state.street,
            district: this.state.district,
            city: this.state.city
        };
        api.signup(data)
            .then(result => {
                console.log('SUCCESS!');
                this.props.history.push('/login'); // Redirect to the login page
            })
            .catch(err => {
                console.log('ERROR');
            });
    }
    handleNextClick(e) {
        this.setState({
            initial: true
        });
    }

    render() {
        return (
            <div className="Signup" id="form-container">
                <h2>Signup</h2>
                <form>
                    {!this.state.initial && (
                        <div>
                            {' '}
                            Username:{' '}
                            <input
                                type="text"
                                value={this.state.username}
                                onChange={e => this.handleInputChange('username', e)}
                            />{' '}
                            <br />
                            Password:{' '}
                            <input
                                type="password"
                                value={this.state.password}
                                onChange={e => this.handleInputChange('password', e)}
                            />{' '}
                            <br />
                        </div>
                    )}
                    {this.state.initial && (
                        <div>
                            Full Name:{' '}
                            <input
                                type="text"
                                value={this.state.name}
                                onChange={e => this.handleInputChange('name', e)}
                            />{' '}
                            <br />
                            Email:{' '}
                            <input
                                type="email"
                                value={this.state.email}
                                onChange={e => this.handleInputChange('email', e)}
                            />{' '}
                            <br />
                            Street:{' '}
                            <input
                                type="text"
                                value={this.state.street}
                                onChange={e => this.handleInputChange('street', e)}
                            />{' '}
                            <br />
                            District:{' '}
                            <input
                                type="text"
                                value={this.state.district}
                                onChange={e => this.handleInputChange('district', e)}
                            />{' '}
                            <br />
                            City:{' '}
                            <input
                                type="text"
                                value={this.state.city}
                                onChange={e => this.handleInputChange('city', e)}
                            />{' '}
                            <br />
                            <p>
                                or go to
                                {!api.isLoggedIn() && <Link to="/login">Login</Link>}
                            </p>
                        </div>
                    )}
                    {!this.state.initial && (
                        <button type="button" onClick={this.handleNextClick}>
                            next
                        </button>
                    )}
                    {this.state.initial && <button onClick={e => this.handleClick(e)}>Signup</button>}
                </form>
            </div>
        );
    }
}

export default Signup;
