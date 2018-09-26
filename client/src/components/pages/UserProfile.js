import React, { Component } from 'react';
import api from '../../api';
import CardProductDetail from '../CardProduct';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            image: '',
            // file: null,
            username: '',
            isCurrentUser: false
        };
    }
    componentDidMount() {
        if (this.props.match) {
            api.getProductsOfUser(this.props.match.params.id)
                .then(products => {
                    console.log('PRODUCTS FOR USER -->', products);
                    this.setState({
                        products: products,
                        username: products[0]._owner.username
                    });
                })
                .catch(err => console.log(err));
        } else {
            api.getCurrentUser()
                .then(data => {
                    this.setState({
                        username: data.username,
                        isCurrentUser: true
                    });
                    api.getProductsOfUser(data._id)
                        .then(products => {
                            this.setState({
                                products: products.filter(product => product._owner)
                            });
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }
    }

    render() {
        console.log('current user', this.state.isCurrentUser);
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
                                {this.state.isCurrentUser && <h1>Welcome {this.state.username}</h1>}
                                {!this.state.isCurrentUser && (
                                    <h1>This is the profile of {this.state.username}</h1>
                                )}
                                <p className="up-title">Sharing is caring</p>
                                <p />
                                <p>
                                    {!this.state.isCurrentUser && (
                                        <button className="up-btn">Contact</button>
                                    )}
                                    {this.state.isCurrentUser && (
                                        <button className="up-btn">Edit Profile</button>
                                    )}
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
