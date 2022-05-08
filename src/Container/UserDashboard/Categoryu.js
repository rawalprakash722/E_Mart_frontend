import React, { Component } from 'react'
import {Row,Col,Modal,ModalHeader,ModalBody,ModalFooter,Container} from  'reactstrap';
import Axios from 'axios'
import   './category.css';
import { FiSearch } from "react-icons/fi";
import {BACKEND_URL} from '../../config';

export default class Categoryu extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            category:[],  
            products:[],
            product:[],
            catName:'',
            notes:'',
            quantity:'1',
            totalprice:'',
            searchedproducts:'',
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

    componentDidMount() {
        Axios.get(BACKEND_URL+'/Cat', this.state.config)
          .then((response) => {
            console.log(response.data)
            this.setState({
              category: response.data
            })
          })
          .catch((err) => console.log(err.response));
    }

    searchproduct=(catId, catName)=>{
       Axios.get(BACKEND_URL+`/products/searchByCat/${catId}`, this.state.config)
        .then((response)=>{
            const data=response.data
            if(data[0]!=null){
                this.setState({
                    products:response.data,
                    catName:'Results for : '+ catName
                })
                console.log(this.state.catName)
            }
            else{
                this.setState({
                    catName :'No results found for : '+ catName,
                    products:[]
                })   
            }
        })
    }

    handleproduct = (productId) => {
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
                console.log(response);
                alert("Added to cart");
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

    searchbyName=(e)=>{
        if(e.target.value!=null){
            console.log(e.target.value)
            Axios.get(BACKEND_URL+`/products/searchByName/${e.target.value}`, this.state.config)
            .then((response)=>{
                const data = response.data.product;
                console.log(response.data.product)
                if(data.length!==0){
                    this.setState({
                        products:data,
                        searchedproducts:'Results for : '+ e.target.value
                    })
                }
                else{
                    this.setState({
                        products:null,
                        searchedproducts:'No Results found for : '+e.target.value
                    })
                }
            }).catch((err)=>console.log(err.response))
        }
    }


    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <Row>
                        <Col md={12}>
                            <span>What would you like to order ?{' '}
                                <input 
                                    type="text" name="search" style={{width:'22rem'}} id="search" placeholder="search products..." 
                                    onChange={this.searchbyName}/>
                                <FiSearch style={{fontSize:"30px"}}/>
                            </span>
                        </Col>
                    </Row>
                    <br/>
                    
                    <Row>
                        {this.state.category.map(catIcon =>
                        <Col>
                            <div key={catIcon._id} onClick={()=>this.searchproduct(catIcon._id, catIcon.category)} style={{cursor:'pointer'}}>
                                <img alt="catPic" 
                                    style={{ width:'50px', height:'50px'}}
                                    className="categoryList"
                                    src ={BACKEND_URL+`/pictures/${catIcon.catImg}`} id="catImg"/> 
                                <h6 className="text-center">{catIcon.category}</h6>
                            </div>
                        </Col>
                        )}
                    </Row>    
                </div>
                <hr/>
                <div className="container">
                    <h3 style={{color:'FireBrick'}}>{this.state.catName?this.state.catName:''}</h3>
                    <h3 style={{color:'FireBrick'}} className="text-left">{this.state.searchedproducts?this.state.searchedproducts:''}</h3>
                    <Row>
                        {this.state.products!=null ?                     
                        this.state.products.map((product => 
                            <div className="Col-md-4" id="product">
                                <figure className="card card-product p-2">
                                    <img alt="productPic" width='250' height='150' src={BACKEND_URL+`/pictures/${product.productimage}`}/>
                                    <figcaption class="info-wrap">
                                        <legend className="title">{product.productname}</legend>
                                        <h6 className="title">Rs. {product.price}</h6>
                                    </figcaption>
                                    <button class="btn btn-primary" onClick={()=>this.handleproduct(product._id)}>Add to cart</button>
                                </figure>
                            </div>
                            )):''}
                    </Row>
                </div>

                <Modal isOpen={this.state.modal}>
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
                </Modal>
            </div>
        )
    }
}
