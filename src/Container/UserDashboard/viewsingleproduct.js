import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row } from 'reactstrap'
import {BACKEND_URL} from '../../config';
export default function Viewsingleproduct() {

  const { id } = useParams();

   
    const [prdet,setprddet]=useState([null]);
    useEffect(()=>{
        if(prdet && prdet._id===id){
            return
        }
        getUser()
    })
    function getUser() {
        axios.get(BACKEND_URL+'/products/product/singleshow/'+id).then((response)=>{
            console.log(response)
            setprddet(response.data.data)
        }).catch((response)=>{
            console.log(response)
        })
    }

 

   

    

 if(prdet!=null){

  return (
    <div>
      <Row>
              
                
                  <div key={prdet._id} className="card" style={{width:'22rem', marginBottom:'20px', marginTop:'20px', marginLeft:'10px'}} id="product">
                 
                    <figure className="card card-product p-2">
                        
                        <img alt="productPic" width='250' height='150' src={BACKEND_URL+`/pictures/${prdet.productimage}`}/>
                        <figcaption className="info-wrap">
                          <legend className="title">{prdet.productname}</legend>
                          <h6 className="title">Rs. {prdet.price}</h6>
                        </figcaption>
                        {/* <button className="btn btn-primary" onClick={()=>this.handleproduct(prdet._id)}>Add to cart</button> */}
                    </figure>
               
                  </div>
                  
              
            </Row>


    </div>
  );
}
else{
    return(
        <p>sorry</p>
    )
}
}
