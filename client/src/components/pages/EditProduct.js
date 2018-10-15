import React, { Component } from 'react';
import api from '../../api';

class EditProduct extends Component {
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
    componentDidMount() {
        api.getProduct(this.props.match.params.id)
            .then(product => {
                this.setState({
                    name: product.name,
                    subtitle: product.subtitle,
                    description: product.description,
                    image: product.image
                });
            })
            .catch(err => console.log(err));
    }

    handleInputChange = (stateFieldName, event) => {
        let newState = {};
        newState[stateFieldName] = event.target.value;
        this.setState(newState);
    };

    handleSubmit = e => {
        e.preventDefault();
        let data = {
            file: this.state.file,
            name: this.state.name,
            subtitle: this.state.subtitle,
            description: this.state.description
        };
        api.updateProductInformation(data, this.props.match.params.id)
            .then(product => {
                console.log('product IN FE', product);
                this.props.history.push('/user-profile'); // Redirect to the home page
            })
            .catch(err => {
                console.log('ERROR');
            });
    };

    handleChange = e => {
        console.log('DEBUG e.target.files[0]', e.target.files[0]);
        this.setState({
            file: e.target.files[0]
        });
    };

    render() {
        return (
            <div className="product-form" id="form-container">
                <h2>Edit your Product</h2>
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

export default EditProduct;
