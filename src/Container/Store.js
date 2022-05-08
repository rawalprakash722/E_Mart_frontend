import React, { Component } from 'react'
import { Label, FormGroup, Button, Input } from 'reactstrap'
import axios from 'axios'
import ListStore from './ListStore'
import {BACKEND_URL} from '.././config';

export default class AddStore extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       store_name: null,
       store_address: null,
       fooditem: null,
       store_image: null,
       food : [],
       imgPreview:null,
       config: {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    },
    selectedFile: null,
    }
    this.handleFileSelect = this.handleFileSelect.bind(this)
  }

    handleFileSelect = (e) => {
      this.setState({
        selectedFile: e.target.files[0],
        imgPreview:URL.createObjectURL(e.target.files[0])
      })
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleFoodChange = (e) => {
      this.setState({
        fooditem : e.target.value
      });
    }

    addRest = () => {
      const data = new FormData();
      data.append('imageFile',this.state.selectedFile)
      axios.post(BACKEND_URL+'/upload', data, this.state.config)
      .then((response) => {
          this.setState({
              store_image: response.data.filename
          })
          axios.post(BACKEND_URL+'/stores',this.state,this.state.config)
          .then((response) => {
            
            console.log(response.data)
            alert(response.data.message);
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
          <h2>Add Store</h2><hr/>
          <div className="row">
            <div className="col-md-6">
              <form className="p-3">
                <FormGroup>
                  <Input type='text' id="storename" name='store_name' value={this.state.store_name}
                    onChange={this.handleChange} placeholder="Enter store name" required/>
                </FormGroup>
                <FormGroup>
                  <Input type='text' id='store_address' name='store_address' value={this.state.store_address}
                    onChange={ this.handleChange} placeholder="Enter store address" required/>
                    </FormGroup>
                  <FormGroup style={{display: "ruby"}}>
                    <Label className="btn btn-outline-info float-left" htmlFor="filePicker">Upload image for Store</Label>
                    <Input id="filePicker" style={{visibility:"hidden"}} type='file' name='store_image' onChange={this.handleFileSelect}/>
                  </FormGroup>
                  <Button color='danger' onClick={this.addRest}>Add Store</Button>
              </form>
            </div>
            <div className="col-md-4 flex">
              <img alt="Image Preview" 
              style={{display:'block', border: '1px solid gray', width:"200px", textAlign:'center'}} 
              src={this.state.imgPreview}/><br/>
            </div>
          </div>
              <hr></hr>
              <h2 style={{color:'#34495E'}}>View Store</h2>
            <ListStore />
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

