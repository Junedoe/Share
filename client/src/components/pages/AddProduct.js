import React, { Component } from 'react';
import api from '../../api';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            subtitle: '',
            description: '',
            image: '',
            message: '',
            file: ''
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
                            message: ''
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
            <div className="AddProduct" id="form-container">
                <h2>Add product</h2>
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
                    <button className="up-btn">Add Item</button>
                </form>
                <div
                    className="pa-btn"
                    style={{
                        display: this.state.message ? 'inline' : 'none'
                    }}
                >
                    {this.state.message}
                </div>
            </div>
        );
    }
}

export default AddProduct;
