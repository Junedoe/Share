import React, { Component } from 'react';
import api from '../../api';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleInputChange(stateFieldName, event) {
        this.setState({
            [stateFieldName]: event.target.value
        });
    }

    handleClick(e) {
        e.preventDefault();
        api.login(this.state.username, this.state.password)
            .then(result => {
                console.log('SUCCESS!');
                this.props.history.push('/'); // Redirect to the home page
            })
            .catch(err => {
                console.log('ERROR');
            });
    }

    render() {
        return (
            <div className="Login" id="form-container">
                <h2>Login</h2>
                <form>
                    Username: <br />
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={e => this.handleInputChange('username', e)}
                    />{' '}
                    <br />
                    Password: <br />
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={e => this.handleInputChange('password', e)}
                    />{' '}
                    <br />
                    <button onClick={e => this.handleClick(e)}>Login</button>
                </form>
            </div>
        );
    }
}

export default Login;
