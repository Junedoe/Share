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
                    products: products
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div id="headings">
                <h2>User Profile</h2>
                <div className="card-product-container">
                    {this.state.products.map(
                        (c, i) => (
                            <CardProductDetail key={i} product={c} />
                        ),
                        console.log(this.state.products)
                    )}
                    <CardProductDetail />
                </div>
            </div>
        );
    }
}

export default UserProfile;
