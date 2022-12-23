import React, {useEffect, useState} from 'react';
import {Col, Container, Form, Image, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {receiveOneProduct} from "../http/productAPI";

const ProductPage = () => {

    const [product, setProduct] = useState({})
    const {id} = useParams()
    useEffect(() => {
        receiveOneProduct(id).then(data => setProduct(data))
    }, [])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={3}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + product.img}/>
                </Col>
                <Col md={8} className="d-lg-block">
                    <h1>{product.title}</h1>
                    <div style={{}}>
                        <text style={{fontSize:26}}>{product.information}</text>
                    </div>
                    <text style={{fontSize:26}}>{product.price} рублей</text>
                    <br/>
                    <text style={{fontSize:26}}>{product.userId} рублей</text>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductPage;