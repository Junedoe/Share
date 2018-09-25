import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
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
        this.subtitle.style.color = '#f00';
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
                <button onClick={this.openModal}>Open Modal</button>
                <Modal
                    parentSelector={this.state.getParent}
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Modal"
                >
                    <h2 ref={subtitle => (this.subtitle = subtitle)}>Hello</h2>
                    <div>Product Detail</div>
                    <div>Title</div>
                    <div>Description</div>
                    <div>Link to owner</div>
                    <button onClick={this.closeModal}>close</button>
                </Modal>
            </div>
        );
    }
}
export default ModalProductDetail;
