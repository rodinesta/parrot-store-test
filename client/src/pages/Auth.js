import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Nav, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {loginFunc, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await loginFunc(login, password)
            } else {
                data = await registration(login, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate(HOME_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }


    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите логин"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Form className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
                            </div>
                            :
                            <div>
                                <NavLink to={LOGIN_ROUTE}>Авторизация</NavLink>
                            </div>
                        }
                        <Button onClick={click}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
                    </Form>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;