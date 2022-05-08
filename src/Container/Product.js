import React, { Component } from 'react'
import { Button, FormGroup, Label, Row, Input, Modal, ModalHeader, ModalBody, ModalFooter, Col } from 'reactstrap'
import axios from 'axios'
import Listproducts from './ListProduct'
import {BACKEND_URL} from '.././config';



export default class Addproduct extends Component {

    constructor(props) {
        super(props)

        this.state = {
            _id: null,
            productname: null,
            price : null,
            productimage: null,
            store:[],
            categorys:[],
            resSelect:'',
            catSelect:'',
            modal:false,
            imgPreview:null,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            selectedFile: null,
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle(){
        this.setState({
            modal:!this.state.modal
        })
    }

    componentDidMount() {
        axios.get(BACKEND_URL+'/stores',this.state.config)
        .then((response)=>{
          const data = response.data;
          this.setState({
              store: data,
              resSelect:data[0]._id
            });        
        }).catch(error => console.log(error.response));

        axios.get(BACKEND_URL+'/Cat', this.state.config)
        .then((response)=>{
            const data = response.data;
            this.setState({
                categorys:data,
                imgPreview:data.catImg,
                catSelect:data[0]._id
            });
        }).catch(err=>console.log(err.response));
      }
    
   handleFileSelect  = (e) =>{
        this.setState({
            selectedFile: e.target.files[0],
            imgPreview:URL.createObjectURL(e.target.files[0])
        })
    }

    handleChange = (e)  =>{
        this.setState({
            [e.target.name]: e.target.value 
        })
    }
  
    addproduct = () => {
        const data = new FormData()
        data.append('imageFile', this.state.selectedFile)
        axios.post(BACKEND_URL+'/upload', data, this.state.config)
            .then((response) => {
                this.setState({
                    productimage: response.data.filename
                })
                axios.post(BACKEND_URL+'/products', 
                {
                    productname:this.state.productname,
                    price:this.state.price,
                    productimage:this.state.productimage,
                    store:this.state.resSelect,
                    category:this.state.catSelect,
                }, this.state.config)
                    .then((response) => {
                        console.log(response);
                        alert(response.data.message)
                        window.location.reload();
                    })
                    .catch((err) => console.log(err.response))
            }).catch((err) => console.log(err.response))
    }

    render() {      
        if(localStorage.getItem('token') && localStorage.getItem('role')==="admin"){
        return (
            <>
         
            <div className="container">
                <Row>
                    <Col md={6} className="text-left mt-4">
                        <h2>Add Product</h2>
                    </Col>
                    {/* <Col md={6} className="text-right mt-4">
                        <Button color='primary' onClick={this.toggle}>
                            <MdAdd style={{fontSize:"30px", color:"white"}} />
                            Add product Category
                        </Button>
                    </Col> */}
                </Row>
                <hr/>
                <form className="col-10">
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label for='productname'>
                                    <legend style={{fontSize:18}}>Product Name</legend>
                                </Label>
                                <Input type='text' id="productname" name='productname' onChange={this.handleChange} required/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for='productprice'>
                                    <legend style={{fontSize:18}}>Product price</legend>
                                </Label>
                                <Input id='productprice' name='price' type="number" min="0" oninput="validity.valid||(value='');"
                                    customInput={Input} 
                                    onChange={ this.handleChange}
                                    thousandSeparator 
                                    required
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <FormGroup className="mt-1">
                                <Label for='resOption'>
                                    <legend style={{fontSize:18}}>Choose Store: </legend>
                                </Label>
                                <select onChange={this.handleChange} value={this.state.resSelect} name='resSelect' id='resOption' style={{width:200, textAlign:'center'}}>
                                    {
                                        this.state.store.map(option=>
                                            <option key={option._id} value={option._id}>{option.store_name}</option>
                                        )
                                    }
                                </select>
                            </FormGroup>
                        </Col>
                        <Col md={4} className="mt-1">
                            <FormGroup>
                                <Label for='catOption'>
                                    <legend style={{fontSize:18}}>Choose Category: </legend>
                                </Label>
                                <span> </span>
                                <select onChange={this.handleChange} value={this.state.catSelect} name='catSelect' id='catOption' style={{width:200, textAlign:'center'}}>
                                {
                                    this.state.categorys.map(option=>
                                        <option key={option._id} value={option._id}>{option.category}</option>
                                    )
                                }
                                </select>
                                {' '}
                            </FormGroup>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md={3}>
                            <FormGroup style={{display: "ruby"}}>
                                <Label className="btn btn-primary float-left" htmlFor="filePicker">Upload image for Product</Label>
                                <Input id="filePicker" style={{visibility:"hidden"}} type='file' name='product_image' onChange={this.handleFileSelect}/>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <img alt="Img Preview" style={{width:200}} src={this.state.imgPreview}/><hr/>
                         </Col>
                    </Row>
                    <Button color='danger' onClick={this.addproduct}>Add Product</Button>
                <br/>
                </form>
              <Listproducts />

        
            </div>
            </>
            )
        }
        else{
            return(
                <h1>Not admin</h1>
            )
        }
    }
          
    }
    
