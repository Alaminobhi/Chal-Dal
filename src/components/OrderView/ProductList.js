import React from 'react';

const ProductList = (props) => {
    const {price, name} = props.product;
    return (
        <div className="row border">
            <p className="col-6">{name}</p>
            <p className="col-6">{price}</p>
        </div>
    );
};

export default ProductList;