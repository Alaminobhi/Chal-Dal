import React from 'react';
import { useDispatch } from 'react-redux';
import { addToShop, removeShop, removeOneItem } from '../../redux/slices/shopSlice';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiFillDelete } from "react-icons/ai";

const Review = ({it}) => {
    const {name, price, img, quantity} = it;
      const totalPrice = (quantity * price).toFixed(2);
      const dispatch = useDispatch()
    return (
        <div>
          <div className="row">
          <div className="col mx-3">
              <h5 onClick={() => dispatch(removeShop(it))}><AiOutlineMinusCircle/></h5>
              <h5>{quantity}</h5>
              <h5 onClick={() => dispatch(addToShop(it))}><AiOutlinePlusCircle/></h5>
          </div>
            <p className="col mt-3"> 
              <img style={{width: 35, height: 40}} src={img} alt="" />
            </p>
            <p className="col-4 mt-3">{name?.slice(0, 20)}<br/>৳ {price}</p>
            <p className="col mt-3">৳ {totalPrice}</p>
          <h4 className="col mx-3 mt-3" onClick={() => dispatch(removeOneItem(it))}><AiFillDelete/></h4>  
        </div>
        <hr/>
        </div>
    );
};

export default Review;