import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {createInformation} from "../../http/userAPI";
import jwtDecode from "jwt-decode";
import {SELLER_ROUTE} from "../../utils/consts";

const addInformation = observer(({show, onHide}) => {

    const token = jwtDecode(localStorage.getItem('token'))
    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const addInfo = async () => {
        createInformation(token.id, firstName, secondName, lastName, phoneNumber).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить информацию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Фамилия"}
                        value={secondName}
                        onChange={e => setSecondName(e.target.value)}/>
                    <Form.Control
                        className="mt-2"
                        placeholder={"Имя"}
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}/>
                    <Form.Control
                        className="mt-2"
                        placeholder={"Отчество"}
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}/>
                    <Form.Control
                        className="mt-2"
                        placeholder={"Номер телефона"}
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addInfo} href={SELLER_ROUTE}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default addInformation;