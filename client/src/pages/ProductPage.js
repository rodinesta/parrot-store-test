import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {deleteProduct, receiveOneProduct} from "../http/productAPI";
import jwtDecode from "jwt-decode";
import {Context} from "../index";
import {getUser} from "../http/userAPI";
import {SELLER_ROUTE} from "../utils/consts";

const ProductPage = () => {

    const [product, setProduct] = useState({})
    const {user} = useContext(Context)
    const {id} = useParams()
    const token = jwtDecode(localStorage.getItem('token'))
    const tokenId = token.id

    useEffect(() => {
        getUser(product.userId).then(data => user.setUser(data))
        receiveOneProduct(id).then(data => setProduct(data))
    })
    const deleteProduct1 = () => {
        deleteProduct(id).then()
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={3}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + product.img}/>
                    {product.userId === tokenId &&
                        <Button variant="danger" style={{display: "flex", alignItems: "center", justifyContent: "center"}} className="mt-3 w-100 h-25 fs-4" onClick={deleteProduct1} href={SELLER_ROUTE}>Убрать с продажи</Button>
                    }
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