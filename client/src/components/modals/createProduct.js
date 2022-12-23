import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {createProduct, getGenus} from "../../http/productAPI";
import {observer} from "mobx-react-lite";
import {toFormData} from "axios";
import jwtDecode from "jwt-decode";

const CreateProduct = observer(({show, onHide}) => {
    const {product} = useContext(Context)

    const [title, setTitle] = useState('')
    const [information, setInformation] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const token = jwtDecode(localStorage.getItem('token'))
    const selectFile = e => {
        setFile(e.target.files[0])
    }

    useEffect(() => {
        getGenus().then(data => product.setGenus(data))
    }, [])

    const addProduct = () => {
        // const selectedGenus = product.selectedGenus.id

        const formData = new FormData()
        formData.append('title', title)
        formData.append('information', information)
        formData.append('price', `${price}`)
        formData.append('genuId', product.selectedGenus.id)
        formData.append('userId', token.id)
        formData.append('img', file)
        createProduct(formData).then(data => onHide())
        // await createProduct(title, price, information, selectedGenus, file).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить попугая
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Заголовок"}
                        value={title}
                        onChange={e => setTitle(e.target.value)}/>
                    <Dropdown className="mt-2">
                        <Dropdown.Toggle>{product.selectedGenus.title || "Семейство"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.genus.map(genus =>
                                <Dropdown.Item
                                    key={genus.id}
                                    onClick={() => product.setSelectedGenus(genus)}>
                                    {genus.title}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className="mt-2"
                        style={{height: 300}}
                        placeholder={"Информация"}
                        value={information}
                        onChange={e => setInformation(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2" type="number"
                        placeholder={"Цена"}
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                    />
                    <Form.Control
                        className="mt-2"
                        type="file"
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addProduct}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProduct;