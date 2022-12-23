import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import ProductItem from "../components/ProductItem";
import {Context} from "../index";
import {getGenus, receiveProducts} from "../http/productAPI";
import {getUser} from "../http/userAPI";
import CreateProduct from "../components/modals/createProduct";
import {observer} from "mobx-react-lite";
import jwtDecode from "jwt-decode";
import AddInformation from "../components/modals/addInformation";
import ProductList from "../components/ProductList";

const SellerPage = observer(() => {
    const {product} = useContext(Context)
    const {user} = useContext(Context)
    const token = jwtDecode(localStorage.getItem('token'))
    const tokenId = token.id
    const [productVisible, setProductVisible] = useState(false)
    const [informationVisible, setInformationVisible] = useState(false)

    useEffect(() => {
        getUser(token.id).then(data => user.setUser(data))
        getGenus().then(data => product.setGenus(data))
        receiveProducts(null, tokenId).then(data => {
            product.setProducts(data.rows)
        })
    }, [])


    return (
        <Container className="mt-3">
            <Row>
                <Col md={4} style={{display: 'flex', flexDirection: 'column'}}>
                    <h1>Мои данные</h1>
                    <text>Фамилия: {user.user.secondName}</text>
                    <text>Имя: {user.user.firstName}</text>
                    <text>Отчество: {user.user.lastName}</text>
                    <text>Номер телефона: {user.user.phoneNumber}</text>
                    <Button style={{width: 240, height: 50, marginTop: 20}} onClick={() => setInformationVisible(true)}>Изменить данные</Button>
                    <Button style={{width: 240, height: 50, marginTop: 10}} onClick={() => setProductVisible(true)}>Продать попугая</Button>
                </Col>
                <Col md={6}>
                    <h1>Птицы на продаже</h1>
                    <Row className="d-flex">
                        {product.products?.map(product =>
                            <ProductItem key={product.id} product={product}/>
                        )}
                    </Row>
                </Col>
            </Row>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
            <AddInformation show={informationVisible} onHide={() => setInformationVisible(false)}/>
        </Container>
    );
});

export default SellerPage;