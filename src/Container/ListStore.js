import React, { Component } from 'react'
import { Table, Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';
import axios from 'axios'
import {BACKEND_URL} from '.././config';


export default class ListStore extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
                 _id: '',
                 store_name: '',
                 store_address: '',
                 store_image:'',
                 popular: [],
                 store: [],
                 modal : false,
                 isupdated: false,
                 config: {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                },
                selectedFile: null,
                imgPreview:null,
          }
          this.toggle = this.toggle.bind(this);
      }

  toggle() {
    this.setState({
    modal: !this.state.modal
    })
  }
             
  componentDidMount() {
    axios.get(BACKEND_URL+'/stores',this.state.config)
    .then((response)=>{
      const data = response.data;
      this.setState({popular:  data});
      this.setState({store: data});        
      console.log("data fecth");       
    }).catch(error => console.log(error.response));
  }

  handleFileSelect = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
      imgPreview: URL.createObjectURL(e.target.files[0])
    })
  }     
       
  handleChange = (e)  =>{
    this.setState({
      [e.target.name]: e.target.value 
    })
  }

  deletestore(resId){
    axios.delete(BACKEND_URL+`/stores/${resId}`, this.state.config)
    .then((response) => {
      console.log("delete trying")
      alert("Deleted")
    })
  }

  handleEdit = (resId) => {
    this.setState({
      modal: !this.state.modal
    });
    axios.get(BACKEND_URL+`/stores/${resId}`,this.state.config)
    .then((response)=>{
      const data = response.data;
      this.setState({
        store: data,
        imgPreview:BACKEND_URL+`/pictures/${data.store_image}`
      });         
    }).catch(error => console.log(error.response)); 
  }

  handleupdate = (e) =>{
    this.setState({
      store: { ...this.state.store, [e.target.name]: e.target.value }
    })
  }
     
  updateRestaurant = (resId) => {
    const data = new FormData()
    data.append('imageFile', this.state.selectedFile)
    axios.post(BACKEND_URL+'/upload', data, this.state.config)
    .then((response) => {
      this.setState({
        store_image: response.data.filename
      })
      console.log(response)
      axios.put(BACKEND_URL+`/stores/${resId}`, 
      { 
        store_name:this.state.store.store_name,
        store_address: this.state.store.store_address,
        store_image:this.state.store_image 
      },this.state.config)
        .then((response) => {
          // alert("Restaurant updated successfully")
            window.location.reload();
          console.log(response.data)
        })
        .catch((err) => console.log(err.response))
    }).catch((err) => console.log(err.response))
    }    
  
    render() {
        return (
            <Table hover>
            <thead>
              <tr>
                <th>Store Name</th>
                <th>Store Address</th>
                <th>Store Image</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
                {
                  this.state.popular.map(pop => 
                  <tr key={pop._id}>
                    <td>{pop.store_name}</td>
                    <td>{pop.store_address}</td>
                          <td><img alt="img" src={BACKEND_URL+`/pictures/${pop.store_image}`} style={{height: "50px",width:"50px"}}/></td>
                    <td><a className="btn btn-primary" onClick={() => this.handleEdit(pop._id)}>
                                        Update</a></td>
                    <td><a onClick={() => this.deletestore(pop._id)} className="btn btn-danger" href="">Delete</a></td>
                  </tr>
                  )
                }
    
        <Modal isOpen={this.state.modal}>
          <ModalHeader toggle={this.toggle}><legend>Update</legend></ModalHeader>
          <ModalBody>
                <legend><h3>Update Store</h3></legend>
                <div className="form-group">
                    <label> Store Name</label> 
                      <input type="text" name="store_name" className="form-control"
                        value ={this.state.store.store_name} onChange={this.handleupdate}/> 
                  </div>
                  <div className="form-group">
                      <label>Store Address</label>
                      <input type="text" name="store_address" className="form-control"
                      value={this.state.store.store_address}  
                      onChange={this.handleupdate}  />
                  </div>
                  <img className='img-thumbnail' width='200'
                  src={this.state.imgPreview} alt="resImg" />
                  <Input type='file' name='store_image' id='store_image'
                    onChange={this.handleFileSelect}/>
                  <button className="btn btn-primary btn-block" onClick={() => this.updateRestaurant(this.state.store._id)}>Update</button>   
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>
      </tbody>
    </Table>
    )
  }
}
