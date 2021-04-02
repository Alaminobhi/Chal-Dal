import React from 'react';
import { Link } from 'react-router-dom';

const Manage = (props) => {
    const {name, price, _id} = props.item;
    return (
        <div className="row border">
        <p className="col">{name}</p>
        <p className="col">{price}</p>
        <button className="col border" onClick={()=>props.Delete(_id)}>Del</button>
         </div>
    );
};

export default Manage;