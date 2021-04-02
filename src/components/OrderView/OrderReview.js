import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { getDataKey, processOrder } from './databaseManager';
import 'date-fns';


const OrderReview = () => {

    const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const onSubmit = data => {
    const checkItem = JSON.parse(localStorage.getItem(getDataKey()));
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
         alert('your order placed SuccessFully');
       }
     })
    };
    return (
     <div>
          <h3 className="text-center">Order Review</h3>
       <div className="row p-2 m-2"><hr/>
       <div className="col-4 border border-warning ms-2">
        <Link className="border" to="/orderReview">Order Review</Link>
        <br/>
        <Link className="border" to="/orderList">Order List</Link>
       </div>
                
        <div className="bg-light col-8 text-dark text-center">
           <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

            
            <div className="col-sm-10">
            <span>Name: </span>
            <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
            {errors.name && <span className="error">Name is required</span>}
            </div><br/>


            <div class="col-sm-10">
            <span>Email: </span>
            <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })}  placeholder="Your Email"/>
            {errors.email && <span className="error">Email is required</span>}
            </div><br/>


            <div class="col-sm-10">
            <span>Address: </span>
            <input name="address" ref={register({ required: true })}  placeholder="Your Address" />
            {errors.address && <span className="error">Address is required</span>}
            </div><br/>


            <div class="col-sm-10">
            <span>Phone: </span>
            <input name="phone" ref={register({ required: true })}  placeholder="Your Phone Number"/>
            {errors.phone && <span className="error">Phone Number is required</span>}
            </div><br/>

            <div class="col-sm-10">
            <span>Payment: </span>
            <input name="phone" ref={register({ required: true })}  placeholder="Enter your Payment"/>
            {errors.phone && <span className="error">Payment is required</span>}
            </div>
             <br/>
            <input type="submit" /> 
            </form> 
        </div>
     </div>
     </div>
    );
};

export default OrderReview;