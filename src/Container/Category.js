import React, { Component } from 'react'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter,Input, FormGroup, Label } from 'reactstrap';
import axios from 'axios'

import { MdAdd } from "react-icons/md";
import {BACKEND_URL} from '.././config';

export default class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
          categories: [],
          category:[],
          modal : false,
          modal1:false,
          imgPreview:null,
          selectedFile: null,
          config: {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          },
        }
        this.toggle = this.toggle.bind(this);
    } 
             
    componentDidMount() {
      axios.get(BACKEND_URL+'/Cat', this.state.config)
        .then((response)=>{
            const data = response.data;
            this.setState({categories:data});
            console.log(data)
        }).catch(err=>console.log(err.response));
    }

    toggle=()=>{ 
      this.setState({
        modal: !this.state.modal
    })}

    toggle1=()=>{ 
      this.setState({
        modal1: !this.state.modal1
    })}
          
    handleChange = (e)  =>{
      this.setState({
        [e.target.name]: e.target.value 
      })
    }

    deleteCat = (catId) => {
      axios.delete(BACKEND_URL+`/Cat/${catId}`, this.state.config)
      .then((response) => {
        window.location.reload(false)
      }).catch(err=>console.log(err.response));
    }

    handleEdit = (catId) => {
      this.setState({
        modal: !this.state.modal
      });
      axios.get(BACKEND_URL+`/Cat/${catId}`,this.state.config)
      .then((response)=>{
        const data = response.data;
          this.setState({
            category: data,
            imgPreview:BACKEND_URL+`/pictures/${data.catImg}`
          });    
        console.log(this.state.imgPreview)
        })
      .catch(error => console.log(error.response));
    }

    handleupdate = (e) =>{
      this.setState({
        category: { ...this.state.category, [e.target.name]: e.target.value }
      })
    }

    handleFileSelect  = (e) =>{
      this.setState({
          selectedFile: e.target.files[0],
          imgPreview:URL.createObjectURL(e.target.files[0])
      })
    }

    addCat = (e) => {
      e.preventDefault();
        const data = new FormData()
        data.append('imageFile', this.state.selectedFile)
        axios.post(BACKEND_URL+'/upload', data, this.state.config)
            .then((response) => {
                this.setState({
                    catImg: response.data.filename
                })
            axios.post(BACKEND_URL+'/Cat',
            {
              category:this.state.category,
              catImg:this.state.catImg
            }, this.state.config)
                .then((response)=>{
                    console.log(response)
                    alert("Category added successfully")
                    window.location.reload()
                }).catch((err)=>console.log(err.response))
            }).catch((err) => console.log(err.response))
    }
     //update category
    updateCat = (catId) => {
      const data = new FormData()
      data.append('imageFile', this.state.selectedFile)
      axios.post(BACKEND_URL+'/upload', data, this.state.config)
        .then((response) => {
          this.setState({
            catImg: response.data.filename
          })
        axios.put(BACKEND_URL+`/Cat/${catId}`, 
        { 
          category: this.state.category.category,
          catImg:this.state.catImg
        }, this.state.config)
        .then((response) => {
          alert("Category updated successfully")
          console.log(response.data)
          window.location.reload();
        })
        .catch((err)=>console.log(err.response))
        }).catch((err) => console.log(err.response))
    }
    
    render() 
    {
      if(localStorage.getItem('token') && localStorage.getItem('role')==="admin"){
        return (
        <>
   
          <div className="container">
            <br/>
            <div className="row">
              <div className="col-md-6">
                <h1>Add Category</h1>
              </div>
              <div className="col-md-6">
                  <Button color='primary' style={{float:"right"}} onClick={this.toggle1}>
                    <MdAdd style={{fontSize:"40px", color:"white"}} />
                    Add Category
                  </Button>
              </div>
            </div>
            <Table hover>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Category Image</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.categories.map(cat => 
                <tr key={cat._id}>
                  <td>{cat.category}</td>
                  <td>
                    <img alt="catIcon" src={BACKEND_URL+`/pictures/${cat.catImg}`} style={{height: "80px",width:"80px"}}/>
                  </td>
                  <td>
                    <a className="btn btn-primary" onClick={() => this.handleEdit(cat._id)}>Update</a>
                  </td>
                  <td>
                    <a onClick={() => this.deleteCat(cat._id)} className="btn btn-danger">Delete</a>
                  </td>
                </tr>
                )
              }

              <Modal isOpen={this.state.modal1}>
                <ModalHeader toggle={this.toggle1}><legend>Add Category</legend></ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Input type="text" placeholder="Enter category name" name="category" onChange={this.handleChange} />
                  </FormGroup>
                  <FormGroup style={{display: "ruby"}}>
                    <Label className="btn btn-outline-info float-left" htmlFor="filePicker">Upload image for product category</Label>
                    <Input id="filePicker" style={{visibility:"hidden"}} type='file' name='catImg' onChange={this.handleFileSelect}/>
                    <img alt="Image Preview"
                      style={{display:'block', border: '1px solid gray', width:"200px", height:"200px", textAlign:'center'}} 
                      width='200' src={this.state.imgPreview}
                    />
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger btn-block" id="btnbag" onClick={this.addCat}>Add Category</button>
                </ModalFooter>
              </Modal>
    
              <Modal isOpen={this.state.modal}>
                <ModalHeader toggle={this.toggle}><legend>Update Category</legend></ModalHeader>
                <ModalBody>
                    <div className="form-group">
                      <label style={{color:'DarkSlateGray', fontSize:18}}> Category Name</label>
                      <input type="text" name="category" className="form-control" 
                        value ={this.state.category.category} onChange={this.handleupdate}/>

                      <img alt="Image Preview" width='200' src={this.state.imgPreview}/><br/>
                      <label style={{color:'DarkSlateGray', fontSize:18}}>Choose picture for category :</label>
                      <Input type='file' name='foodimage' onChange={this.handleFileSelect}/>
                      
                    </div>
                    <Button className="btn btn-primary btn-block" 
                      onClick={() => this.updateCat(this.state.category._id)}>Update</Button>   
                </ModalBody>
                <ModalFooter></ModalFooter>
              </Modal>
            </tbody>
          </Table>
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
