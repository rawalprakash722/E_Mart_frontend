import React, { Component } from 'react'
import {Row,Container } from 'reactstrap'
import './popular.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import {BACKEND_URL} from '../../config';

export default class Store extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      store_name: '',
      store_image: '',
      _id:'',
       popular: [],
    }
  }

  componentDidMount() {
    Axios.get(BACKEND_URL+'/stores',this.config)
    .then((response)=>{
      const data = response.data;
      this.setState({popular:  data});
      console.log("data fecth");
    }).catch(error => console.log(error.response));
  }
  
    render() {
      console.log(this.state.popular)
        return (
           <Container>
             <div>
             <p><span className='h1' style={{color:'DarkOrange'}}>Store</span></p>
               <hr></hr></div>
             
             
          



            
           <Row>
            {
              this.state.popular.map((pop => 
                <div key={pop._id} className="Col-md-4" id="product">
                  <figure className="card card-product">
                    <Link to={`/viewRes/${pop._id}`}>
                    <img width='200' height='200' alt='storePic' src={BACKEND_URL+`/pictures/${pop.store_image}`}/></Link>
                    <figcaption className="info-wrap">
                      <h4 className="title">
                        <Link to={`/viewRes/${pop._id}`}>
                        {pop.store_name}</Link>
                      </h4>
                    </figcaption>
                  </figure>
                </div>
              ))
            }
           </Row>
           <hr></hr>
            </Container>
        )
    }
  }
