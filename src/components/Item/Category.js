import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allCategory, categoryItem } from '../../redux/slices/productSlice';

const Category = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allCategory());
    }, [])
    const data = useSelector((state)=> state.books.categoryList[0]);
    return (
        <div>
        <ul className="">
            {
             data?.map(it => 
             <div className="m-2 hov">
               <div className="my-2" key={it.id} onClick={()=> dispatch(categoryItem(it))}>
                 <h2>{it}</h2>
               </div>
             </div>)
            }
            </ul>
        </div>
    );
};

export default Category;