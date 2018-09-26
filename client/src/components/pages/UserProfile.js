import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';
import CardProductDetail from '../CardProduct';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            image: '',
            file: null,
            username: ''
        };
    }
    componentDidMount(props) {
        api.getProducts()
            .then(products => {
                this.setState({
                    products: products.filter(product => product._owner)
                });
            })
            .catch(err => console.log(err));
        api.getCurrentUser()
            .then(data => {
                this.setState({
                    username: data.username
                });
            })
            .catch(err => console.log(err));
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
                    image: this.state.image,
                    file: this.state.file
                };
            })
            .catch(err => {
                console.log('ERROR');
            });
    }

    handleChange(e) {
        this.setState({
            file: e.target.files[0]
        });
    }

    /* form to upload picture
    <form onSubmit={e => this.handleSubmit(e)}>
    <input type="file" name="image" onChange={e => this.handleChange(e)} />
    </form>
    */

    render() {
        return (
            <div id="headings">
                <div className="grid">
                    <div className="box box1">
                        <div>
                            <img id="profile-pic" src="/images/profile-pic.jpg" alt="Jane" />
                        </div>
                    </div>
                    <div className="box box2">
                        <div className="flx-start">
                            <div className="up-card">
                                <h1>Welcome {this.state.username}</h1>
                                <p className="up-title">Sharing is caring</p>
                                <p />
                                <p>
                                    <button className="up-btn">Contact</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-product-container">
                    {this.state.products.map((c, i) => (
                        <CardProductDetail key={i} product={c} />
                    ))}
                </div>
            </div>
        );
    }
}

export default UserProfile;
