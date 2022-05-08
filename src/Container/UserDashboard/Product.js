import React, { Component } from 'react'
import { Row } from 'reactstrap';
import './popular.css';
import Axios from 'axios';
import {BACKEND_URL} from '../../config';
export default class Productdetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productname: '',
            productimage: '',
            price:'',
            popular: [],
          }
        }

    componentDidMount() {
      let resId = this.props.match.params.id;
      console.log("Restaurant ID: "+resId)
      Axios.get(BACKEND_URL+`/products/searchByRes/${resId}`,this.config)
      .then((response)=>{
        const data = response.data;
        this.setState({popular:  data});
        console.log("data fecth");
      }).catch(error => console.log(error.response));
    }

    render() {
        return (
            <div className="container">
                     
              <Row>
                {
                  this.state.popular.map((pop => 
                  <div className="Col-md-4" id="product">
                    <figure className="card card-product">
                      <div className="image_wrap">
                        <img alt="productPic" src={BACKEND_URL+`/pictures/${pop.productimage}`} onClick={this.addcart}/>
                      </div>
                      <figcaption class="info-wrap">
                        <h4 class="title">{pop.productname}</h4>
                        <h4 class="title">Rs.{pop.price}</h4>
                      </figcaption>
                    </figure>
                  </div>
                  ))
                }
              </Row>
              <hr></hr>   
            </div>
          )
    }
}

