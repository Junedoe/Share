import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';
// import './AddProduct.css';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            subtitle: '',
            description: '',
            image: '',
            message: null
        };
    }

    handleInputChange(stateFieldName, event) {
        let newState = {};
        newState[stateFieldName] = event.target.value;

        this.setState(newState);
    }

    handleClick(e) {
        e.preventDefault();
        console.log(this.state.name, this.state.description);
        let data = {
            name: this.state.name,
            subtitle: this.state.subtitle,
            description: this.state.description,
            image: this.state.image
        };
        api.postProducts(data)
            .then(result => {
                console.log('SUCCESS!');
                this.setState({
                    name: '',
                    subtitle: '',
                    description: '',
                    image: '',
                    message: `Your item '${this.state.name}' has been created`
                });
                setTimeout(() => {
                    this.setState({
                        message: null
                    });
                }, 2000);
            })
            .catch(err => {
                console.log('ERROR');
            });
    }
    render() {
        return (
            <div className="AddProduct">
                <h2>Add product</h2>
                <form>
                    Image?
                    <br />
                    Name:{' '}
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={e => {
                            this.handleInputChange('name', e);
                        }}
                    />{' '}
                    <br />
                    Subtitle:{' '}
                    <input
                        type="text"
                        value={this.state.subtitle}
                        onChange={e => {
                            this.handleInputChange('subtitle', e);
                        }}
                    />{' '}
                    <br />
                    Description:{' '}
                    <textarea
                        value={this.state.description}
                        cols="30"
                        rows="10"
                        onChange={e => {
                            this.handleInputChange('description', e);
                        }}
                    />{' '}
                    <br />
                    <button onClick={e => this.handleClick(e)}>Add Item</button>
                </form>
                <div
                    style={{
                        margin: 10,
                        backgroundColor: 'red',
                        display: this.state.message ? 'block' : 'none'
                    }}
                >
                    {this.state.message}
                </div>
            </div>
        );
    }
}

export default AddProduct;