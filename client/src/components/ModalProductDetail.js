import React, { Component } from 'react';

class ModalProductDetail extends Component {
    render() {
        return (
            <div class="pop">
                <label for="3" class="open">
                    CLICK ME!
                </label>

                <input type="checkbox" id="3" />
                <div class="modal">
                    <div class="modal__inner">
                        <p>Born 'n bred CSS. I have no JS in my genes, I promise!</p>
                        <label for="3" />
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalProductDetail;
