import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Item = (props) => {
    const {img, name, price, _id} = props.item;
    return (
        <Card style={{ width: '18rem' }}
        className="bg-light text-dark text-center g-2 p-2">
            <Card.Img variant="top" src={img} alt="" />
                <Card.Title>{name}</Card.Title>
            <Card.Body className="row border text-dark m-2">
                <Card.Text >TK {price}</Card.Text>
                <Link className="col" onClick={() => props.handleAddItem(props.item)} to="/checkOut"> Order Now </Link>
            </Card.Body>
        </Card>
    );
};

export default Item;