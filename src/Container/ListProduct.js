import React, { Component } from 'react'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';
import axios from 'axios'
import {BACKEND_URL} from '.././config';

export default class Listproducts extends Component {
    constructor(props) {
        super(props)
        this.state = {
          _id: '',
          productname: '',
          productimage: '',
          price:'',
          imgpreview:null,
          popular: [],
          product: [],
          categorys:[],
          store:[],
          resSelect:'',
          catSelect:'',
          modal : false,
          isupdated: false,
          config: {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          },
          selectedFile: null,
        }
        this.toggle = this.toggle.bind(this);
    } 
             
    componentDidMount() {
      axios.get(BACKEND_URL+'/products',this.config)
        .then((response)=>{
          const data = response.data;
          this.setState({popular:  data});
          this.setState({product: data});
          console.log(this.state.popular);
        }).catch(error => console.log(error.response));

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
                imgpreview:data.catImg,
                catSelect:data[0]._id
            });
        }).catch(err=>console.log(err.response));
    }

    toggle=()=>{ 
      this.setState({
        modal: !this.state.modal
    })}
        
    handleFileSelect = (e) => {
      this.setState({
        selectedFile: e.target.files[0],
        imgpreview: URL.createObjectURL(e.target.files[0])
      })
    }
     
    uploadFile = (e) => {
      e.preventDefault();
      const data = new FormData()
      data.append('imageFile', this.state.selectedFile)
      axios.post(BACKEND_URL+'/upload', data, this.state.config)
        .then((response) => {
          this.setState({
            productname: this.state.productname,
            price:this.state.price,
            productimage: response.data.filename
          })
        }).catch((err) => console.log(err.response))
    }
     
       
    handleChange = (e)  =>{
      this.setState({
        [e.target.name]: e.target.value 
      })
    }

    deleteproduct(productId){
      axios.delete(BACKEND_URL+`/products/${productId}`, this.state.config)
      .then((response) => {
        console.log(response);
        window.location.reload()   
      })
      .catch(error => console.log(error.response));
    }

    handleEdit = (productId) => {
      this.setState({
        modal: !this.state.modal
      });
      axios.get(BACKEND_URL+`/products/${productId}`,this.state.config)
      .then((response)=>{
        const data = response.data;
          this.setState({
            product: data,
            resSelect:data.store._id,
            catSelect:data.category._id,
            imgpreview:BACKEND_URL+`/pictures/${data.productimage}`
          });    
        console.log("data fecth"+data);
        })
      .catch(error => console.log(error.response));
    }

    handleupdate = (e) =>{
      this.setState({
        product: { ...this.state.product, [e.target.name]: e.target.value }
      })
    }
     
    updateproduct = (productId) => {
      const data = new FormData()
      data.append('imageFile', this.state.selectedFile)
      axios.post(BACKEND_URL+'/upload', data, this.state.config)
        .then((response) => {
          this.setState({
            productimage: response.data.filename
          })
          axios.put(BACKEND_URL+`/products/${productId}`, 
            { 
              productname: this.state.product.productname, 
              price: this.state.product.price,
              productimage: this.state.productimage, 
              store: this.state.resSelect,
              category: this.state.catSelect
            }, this.state.config)
          .then((response) => {
            alert("Product updated successfully")
            console.log(response.data)
            window.location.reload();
          })
          .catch((err)=>console.log(err.response))
        })
        .catch((err) => console.log(err.response))
    }
    
    render() 
    {
        return (
          
            <Table hover>
            <thead>
            <h1>Store</h1>
              <tr>
                <th>Category</th>
                <th>Product Name</th>
                <th>Product price</th>
                <th>Product image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.popular.map(pop => 
                <tr key={pop._id}>
                  <td>{pop.category.category}</td>
                  <td>{pop.productname}</td>
                  <td>{pop.price}</td>
                  <td>
                    <img alt="productPic" src={BACKEND_URL+`/pictures/${pop.productimage}`} style={{height: "50px",width:"50px"}}/>
                  </td>
                  <td>
                    <a className="btn btn-primary" onClick={() => this.handleEdit(pop._id)}>Update</a>
                  </td>
                  <td>
                    <a onClick={() => this.deleteproduct(pop._id)} className="btn btn-danger" href="">Delete</a>
                  </td>
                </tr>
                )
              }
    
              <Modal isOpen={this.state.modal}>
                <ModalHeader toggle={this.toggle}><legend><h3>Update Product</h3></legend></ModalHeader>
                <ModalBody>
                  <form>
                    <div className="form-group">
                      <label for='productname'> Product Name</label>
                      <input type="text" name="productname" className="form-control" 
                        value ={this.state.product.productname} onChange={this.handleupdate}/>
                    </div>
                    <div className="form-group">
                      <label for='price'>Product price</label>
                      <input type="text" name="price" className="form-control"
                        value={this.state.product.price} onChange={this.handleupdate}  />
                    </div>
                    <div className="form-group">
                        <label for='resOption'>
                            <legend style={{fontSize:16}}>Choose Product: </legend>
                        </label>
                        {' '}
                        <select onChange={this.handleChange} value={this.state.resSelect} name='resSelect' id='resOption' style={{width:200, textAlign:'center'}}>
                            {
                              this.state.store.map(option=>
                                  <option key={option._id} value={option._id}>{option.store_name}</option>
                              )
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label for='resOption'>
                            <legend style={{fontSize:16}}>Choose Product Category: </legend>
                        </label>
                        {' '}
                        <select onChange={this.handleChange} value={this.state.catSelect} name='catSelect' id='catOption' style={{width:200, textAlign:'center'}}>
                          {
                            this.state.categorys.map(option=>
                                <option key={option._id} value={option._id}>{option.category}</option>
                            )
                          }
                        </select>
                    </div>
                    <img className='img-thumbnail' width='200' 
                      src={this.state.imgpreview} alt="productimg" />
                    <Input type='file' name='productimage' id='productimg'
                      onChange={this.handleFileSelect} value={this.state.image}/> 
                    <Button className="btn btn-primary btn-block" 
                      onClick={() => this.updateproduct(this.state.product._id)}>Update</Button>
                  </form>     
                </ModalBody>
                <ModalFooter></ModalFooter>
              </Modal>
            </tbody>
          </Table>
        )
    }
}
