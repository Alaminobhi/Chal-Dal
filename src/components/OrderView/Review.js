import React from 'react';

const Review = (props) => {
    const {name, price} = props.product;
    return (
        <div className="row border">
            <p className="col">{name}</p>
            <p className="col">{price}</p>
        </div>
    );
};

export default Review;