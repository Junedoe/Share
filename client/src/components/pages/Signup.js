import React, { Component } from 'react';
import api from '../../api';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            name: '',
            email: '',
            password: '',
            street: '',
            city: ''
        };
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
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

    render() {
        return (
            <div className="Signup" id="form-container">
                <h2>Signup</h2>
                <form>
                    Username:{' '}
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={e => this.handleInputChange('username', e)}
                    />{' '}
                    <br />
                    Name:{' '}
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
                        type="street"
                        value={this.state.street}
                        onChange={e => this.handleInputChange('street', e)}
                    />{' '}
                    <br />
                    District:{' '}
                    <input
                        type="district"
                        value={this.state.district}
                        onChange={e => this.handleInputChange('district', e)}
                    />{' '}
                    <br />
                    City:{' '}
                    <input
                        type="city"
                        value={this.state.city}
                        onChange={e => this.handleInputChange('city', e)}
                    />{' '}
                    <br />
                    <button onClick={e => this.handleClick(e)}>Signup</button>
                </form>
            </div>
        );
    }
}

export default Signup;
