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
                <div className="header-pic">
                    <div class="flex-grid">
                        <div class="col">
                            <img id="profile-pic" src="/images/profile-pic.png" alt="John" />
                        </div>
                        <div class="col">
                            <div className="up-card">
                                <h1>Jane Doe</h1>
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
