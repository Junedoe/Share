import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';
import CardProductDetail from '../CardProduct';

class UserProfile2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            username: ''
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
        api.getCurrentUser()
            .then(data => {
                this.setState({
                    username: data.username
                });
            })
            .catch(err => console.log(err));
    }

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

export default UserProfile2;
