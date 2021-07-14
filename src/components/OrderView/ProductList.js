import React from 'react';

const ProductList = ({product}) => {
    const {price, category, quantity, name} = product;
    return (
        <div>
            <div className="row">
                <p className="col-6">{name}</p>
                <p className="col">{category}</p>
                <p className="col">{quantity}</p>
                <p className="col">৳ {price}</p>
            </div>
            <hr/>
        </div>
    );
};

export default ProductList;