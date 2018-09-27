import React, { Component } from 'react';
import Modal from 'react-modal';
import { Card, CardImg, CardBody, CardSubtitle } from 'reactstrap';

const customStyles = {
    content: {
        width: '40%',
        height: '90%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        // overflow: 'scroll',
        alignContent: 'center'
    }
};

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
                <button className="modal-btn" onClick={this.openModal}>
                    Open Modal
                </button>
                <Modal
                    parentSelector={this.state.getParent}
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Modal"
                >
                    <Card>
                        <CardImg top width="100%" src={this.props.product.image} alt="Card image cap" />
                        <CardBody>
                            <h2 ref={subtitle => (this.subtitle = subtitle)}>
                                {this.props.product.name}
                            </h2>
                            <CardSubtitle>{this.props.product.subtitle}</CardSubtitle>
                        </CardBody>
                        <CardBody>
                            <div>{this.props.product.description}</div>
                            <button className="modal-btn" onClick={this.closeModal}>
                                close
                            </button>
                        </CardBody>
                    </Card>
                </Modal>
            </div>
        );
    }
}
export default ModalProductDetail;
