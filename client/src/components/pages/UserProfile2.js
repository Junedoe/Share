import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';
import CardProductDetail from '../CardProduct';

class UserProfile2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }
    componentDidMount() {
        api.getProductsOfUser(this.props.match.params.id)
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
                <h2>Welcome</h2>
                {console.log('this.state.products[0]', this.state.products[0])}
                <div className="card-product-container">
                    {this.state.products.map((c, i) => (
                        <CardProductDetail key={i} product={c} />
                    ))}
                </div>
            </div>
        );
    }
}

export default UserProfile2;
