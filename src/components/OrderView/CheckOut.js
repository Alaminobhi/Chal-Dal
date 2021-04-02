import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Review from './Review';
import { getDataKey, getDatabaseCart } from '../OrderView/databaseManager';
import { Link } from 'react-router-dom';

const CheckOut = () => {

    const checkItem = JSON.parse(localStorage.getItem(getDataKey()));

    const history = useHistory()

    const handleProceedCheckout = () => {
        history.push('/orderReview');
    }

    const total = checkItem.reduce((total, prd) => total + Number(prd.price), 0);
    return (
     <div className="border p-2">
         <div className="row">
            <h3 className="col m-2">CheckOut List </h3> <Link to="/home">Another Item Add</Link>
            </div>
        <div className="bg-light border text-dark text-center g-2 p-2">
        <div className="row">
            <p className="col">Items Name</p>
            <p className="col">Price TK</p>
           </div><hr/>
            {
             checkItem.map(pd => <Review
            key={pd._id}
             product={pd}></Review>)
            }
            <hr/>
        <div className="row">
            <p className="col">Total TK</p>
            <p className="col">{total}</p>
        </div>
        </div> <br/>
        <div className="nav justify-content-end">
        <button className="btn btn-primary" onClick={handleProceedCheckout}>Proceed Checkout</button>
        </div>
     </div>
    );
};

export default CheckOut;