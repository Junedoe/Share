import React from 'react';
import { Card, CardImg, CardBody, CardLink, CardTitle, CardSubtitle } from 'reactstrap';
import ModalProductDetail from './ModalProductDetail';

const CardProduct = props => {
    return (
        <div className="one-card">
            <Card>
                <CardImg top width="100%" src={props.product.image} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{props.product.name}</CardTitle>
                    <CardSubtitle>{props.product.subtitle}</CardSubtitle>
                </CardBody>
                <CardBody>
                    {/* <CardLink href={`/product-detail/${props.product._id}`}>View details</CardLink> */}
                    <CardLink>
                        <ModalProductDetail
                            product={props.product}
                            isCurrentUser={props.isCurrentUser}
                        />
                    </CardLink>

                    {/* <CardLink href={`/chat`}>Go to Chat</CardLink> */}

                    {props.atProfile && (
                        <button
                            className="modal-btn"
                            id="modal-btn-user"
                            onClick={e => props.handleDelete(e, props.product._id)}
                        >
                            Remove item
                        </button>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default CardProduct;
