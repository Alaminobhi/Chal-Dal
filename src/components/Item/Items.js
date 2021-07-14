import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadBookAsync } from '../../redux/slices/productSlice';
import Item from '../Item/Item';


const Items = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadBookAsync())   
    }, [])
    
    const items= useSelector((state)=> state.books.dataShow[0])
    
    // const history = useHistory()
    // const handleProceedCheckout = () => {
    //     history.push('/orderReview');
    // }
   
    
    return (
        <div className="mt-5 mb-5">
            <div className="row mt-5 mb-5 m-2 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
            {
             items | items?.length ? items?.map(it => <Item 
                key={it._id}
                item={it}
                ></Item>) : <div className="text-center"> <h2>আপনার জন্য কোন ডাটা নাই!!!</h2> </div>
            }
            </div>
       
        </div>
    );
};

export default Items;