import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Form, Image, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {receiveOneProduct} from "../http/productAPI";
import jwtDecode from "jwt-decode";
import {Context} from "../index";
import {getUser} from "../http/userAPI";

const ProductPage = () => {

    const [product, setProduct] = useState({})
    const {user} = useContext(Context)
    const {id} = useParams()
    console.log(product.userId)

    useEffect(() => {
        getUser(product.userId).then(data => user.setUser(data))
        receiveOneProduct(id).then(data => setProduct(data))
    })

    return (
        <Container className="mt-3">
            <Row>
                <Col md={3}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + product.img}/>
                </Col>
                <Col md={8} className="d-lg-block">
                    <h1 style={{fontSize: 50}}>{product.title}</h1>
                    <div style={{}}>
                        <text style={{fontSize:30}}>{product.information}</text>
                    </div>
                    <text style={{fontSize:24}}>{product.price} рублей</text>
                    <br/>
                    <text style={{fontSize: 22}}>Продавец: {user.user.firstName} {user.user.lastName}</text>
                    <br/>
                    <text style={{fontSize: 22}}>Телефон: {user.user.phoneNumber}</text>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductPage;