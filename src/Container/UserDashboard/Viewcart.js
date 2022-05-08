import React, { Component } from 'react'
import Axios from 'axios'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import moment from 'moment';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup} from 'reactstrap';
import {BACKEND_URL} from '../../config';


export default class Cart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: [],
      cart: [],
      product: [],
      notes:'',
      viewproduct: [],
      modal: false,
      productname: '',
      totalprice: '',
      totAmt:0,
      updatedprice: 0,
      updatedquanity: '',
      quanity:1,
      show: true,
      max: 5,
      min: 0,
      config: {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      },
      CartId: ''
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  componentDidMount() {
    Axios.get(BACKEND_URL+'/cart', this.state.config)
      .then((response) => {
        console.log(response.data)
        this.setState({
          cart: response.data,
        })
      })
      .catch((err) => console.log(err.response));
  }

  removeCardList = (CartId) => {
    Axios.delete(BACKEND_URL+`/cart/${CartId}`, this.state.config)
      .then((response) => {
        
        const filteredCartList = this.state.cart.filter((cart) => {
          return cart._id !== CartId
          
        })
        this.setState({
          visible1: true,
          cart: filteredCartList
        })
        alert("Removed from cart.")

      }).catch((err) => console.log(err.response));
  }

  handleChange = (e) => {
    this.setState({
      viewproduct:{...this.state.viewproduct, [e.target.name]: (e.target.validity.valid) ? e.target.value:''}
    })
  }

  handleEdit = (productId) => {
    this.setState({
      modal: !this.state.modal
    })
    Axios.get(BACKEND_URL+`/cart/${productId}`, this.state.config)
      .then((response) => {
        const data = response.data;
        this.setState({
          viewproduct: data
        });
        console.log(this.state.viewproduct);
      }).catch(error => console.log(error.response));
  }

  handleUpdate = (cartId) => {
    Axios.put(BACKEND_URL+`/cart/${cartId}`,{
      quanity: this.state.viewproduct.quanity,
      totalprice: (this.state.viewproduct.product.price * this.state.viewproduct.quanity),
      notes: this.state.viewproduct.notes,
    }, this.state.config)
      .then((response) => {
        console.log(response);
        this.setState({
          modal: !this.state.modal
        })
      }).catch((err) => console.log(err.response));
      alert("updated successfully")
      window.location.reload();
  }

  handleOrder = () => {
    this.state.cart.forEach(item => {
      Axios.post(BACKEND_URL+`/order/`,
      {
        product: item.product._id,
        notes: item.notes,
        dateTime: moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm a'),
        quanity: item.quanity
      }, this.state.config)
      .then((response) => {
        Axios.delete(BACKEND_URL+`/cart/${item._id}`, this.state.config)
          .then((response)=>{
            console.log("Deleted Successfully")
            window.location.reload();
          }).catch((err)=>console.log(err.response));
          
        console.log(response);
        alert("Ordered successfully")
      }).catch((err) => console.log(err.response));
    });
  }
  submit=()=>{
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className='custom-ui'>
          <h1>Payment</h1>
          <p><label>Card Number</label><input type='text' placeholder='Card number'/></p>
          <p><label>Card Holder</label><input type='text' placeholder='Card holder'/></p>
          <p><label>Final Payment</label><input type='text' value={this.state.totAmt}/></p>
          
          <button className='btn btn-success'
            onClick={() => {
              this.handleOrder();
              onClose();
            }}
          >

            Order
          </button>
          <button className='btn btn-danger' onClick={onClose}>No</button>
        </div>
      );
    }
  });
}

  // submit = () => {
  //   confirmAlert({
  //     title: 'Confirm to order',
  //     message: 'Are you sure to order this items.',
     
  //     buttons: [
  //       {
  //         label: 'Yes',
  //         onClick: () => {this.handleOrder()}
  //       },
  //       {
  //         label: 'No',
  //       }
  //     ]
  //   });
  // };

  render() {
    //Try for loop:
    // for (let i = 0; i < this.state.cart.length; i++) {
    //   this.state.totAmt += this.state.cart[i].totalprice;
    // }

    //OR this method
    // Calculation of the total amount of cart
    this.state.totAmt = this.state.cart.reduce(
      (prevValue, currentValue) => prevValue + currentValue.totalprice,
      0
    );

    return (
      <>
    
      <div class="container-fluid">
      <div id="viewCartDiv">
        <Table hover>
          <thead>
            <tr>
              <th>Product</th>
     
              <th>Quantity</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.cart.map(cart => {
                return (
                  <tr key={cart._id}>
                  <td>{cart.product.productname}</td>
                  <td>{cart.quanity}</td>
                  <td>{cart.product.price * cart.quanity}</td>   
                  <td>
                    <button type="button" class="btn btn-primary"
                      onClick={() => this.handleEdit(cart._id)} >Update</button>
                  </td>
                  <td><button type="button" class="btn btn-danger" onClick={() => this.removeCardList(cart._id)}>Remove</button></td>
                </tr>)
              })
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6" align="right">
                <label>Total Amount: Rs {this.state.totAmt}</label>
              </td>
            </tr>
            <tr>
              <td colSpan="6" align="right">
              <button type="button" class="btn btn-warning"
              onClick={this.submit} >Order</button>
              </td>
            </tr>
          </tfoot>
        </Table>

        <Modal isOpen={this.state.modal}>
          <ModalHeader toggle={this.toggle}>{this.state.viewproduct.product?this.state.viewproduct.product.productname:""}<br/>
              Rs.{this.state.viewproduct.totalprice}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="notes">Enter Delivery Address</Label>
              <Input id="notes" 
                type="textarea"
                name="notes" 
                value={this.state.viewproduct.notes} 
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Quantity</Label>
              <Input 
                type="number" 
                pattern="[0-9]*" 
                name="quanity" 
                value={this.state.viewproduct.quanity} 
                onChange={this.handleChange} 
                min="1" 
                max="100" 
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
              <button className="btn btn-lg btn-success" id="btnbag" onClick={() => this.handleUpdate(this.state.viewproduct._id)}>Update</button>
          </ModalFooter>
        </Modal>


        
      </div>
      </div>
      </>
    )
  }
}
