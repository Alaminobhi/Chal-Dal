import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Admin = () => {
    const { register, handleSubmit} = useForm();

    const [imgURL, setImgURL] = useState(null);
    const onSubmit = data => {
        const eventData = {
            name: data.name,
            price: data.price,
            img: imgURL
        };

        const url = `https://lit-reaches-74338.herokuapp.com/addItem`;
        fetch(url,{
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(eventData)
        })
        .then(res =>console.log('server', res))
    };
    const handleUploadImg = event =>{
        const imageData = new FormData();
        imageData.set('key', 'c0b1940244d5fc981bc8e84ede322a1b');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImgURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
    <div className="bg-gradient"> 
              <h3 className="text-center">Add Product</h3>
        <div className="row p-2 m-2"><hr/>
            <div className="col-4 border border-warning ms-2 bg-light">
                <Link className="border" to="/manageItem">Manage Item</Link>
                    <br/>
                <Link className="border" to="/admin">Add Product</Link>
                <br/>
                <Link className="border" to="/orderList">Order List</Link>
            </div>
                            
            <div className="bg-secondary col-8 text-dark text-center">
            <form onSubmit = {handleSubmit(onSubmit)}>
             <p><span>Name:</span>
             <input name="name" type="text" placeholder="Add Product Name" ref={register} /></p>
             <p><span>Price:</span>
             <input name="price" type="text" placeholder="Add Product Price" ref={register}/></p>
             <p>
             <input name="img" type="file" onChange={handleUploadImg} /></p>
             <input className="btn btn-success" type="submit" />
            </form>
            </div>
         </div>
     </div>
    );
};

export default Admin;