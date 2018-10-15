import React, { Component } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardSubtitle, CardLink } from 'reactstrap';
import MediaQuery from 'react-responsive';

const customStyleLaptop = {
    content: {
        width: '45%',
        height: '90%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        alignContent: 'center'
    }
};
const customStyleMobile = {
    content: {
        width: '90%',
        height: '90%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        alignContent: 'center'
    }
};

const Example = () => (
    <div>
        <MediaQuery query="(min-device-width: 1224px)">
            <div>You are a desktop or laptop</div>
        </MediaQuery>

        <MediaQuery query="(max-device-width: 769px)">
            <div>You are a mobile phone</div>
        </MediaQuery>
    </div>
);

class ModalProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    afterOpenModal = () => {
        this.subtitle.style.color = '$grey800';
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    getParent = () => {
        return document.querySelector('#root');
    };

    render() {
        return (
            <div>
                {!this.props.isCurrentUser && (
                    <button className="modal-btn" onClick={this.openModal}>
                        View details
                    </button>
                )}
                {this.props.isCurrentUser && (
                    <button className="modal-btn">
                        <Link to={`/edit-product/${this.props.product._id}`}>Edit</Link>
                    </button>
                )}
                <MediaQuery query="(min-device-width: 425px)">
                    <Modal
                        parentSelector={this.state.getParent}
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyleLaptop}
                        contentLabel="Modal"
                    >
                        <Card>
                            <CardImg
                                top
                                width="100%"
                                src={this.props.product.image}
                                alt="Card image cap"
                            />
                            <CardBody>
                                <h2 ref={subtitle => (this.subtitle = subtitle)}>
                                    {this.props.product.name}
                                </h2>
                                <CardSubtitle>{this.props.product.subtitle}</CardSubtitle>
                            </CardBody>
                            <CardBody>
                                <div id="description">{this.props.product.description}</div>
                                <button className="modal-btn" onClick={this.closeModal}>
                                    close
                                </button>
                                {!this.props.isCurrentUser &&
                                    this.props.product._owner && (
                                        <CardLink href={`/user/${this.props.product._owner._id}`}>
                                            <button className="modal-btn" id="modal-btn-user">
                                                from {this.props.product._owner.username}
                                            </button>
                                        </CardLink>
                                    )}
                            </CardBody>
                        </Card>
                    </Modal>
                </MediaQuery>
                <MediaQuery query="(max-device-width: 424px)">
                    <Modal
                        parentSelector={this.state.getParent}
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyleMobile}
                        contentLabel="Modal"
                    >
                        <Card>
                            <CardImg
                                top
                                width="100%"
                                src={this.props.product.image}
                                alt="Card image cap"
                            />
                            <CardBody>
                                <h2 ref={subtitle => (this.subtitle = subtitle)}>
                                    {this.props.product.name}
                                </h2>
                                <CardSubtitle>{this.props.product.subtitle}</CardSubtitle>
                            </CardBody>
                            <CardBody>
                                <div id="description">{this.props.product.description}</div>
                                <button className="modal-btn" onClick={this.closeModal}>
                                    close
                                </button>
                                {!this.props.isCurrentUser &&
                                    this.props.product._owner && (
                                        <CardLink href={`/user/${this.props.product._owner._id}`}>
                                            <button className="modal-btn" id="modal-btn-user">
                                                from {this.props.product._owner.username}
                                            </button>
                                        </CardLink>
                                    )}
                            </CardBody>
                        </Card>
                    </Modal>
                </MediaQuery>
            </div>
        );
    }
}
export default ModalProductDetail;
