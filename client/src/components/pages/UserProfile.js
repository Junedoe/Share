import React, { Component } from 'react';
import api from '../../api';
import CardProduct from '../CardProduct';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            firstname: '',
            isCurrentUser: false
        };
    }

    handleDelete = (e, id) => {
        console.log('delete', id);
        e.preventDefault();
        this.setState({
            products: this.state.products.filter(el => el._id !== id)
        });
        api.deleteProduct(id);
    };
    componentDidMount() {
        if (this.props.match) {
            api.getProductsOfUser(this.props.match.params.id)
                .then(products => {
                    this.setState({
                        products: products,
                        firstname: products[0]._owner.firstname
                    });
                })
                .catch(err => console.log(err));
        } else {
            api.getCurrentUser()
                .then(data => {
                    this.setState({
                        firstname: data.firstname,
                        pictureUrl: data.pictureUrl,
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
                            <img id="profile-pic" src={this.state.pictureUrl} alt="Jane" />
                        </div>
                    </div>
                    <div className="box box2">
                        <div className="flx-start">
                            <div className="up-card">
                                {this.state.isCurrentUser && <h1>Welcome {this.state.firstname}</h1>}
                                {!this.state.isCurrentUser && (
                                    <h1>This is the profile of {this.state.firstname}</h1>
                                )}
                                <p className="up-title">Sharing is caring</p>
                                <p />
                                <p>
                                    {/* {!this.state.isCurrentUser && (
                                        <Link
                                            className="up-btn"
                                            href={`/newchat/${this.state.product._owner}`}
                                        >
                                            Go to Chat
                                        </Link>
                                    )} */}
                                    {this.state.isCurrentUser && (
                                        <a href="/edit-profile">
                                            <button className="up-btn">Edit Profile</button>
                                        </a>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-product-container">
                    {this.state.products.map((c, i) => (
                        <CardProduct
                            key={i}
                            product={c}
                            handleDelete={(e, id) => this.handleDelete(e, id)}
                            isCurrentUser={this.state.isCurrentUser}
                            atProfile={true}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default UserProfile;
