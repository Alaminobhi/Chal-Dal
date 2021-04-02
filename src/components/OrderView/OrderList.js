import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import List from './List';

const OrderList = () => {
    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
        fetch('https://lit-reaches-74338.herokuapp.com/orderList')
        .then(res => res.json())
        .then(data => setOrderList(data))
    }, [])
    return (
        <div>
             <h3 className="text-center">Order List</h3>
        <div className="row p-2 m-2">
            <div className="col-4 border border-warning ms-2">
                <Link className="border" to="/orderReview">Order Review</Link>
                <br/>
                <Link className="border" to="/orderList">Order List</Link>
            </div>
            <div className="bg-light border col-8 text-dark text-center">
            {
                orderList.map(list => <List key={list._id} list={list}>

                </List>)
            }
            </div>
        </div>
        </div>
    );
};

export default OrderList;