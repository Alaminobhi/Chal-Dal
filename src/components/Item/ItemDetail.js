import React from 'react'
import { useSelector } from 'react-redux';

export default function ItemDetail() {

    const data = useSelector((state)=> state.books?.itemDetail[0])
    const {img, name, price, category} = data;
    // const [item, setItem] = useState({});
    // useEffect(() => {
    //     fetch('https://lit-reaches-74338.herokuapp.com/items' + id)
    //     .then(res => res.json())
    //     .then(data => setItem(data))
    // }, [id]);
    // const {img, name, price, quantity} = item;
    return (
        <div>
            <div className="mt-5 mb-5 text-center">
             <img style={{width: 250, height: 300}} src={img} alt="" />
             <h4 className="m-2">{name}</h4>
             <h6>Category: {category}</h6>
             {/* <h6>{weight}</h6> */}
             <p className="mt-2">Item price: ৳ {price}</p>
             <p className="mx-5"></p>
            </div>
        </div>
    )
}
