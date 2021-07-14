import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import 'date-fns';
import ProcessPayment from './../ProcessPayment/ProcessPayment';
import { useState } from 'react';
const OrderReview = () => {
  const userKey = JSON.parse(localStorage.getItem('userId'));
  const checkItem = JSON.parse(localStorage?.getItem(userKey));
    const { register, handleSubmit, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
   const [data, setData] = useState()
  const onSubmit = data => {
        setData(data);
    };
    const total = checkItem?.reduce((total, prd) => total + Number(prd.price) * prd.quantity, 0);
    return (
     <div>
         <h3 className="text-center text-success mt-5">Order Review</h3> 
         {
          data ? <ProcessPayment data={data} /> :
        <div className="bg-light text-center">
           <form className="my-2" onSubmit={handleSubmit(onSubmit)}>

            
            <div>
            <span className="mr-auto">Name: </span>
            <input name="name" defaultValue={loggedInUser?.name} ref={register({ required: true })} placeholder="Your Name" /><br/>
            {errors.name && <span className="error">Name is required</span>}
            </div><br/>


            <div>
            <span className="mr-auto">Email: </span>
            <input name="email" defaultValue={loggedInUser?.email} ref={register({ required: true })}  placeholder="Your Email"/> <br/>
            {errors.email && <span className="error">Email is required</span>}
            </div><br/>


            <div>
            <span className="mr-auto">Address: </span>
            <input name="address" ref={register({ required: true })}  placeholder="Your Address" /><br/>
            {errors.address && <span className="error">Address is required</span>}
            </div><br/>


            <div>
            <span className="mr-auto">Phone: </span>
            <input name="phone" ref={register({ required: true })}  placeholder="Your Phone Number"/><br/>
            {errors.phone && <span className="error">Phone Number is required</span>}
            </div><br/>

            <div>
            <span className="mr-auto">Payment: </span>
            <input name="price" ref={register({ required: true })}  defaultValue={ total.toFixed(2)}/><br/>
            {errors.phone && <span className="error">Payment is required</span>}
            </div>
             <br/>
            <input className="btn bg-success" type="submit" /> 
            </form> 
        </div>
        }
      </div>
    );
};

export default OrderReview;