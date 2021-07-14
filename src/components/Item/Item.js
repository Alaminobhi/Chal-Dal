import {React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { addToShop, removeShop} from '../../redux/slices/shopSlice';
import './Blog.css';
import { itemOne } from '../../redux/slices/productSlice';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const Item = ({item}) => {
    const {img, name, price, _id} = item;
    const dispatch = useDispatch();
    const userKey = JSON.parse(localStorage.getItem('userId'));
    const data = JSON.parse(localStorage?.getItem(userKey));
    const shopData = useSelector(state=> state.shop.shop)

    const [quantity, setQuantity] = useState();
    const [totalPrice, setTotalPrice] = useState(price);
    useEffect(() => { addShop(_id) }, [shopData])

    const addShop = (item) =>{
    const QItem = (shopData.length ? shopData : data)?.find(sh => sh._id === item);
    setQuantity(QItem?.quantity);
    setTotalPrice(QItem?.price * QItem?.quantity);
    }

    return (
        <div className="col text-center animate__animated animate__bounce">
            <div className="m-2 item bg-white text-center">
            <div className="box">
                <div className="cover">
                { quantity ?
                <div>
                <h2 className="text-danger">৳ {totalPrice.toFixed(2)}</h2>
                <br/>
                <div className="row m-2 text-light">
                    <h4 className="col-1" onClick={() => dispatch(removeShop(item))}><AiOutlineMinusCircle/></h4>
                    <h4 className="col mt-2">{quantity}</h4>
                    <h4 className="col-1 mr-3" onClick={() => dispatch(addToShop(item))}><AiOutlinePlusCircle/></h4>
                </div> 
                <br/>
                <Link className="text-white" onClick={() => dispatch(itemOne(_id))} to={"/itemDetail/" + _id}><h3>Details..</h3></Link>
                </div>
                :
                <div className="" onClick={() => dispatch(addToShop(item))}> <h4 className="mt-2 mb-4 text-danger">Add To <br/> <br/> Shopping <br/> <br/> Cart</h4> <Link className="text-white mt-5" onClick={() => dispatch(itemOne(_id))} to={"/itemDetail/" + _id}><h3>Details..</h3></Link> </div>
                }
                </div>
             <img style={{height: 150, width: 140}} src={img} alt="" />
             <p className="mx-1">{name?.slice(0, 26)}...</p>
             {/* <h6>{weight}</h6> */}
             <p className="text-danger">৳ {price}</p>
             </div>
             </div>  
             { quantity ?
             <div className="row mx-3 bg-primary rounded">
                 <h5 className="col-2 text-light" onClick={() => dispatch(removeShop(item))}><AiOutlineMinusCircle/></h5>
                 <h5 className="col text-light">{quantity}</h5>
                 <h5 className="col-2 mr-3 text-light" onClick={() => dispatch(addToShop(item))}><AiOutlinePlusCircle/></h5>
             </div> :
             <div className="mx-3 bg-primary rounded" onClick={() => dispatch(addToShop(item))}> <p className="m-2 p-1 text-white">Add to shop</p> </div>
             }
           
        </div>
    );
};

export default Item;