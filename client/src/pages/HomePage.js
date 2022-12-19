import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import GenusBar from "../components/GenusBar";
import ProductList from "../components/ProductList";
import {Context} from "../index";
import {getGenus, receiveProducts} from "../http/productAPI";
import {observer} from "mobx-react-lite";

const HomePage = observer(() => {
    const {product} = useContext(Context)

    useEffect(() => {

        receiveProducts().then(data => product.setProducts(data))
    }, [])

    useEffect(() => {
        getGenus().then(data => product.setGenus(data))
        receiveProducts(product.selectedGenus.id).then(data =>{
            product.setProducts(data)
        })
    }, [product.selectedGenus])

    return (
        <Container>
            <Row className="mt-3">
                <Col md={3}>
                    <GenusBar/>
                </Col>
                <Col md={9}>
                    <ProductList/>
                </Col>
            </Row>
        </Container>
    );
});

export default HomePage;