import React, { Component } from 'react';
import api from '../../api';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            street: '',
            number: '',
            postalCode: '',
            city: '',
            district: '',
            image: '',
            message: '',
            file: ''
        };
    }

    handleInputChange = (stateFieldName, event) => {
        let newState = {};
        newState[stateFieldName] = event.target.value;
        this.setState(newState);
    };

    handleSubmit = e => {
        e.preventDefault();
        let data = this.state;
        api.updateUserInformation(data)
            .then(user => {
                console.log('USER IN FE', user.user);
                this.props.history.push('/user-profile'); // Redirect to the home page
            })
            .catch(err => {
                console.log('ERROR');
            });
    };

    handleChange = e => {
        console.log('handleChange');
        console.log('DEBUG e.target.files[0]', e.target.files[0]);
        this.setState({
            file: e.target.files[0]
        });
    };

    render() {
        return (
            <div className="AddProduct" id="form-container">
                <h2>Edit your profile</h2>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        class="inputfile"
                        onChange={e => this.handleChange(e)}
                    />
                    <label for="file">Choose a file</label>
                    <br />
                    First Name:{' '}
                    <input
                        type="text"
                        value={this.state.firstname}
                        onChange={e => {
                            this.handleInputChange('firstname', e);
                        }}
                    />{' '}
                    <br />
                    Surname:{' '}
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={e => {
                            this.handleInputChange('surname', e);
                        }}
                    />{' '}
                    <br />
                    Email:{' '}
                    <input
                        type="text"
                        value={this.state.email}
                        onChange={e => {
                            this.handleInputChange('email', e);
                        }}
                    />{' '}
                    <br />
                    <div className="street-number" style={{ display: 'inline' }}>
                        Street:{' '}
                        <input
                            type="text"
                            value={this.state.street}
                            onChange={e => {
                                this.handleInputChange('street', e);
                            }}
                        />{' '}
                        <br />
                        Number:{' '}
                        <input
                            type="text"
                            value={this.state.number}
                            onChange={e => this.handleInputChange('number', e)}
                        />{' '}
                    </div>
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
                        value={this.state.postalCode}
                        onChange={e => this.handleInputChange('postalCode', e)}
                    />{' '}
                    <br />
                    City:{' '}
                    <input
                        type="text"
                        value={this.state.city}
                        onChange={e => this.handleInputChange('city', e)}
                    />{' '}
                    <br />
                    <button>Save changes</button>
                </form>
                <div
                    style={{
                        width: '20%',
                        margin: 10,
                        backgroundColor: '#37f3e4',
                        display: this.state.message ? 'block' : 'none'
                    }}
                >
                    {this.state.message}
                </div>
            </div>
        );
    }
}

export default EditProfile;
