import React from 'react';
import ProductList from './ProductList';

const List = ({list}) => {
    const {name, address, orderTime} = list.orderItem;
    const {products} = list;
    const total = products.reduce((total, prd) => total + Number(prd.price) * prd.quantity, 0);
    const totalQuantity = products.reduce((total, prd) => total + Number(prd.quantity), 0);
    return (
        <div className="p-2"> 
            <div className="row mb-2">
            <img className="col rounded-circle" style={{height: 130, width: 110}} src={list.photo} alt="" />
                <div className="col-7">
                    <p className="">{name}</p>
                    <p className="">{address}</p>
                    <p className="">{orderTime}</p>
                    <p className="">{address}</p>
                    <p className="">{orderTime}</p>
                </div>
            </div>
            <hr/>
            <div className="row">
              <p className="col-6">Items</p>
              <p className="col">category</p>
              <p className="col">quantity</p>
              <p className="col">Price</p>
            </div>
            <hr/>
            <div>
            {
                products.map(product =>
                 <ProductList
                 key={product._id}
                 product={product}>
                 </ProductList>)
            }
            </div>
            <div className="mx-2 text-center">
            <div className="row bg-secondary text-white">
                <p className="col-6">Total</p>
                <p className="col"></p>
                <p className="col-1">{totalQuantity}</p>
                <p className="col-3">৳ {total}</p>
            </div>
            </div>
        </div>
    );
};

export default List;