import React from 'react';
import { Card, CardImg, CardBody, CardLink, CardTitle, CardSubtitle } from 'reactstrap';

const CardProduct = props => {
    return (
        <div className="one-card">
            <Card>
                <CardImg
                    top
                    width="100%"
                    src="../images/tom-crew-620519-unsplash.jpg"
                    alt="Card image cap"
                />
                <CardBody>
                    <CardTitle>{props.product.name}</CardTitle>
                    <CardSubtitle>{props.product.subtitle}</CardSubtitle>
                </CardBody>
                <CardBody>
                    {/* add the variable id to the  next route */}
                    <CardLink href={`/product-detail/${props.product._id}`}>Quick View (Popup)</CardLink>
                </CardBody>
            </Card>
        </div>
    );
};

export default CardProduct;
