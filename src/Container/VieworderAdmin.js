import React,{ Component } from "react";

import { Table} from 'reactstrap';
import axios from 'axios';
import {BACKEND_URL} from '.././config';

// import { Button } from "bootstrap";


class Vieworderadmin extends Component{
    state = {
        
        product : '',
        user : '',
        quanity : '',
        orderDate:'',
        totprice: '',
        totAmt:0,
        orders: [],
        viewOrder:[],
        config : {
            headers : {'authorization': `Bearer ${localStorage.getItem('token')}`}
        }
    }

    componentDidMount(){
        axios.get(BACKEND_URL+"/orders/show/admin",this.state.config)
        .then((response)=>{
            const data = response.data;
            this.setState({viewOrder:data});
            console.log(this.state.viewOrder);
          }).catch((err)=>console.log(err.response));
    }
    deleteOrder=(oid)=>{
      axios.delete(BACKEND_URL+'/viewod/delete/'+oid).then((response)=>{
          console.log(response)
          alert(response.data.message)
          window.location.reload()
      }).catch((err)=>{
          console.log(err)

      })
  }
    
    

       
    render(){
      if(localStorage.getItem('token') && localStorage.getItem('role')==="admin"){
        return(
            <div id="prd">{
              
                  
                        
                    <div className="col-lg-12" id="prd">
                     
                        <div className="card"> 
                        <Table>
                    <thead>
                        <h1>Orders by user</h1>
                    <tr>
                        
                      <th><h5>product Name</h5></th>
                      <th><h5>Quantity</h5></th>
                      <th><h5>Price</h5></th>
                      <th><h5>Total Price</h5></th>
                      <th><h5>Email</h5></th>
                      <th><h5>Full Name</h5></th>
                      <th><h5>Contact</h5></th>
                      <th><h5>Delivery Address</h5></th>
                      <th><h5>Delete</h5></th>

                    </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.viewOrder.map(listItem=>{
                          return(
                            <tr key={listItem._id}>
                              
                               
                              <td><h6>{listItem.product.productname}</h6></td>
                              <td><h6>{listItem.quanity}</h6></td>
                              <td><h6>{listItem.product.price}</h6></td>
                              <td><h6>{listItem.product.price*listItem.quanity}</h6></td>
                              <td><h6>{listItem.user.email}</h6></td>
                              <td><h6>{listItem.user.fullname}</h6></td>
                              <td><h6>{listItem.user.contact}</h6></td>
                              <td><h6>{listItem.notes}</h6></td>
                              <td><h6><button className="btn btn-danger" onClick={this.deleteOrder.bind(this, listItem._id)}>Delete</button></h6></td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                    
                  </Table>
                        
                            
                        </div>
                        </div>
                        
                            
                  
                }
                </div>
              
    )}
    else{
      return(
        <div>
          <h1>You are not admin</h1>
        </div>
      )
    }
        
    }
}
export default Vieworderadmin;