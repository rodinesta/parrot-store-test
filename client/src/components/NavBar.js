import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SELLER_ROUTE} from "../utils/consts";

const NavBar = () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

        return (
            <div>
                <Navbar expand="md" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">ParrotStore</Navbar.Brand>
                        {user.isAuth ?
                            <Nav>
                                <Nav.Link href={SELLER_ROUTE}>Профиль</Nav.Link>
                                <Button onClick={() => logOut()}>
                                    Выйти
                                </Button>
                            </Nav>
                            :
                            <Nav>
                                <Nav.Link href={LOGIN_ROUTE}>Войти</Nav.Link>
                                <Button href={REGISTRATION_ROUTE}>Зарегистрироваться</Button>
                            </Nav>
                        }
                    </Container>
                </Navbar>
            </div>
        );
};

export default NavBar;