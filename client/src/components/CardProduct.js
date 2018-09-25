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
                        <ModalProductDetail />
                    </CardLink>
                    <CardLink href={`/user/${props.product._owner && props.product._owner._id}`}>
                        from "(user)"
                    </CardLink>
                </CardBody>
            </Card>
        </div>
    );
};

export default CardProduct;
