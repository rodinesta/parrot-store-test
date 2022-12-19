import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import ProductItem from "../components/ProductItem";
import {Context} from "../index";
import {getGenus, receiveProducts} from "../http/productAPI";
import ProductList from "../components/ProductList";
import CreateProduct from "../components/modals/createProduct";

const SellerPage = () => {
    const {product} = useContext(Context)
    const user = {id: 1, firstName: 'Oleg', secondName: 'Olegov', lastName: 'Olegovich', phoneNumber: 89315438294}
    const [productVisible, setProductVisible] = useState(false)


    useEffect(() => {
        getGenus().then(data => product.setGenus(data))
        receiveProducts().then(data => product.setProducts(data))
    }, [])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4} style={{display: 'flex', flexDirection: 'column'}}>
                    <h1>Мои данные</h1>
                    <text>Фамилия: {user.secondName}</text>
                    <text>Имя: {user.firstName}</text>
                    <text>Отчество: {user.lastName}</text>
                    <text>Номер телефона: {user.phoneNumber}</text>
                    <Button style={{width: 240, height: 50, marginTop: 20}}>Изменить данные</Button>
                    <Button style={{width: 240, height: 50, marginTop: 10}} onClick={() => setProductVisible(true)}>Продать попугая</Button>
                </Col>
                <Col md={6}>
                    <h1>Птицы на продаже</h1>
                    <Row className="d-flex">
                        {product.products.map(product =>
                            <ProductItem key={product.id} product={product}/>
                        )}
                    </Row>
                </Col>
            </Row>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
        </Container>
    );
};

export default SellerPage;