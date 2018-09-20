import React, { Component } from 'react';
import api from '../../api';
import CardProduct from '../CardProduct';

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
            <div className="Products" id="headings">
                <h2>List of products</h2>
                <div className="card-product-container">
                    {this.state.products
                        .filter(el =>
                            Object.values(el)
                                .toString()
                                .toUpperCase()
                                .includes(this.props.filteredText.toUpperCase())
                        )
                        .map(
                            (c, i) => (
                                <CardProduct key={i} product={c} />
                            ),
                            console.log(this.state.products)
                        )}
                </div>
            </div>
        );
    }
}

export default Products;
