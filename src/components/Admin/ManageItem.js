import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Manage from './Manage';

const ManageItem = () => {

    const [items, setItems] = useState([]);

        useEffect(() => {
            fetch('https://lit-reaches-74338.herokuapp.com/items')
            .then(res => res.json())
            .then(data => setItems(data))
        }, []);
    


    const Delete =(id)=>{
        if(window.confirm('delete'))
        {
         fetch('https://lit-reaches-74338.herokuapp.com/deleteItem/'+id,{
             method: "DELETE",
             header: {'Content-type':'application/json'}
         })
        }
    }

    return (
        <div>
            
            <h3 className="text-center">Manage Item</h3>
        <div className="row p-2 m-2">
            <div className="col-4 border border-warning ms-2">
               <Link className="border" to="/manageItem">Manage Item</Link>
                    <br/>
                <Link className="border" to="/admin">Add Product</Link>
                <br/>
                <Link className="border" to="/orderList">Order List</Link>
            </div>
            <div className="bg-light border col-8 text-dark text-center">
            <div className="row">
            <p className="col">Items Name</p>
            <p className="col">Price TK</p>
            <p className="col">Delete</p>
           </div><hr/>
            {
                items.map(item => <Manage item={item} Delete={Delete}>

                </Manage>)
            }
            </div>
            </div>
        </div>
    );
};

export default ManageItem;