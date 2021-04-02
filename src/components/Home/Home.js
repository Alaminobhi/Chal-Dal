import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import { getDataKey } from '../OrderView/databaseManager';


const Home = () => {
    const [items, setItems] = useState([]);
    const [addItem, setAddItem] = useState([]);

    useEffect(() => {
        fetch('https://lit-reaches-74338.herokuapp.com/items')
        .then(res => res.json())
        .then(data => setItems(data))
    }, [])

    const handleAddItem = item =>{
    let newAdd;
    newAdd = [...addItem, item];
    setAddItem(newAdd);
    localStorage.setItem(getDataKey(), JSON.stringify(newAdd));
    }
    return (
        <div className="bg-light container row m-2 row-cols-1 row-cols-sm-2 row-cols-lg-3">
            {
             items.map(item => <Item 
                key={item._id}
                handleAddItem={handleAddItem}
                item={item}
                ></Item>)
            }

        </div>
    );
};

export default Home;