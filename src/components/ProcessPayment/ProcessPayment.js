import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SimpleCardPayment from './SimpleCardPayment';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51Ie1SzCswzOxEPDckaPFL4xYIDI4r3FrDGbrJr20W1V9J6WvW8TpG1Kenr5XWZfIcrhfc8B8GDrFOybo9BMjehEX00EcPiRYXp');


const ProcessPayment = ({data}) => {
    return (
       
    <Elements stripe={stripePromise}>
    <SimpleCardPayment data={data}></SimpleCardPayment>
    </Elements>

    );
};

export default ProcessPayment;