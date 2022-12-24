import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import {PRODUCT_ROUTE} from "../utils/consts";

const ProductItem = ({product}) => {
    const navigate = useNavigate()
    return (
        <Col md={3} className={"mt-4"} onClick={() => navigate('/product' + '/' + product.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + product.img}/>
                <div className="mt-2">{product.title}</div>
                <div>{product.price} ₽</div>
            </Card>
        </Col>
    );
};

export default ProductItem;