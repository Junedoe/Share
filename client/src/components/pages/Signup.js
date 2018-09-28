import React, { Component } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            surname: '',
            email: '',
            street: '',
            number: '',
            district: '',
            postalcode: '',
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
            firstname: this.state.firstname,
            surname: this.state.surname,
            email: this.state.email,
            street: this.state.street,
            number: this.state.number,
            district: this.state.district,
            postalcode: this.state.postalcode,
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
                {!this.state.initial && <h2>Choose a username and password</h2>}
                {this.state.initial && <h2>Write your personal details</h2>}
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
                            First Name:{' '}
                            <input
                                type="text"
                                value={this.state.firstname}
                                onChange={e => this.handleInputChange('firstname', e)}
                            />{' '}
                            <br />
                            Surname:{' '}
                            <input
                                type="text"
                                value={this.state.surname}
                                onChange={e => this.handleInputChange('surname', e)}
                            />{' '}
                            <br />
                            Email:{' '}
                            <input
                                type="email"
                                value={this.state.email}
                                onChange={e => this.handleInputChange('email', e)}
                            />{' '}
                            <br />
                            <div className="street-number" style={{ display: 'inline' }}>
                                Street:{' '}
                                <input
                                    type="text"
                                    value={this.state.street}
                                    onChange={e => this.handleInputChange('street', e)}
                                />{' '}
                                <br />
                                Number:{' '}
                                <input
                                    type="text"
                                    value={this.state.number}
                                    onChange={e => this.handleInputChange('number', e)}
                                />{' '}
                            </div>
                            <br />
                            District:{' '}
                            <input
                                type="text"
                                value={this.state.district}
                                onChange={e => this.handleInputChange('district', e)}
                            />{' '}
                            <br />
                            Postal Code:{' '}
                            <input
                                type="text"
                                value={this.state.postalcode}
                                onChange={e => this.handleInputChange('postalcode', e)}
                            />{' '}
                            <br />
                            City:{' '}
                            <input
                                type="text"
                                value={this.state.city}
                                onChange={e => this.handleInputChange('city', e)}
                            />{' '}
                            <br />
                        </div>
                    )}
                    {!this.state.initial && (
                        <button className="sl-btn" type="button" onClick={this.handleNextClick}>
                            next
                        </button>
                    )}
                    {this.state.initial && (
                        <button className="sl-btn" onClick={e => this.handleClick(e)}>
                            Signup
                        </button>
                    )}
                    {!this.state.initial && (
                        <p>
                            or go to{' '}
                            <Link className="sl-link" style={{ color: 'darkgrey' }} to="/login">
                                {' '}
                                Login
                            </Link>
                        </p>
                    )}
                </form>
            </div>
        );
    }
}

export default Signup;
