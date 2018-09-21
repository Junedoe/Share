import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';
import CardProductDetail from '../CardProduct';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
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
    }

    render() {
        return (
            <div id="headings">
                <h2>User Profile</h2>
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
