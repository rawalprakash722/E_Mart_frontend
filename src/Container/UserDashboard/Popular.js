import React, { Component } from 'react'
import { Row, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap'
import './popular.css'
import Axios from 'axios'
import {BACKEND_URL} from '../../config';
import { Link } from 'react-router-dom';

export default class Popular extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      productname: '',
      productimage: '',
      product:[],
      notes:'',
      quantity:'1',
      popular: [],
      totalprice:'',
      modal:false,
      config: {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      },
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle(){
    this.setState({
      modal:!this.state.modal
    })
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  componentDidMount() {
    Axios.get(BACKEND_URL+'/products',this.state.config)
    .then((response)=>{
      const data = response.data;
      this.setState({popular:  data});
      console.log("data fecth");
     
    }).catch(error => console.log(error.response));
  }

  handleproduct = (productId) => {
    // if(localStorage.length===0) {
    //   alert("Please login first...")
    // }
    // else{
    this.setState({
      modal: !this.state.modal

    })
    Axios.get(BACKEND_URL+`/products/${productId}`, this.state.config)
      .then((response) => {
        const data = response.data;
        this.setState({
          product: data,
          totalprice: data.price
        });
        console.log("data fecth");
      }).catch(error => console.log(error.response));
    // }
  }

  addCart(){
    var token=localStorage.getItem('token')
    if(token!=null){
    //   if(localStorage.getItem('token'!=null)){
        
        Axios.post(BACKEND_URL+`/cart/`,
          {
            product: this.state.product._id,
            totalprice: (this.state.totalprice * this.state.quantity),
            notes: this.state.notes,
            quanity: this.state.quantity
          }, this.state.config)
          .then((response) => {
            
            alert("Added to cart");
            console.log(response);
            this.setState({
              modal: !this.state.modal
        
            }
            
            )
          }).catch((err) => console.log(err.response));
      }
    else{
        alert("Please login to add cart");
      }
}

    render() {
        return (
           <div className="container">
             <div>
               <p><span className='h1' style={{color:'DarkOrange'}}>ITEMS FOR YOU</span></p>
               <hr></hr>
             </div>
              
            <Row>
              {
                this.state.popular.map((pop => 
                  <div key={pop._id} className="card" style={{width:'22rem', marginBottom:'20px', marginTop:'20px', marginLeft:'10px'}} id="product">
                    
                    <figure className="card card-product p-2">
                    <a href={'/single/prd/'+pop._id}>
                        <img alt="productPic" width='250' height='150' src={BACKEND_URL+`/pictures/${pop.productimage}`}/>
                        <figcaption className="info-wrap">
                          <legend className="title">{pop.productname}</legend>
                          <h6 className="title">Rs. {pop.price}</h6>
                        </figcaption>
                        </a>
                        <button className="btn btn-primary" onClick={()=>this.handleproduct(pop._id)}>Add to cart</button>
                    </figure>
                   
                  </div>
                  ))
              }
            </Row>
           

            <Modal isOpen={this.state.modal}>
              <form>
              <ModalHeader toggle={this.toggle}>Item : {this.state.product.productname}<br/>
                      Price : Rs.{this.state.product.price}
              </ModalHeader>
              <ModalBody>
                <p>Delivery Address</p>
                <textarea id="notes" className="col-md-10" value={this.state.notes} placeholder="Delivery Address" name="notes" onChange={this.handleChange}></textarea>
                <hr/>
                <p>Add quantity</p>
                <input type="number" pattern="[0-9]*" name="quantity" min={1} value={this.state.quantity} onChange={this.handleChange} min="1" max="100" />
              </ModalBody>
              <ModalFooter>
                <Container id="ftr">
                  <button className="btn btn-lg btn-success" id="btnbag" onClick={() => this.addCart(this.state.product._id)}>Add to cart</button>
                </Container>
              </ModalFooter>
              </form>
            </Modal>
          </div>
        )
  }
}
