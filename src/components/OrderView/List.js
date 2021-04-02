import React from 'react';
import ProductList from './ProductList';

const List = (props) => {
    const {name, address, orderTime} = props.list.orderItem;
    const {products} = props.list;
    return (
        <div className="border p-2"> 
            <div className="row border">
                <p className="col">{name}</p>
                <p className="col">{address}</p>
                <p className="col">{orderTime}</p>
            </div>
            <div className="row border">
            <p className="col-6">Items</p>
            <p className="col-6">Price</p>
            </div>
            {
                products.map(product =>
                 <ProductList
                 key={product._id}
                 product={product}></ProductList>)
            }
           
        </div>
    );
};

export default List;