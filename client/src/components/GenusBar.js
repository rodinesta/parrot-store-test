import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const GenusBar = observer(() => {
    const {product} = useContext(Context)
    return (
        <ListGroup>
            {product.genus?.map(genus =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={genus.id === product.selectedGenus.id}
                    onClick={() => product.setSelectedGenus(genus)}
                    Key={genus.id}>
                    {genus.title}
                </ListGroup.Item>
            )}
        </ListGroup>
    );

});

export default GenusBar;