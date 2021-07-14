import React, { useState } from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { processOrder } from '../OrderView/databaseManager';
import { useContext } from 'react';
import { UserContext } from './../../App';

const SimpleCardPayment = ({data}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentErr, setPaymentErr] = useState(null);

  const [paymentSuccess, setPaymentSuccess] = useState(null)
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const userKey = JSON.parse(localStorage.getItem('userId'));
  const checkItem = JSON.parse(localStorage?.getItem(userKey));

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaymentErr(error.message);
      setPaymentSuccess(null);
    } else {
      setPaymentSuccess(paymentMethod);
      setPaymentErr(null);
      orderSent(data)
    }
  };
     
    const orderSent = (data) =>{
      const orderDetails = {...loggedInUser, products: checkItem, orderItem: data, date: new Date()};
      fetch('https://lit-reaches-74338.herokuapp.com/addOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
      })
      .then(res => res.json())
      .then(data =>{
        if(data){
          processOrder();
          localStorage.setItem(userKey, JSON.stringify([]));
          alert('your order placed SuccessFully');
        }
      })
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
        {
            paymentErr && <p style={{color: 'red'}}>{paymentErr}</p>
        }
        {
            paymentSuccess && <p style={{color: 'green'}}>Your Payment was Successful</p>
        }
    </div>
  );
};
export default SimpleCardPayment;