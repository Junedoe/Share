import React, { Component } from 'react';
import api from '../../api';
import CardProductDetail from '../CardProductDetail';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {}
        };
    }
    componentDidMount() {
        api.getProduct(this.props.match.params.id)
            .then(product => {
                console.log(product);
                this.setState({
                    product: product
                });
            })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div className="Products" id="headings">
                <h2>Product Detail Page</h2>
                <CardProductDetail product={this.state.product} />
                <button>Contact</button>
            </div>
        );
    }
}

export default ProductDetail;
