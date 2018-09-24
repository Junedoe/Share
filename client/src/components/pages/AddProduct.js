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
            message: null,
            file: null
        };
    }

    handleInputChange(stateFieldName, event) {
        let newState = {};
        newState[stateFieldName] = event.target.value;
        this.setState(newState);
    }

    handleSubmit(e) {
        e.preventDefault();
        api.addPicture(this.state.file)
            .then(url => {
                console.log('at url', url);
                this.setState({ image: url.pictureUrl });
                let data = {
                    name: this.state.name,
                    subtitle: this.state.subtitle,
                    description: this.state.description,
                    image: this.state.image,
                    file: this.state.file
                };
                api.postProducts(data).then(result => {
                    console.log(result);
                    console.log('SUCCESS!');
                    this.setState({
                        name: '',
                        subtitle: '',
                        description: '',
                        image: '',
                        file: '',
                        message: `Your item '${this.state.name}' has been created`
                    });
                    setTimeout(() => {
                        this.setState({
                            message: null
                        });
                    }, 2000);
                });
            })
            .catch(err => {
                console.log('ERROR');
            });
    }
    // new:

    handleChange(e) {
        console.log('handleChange');
        console.log('DEBUG e.target.files[0]', e.target.files[0]);
        this.setState({
            file: e.target.files[0]
        });
    }

    render() {
        return (
            <div className="AddProduct">
                <h2>Add product</h2>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input type="file" name="image" onChange={e => this.handleChange(e)} /> <br />
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
                    <button>Add Item</button>
                </form>
                <div
                    style={{
                        margin: 10,
                        backgroundColor: 'aqua',
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
