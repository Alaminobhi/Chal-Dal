import React, { useEffect, useState } from 'react';
import List from './List';

const OrderList = () => {
    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
        fetch('https://lit-reaches-74338.herokuapp.com/orderList')
        .then(res => res.json())
        .then(data => setOrderList(data))
    }, [])
    return (
        <div className="mt-5">
             <h3 className="text-center">Order List</h3>
        <div className="p-2 m-2">
            
            <div className="bg-light border text-dark text-center">
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