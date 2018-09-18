import React, { Component } from 'react';
import api from '../../api';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }
    componentDidMount() {
        api.getProducts()
            .then(products => {
                console.log(products);
                this.setState({
                    products: products
                });
            })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div className="Products">
                <h2>List of products</h2>
                {this.state.products.map((c, i) => (
                    <li key={i}>{c.name}</li>
                ))}
            </div>
        );
    }
}

export default Products;
