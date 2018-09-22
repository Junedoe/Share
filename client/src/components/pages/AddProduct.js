import React, { Component } from 'react';
import api from '../../api';
import AddPicture from './AddPicture';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            subtitle: '',
            description: '',
            message: null,
            files: ''
        };
    }
    handlePictureUpload = () => {
        console.log('handlePictureUpload is being called');
    };

    handleInputChange(stateFieldName, event) {
        let newState = {};
        newState[stateFieldName] = event.target.value;
        this.setState(newState);
        console.log(this.state);
    }

    handlePicClick(e) {}
    handleClick(e) {
        e.preventDefault();
        console.log(this.state.name, this.state.description);
        let data = {
            name: this.state.name,
            subtitle: this.state.subtitle,
            description: this.state.description,
            pictureUrl: this.state.pictureUrl
        };
        api.addNewProduct(data)
            .then(result => {
                console.log('SUCCESS!');
                this.setState({
                    name: '',
                    subtitle: '',
                    description: '',
                    pictureUrl: [''],
                    message: `Your product '${this.state.name}' has been created`
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
                {/* <AddPicture onChange={this.handlePictureUpload} /> */}
                <form encType="multipart/form-data">
                    <input multiple type="file" name="Upload" onChange={e => this.handleChange(e)} />{' '}
                    <br />
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
                        backgroundColor: '#37f3e4',
                        display: this.state.message ? 'block' : 'none'
                    }}
                >
                    {this.state.message}
                </div>
            </div>
        );
    }
    handleChange(e) {
        this.setState({
            files: e.target.files
        });
        console.log(this.state);
    }
}

export default AddProduct;
