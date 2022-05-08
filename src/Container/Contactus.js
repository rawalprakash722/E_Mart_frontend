import axios from "axios";
import { Component } from "react";
import './myStyle.css'
import {BACKEND_URL} from '.././config';
class Conatctus extends Component{
    state={
        email:'',
        help:'',
        
        

    }
    changeGarne=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    
    sendmessage=(e)=>{
        const data={
           email:this.state.email,
            help:this.state.help
        }
        axios.post(BACKEND_URL+'/insert/contact',data).then((response)=>{
            alert(response.data.message);
            console.log(response);
            
        }).catch(error=>{console.log(error);})
    }
            
    render(){
        return(
            <div className="container-fluid">
           
            <section className="Form my-4 mx-5 pt-5 pb-5 mt-6">
            <div className="container">
                <div className="row no-gutters shadow" style={{background:'white', borderRadius:'3px'}}>
                   
                    <div className="col-lg-5">
                      
                            <img alt="login" src="/contact2.png" className="img-fluid" style={{ height: '400px' }} />

                        
                    </div>
                    <div className="col-lg-5 no gutters">
                       
                    <h2 className=" py-4 ml-5">Take subscription</h2>
                    <h5 className="ml-5"></h5>
                        
                 
                <form>

                <div className="form-row">
                                        <div className="col-lg-9 ml-5">
                    <p>
                        Email: <input type="text" name="email" value={this.state.email} onChange={this.changeGarne} /> </p>
                        </div>
                        </div>

                        <br></br>

    <div className="form-row">
                                        <div className="col-lg-9 ml-5">
                                            <p>
                           Message: <input type="text"  name="help" value={this.state.help} onChange={this.changeGarne} />

                        </p>

                        </div>
                        </div>
                    
                     

                        <div className="form-row">
                                        <div className="col-lg-9 ml-5">
                    <p><button className="btn btn-primary" onClick={this.sendmessage}>Submit</button></p>
                    </div>
                    </div>
                   
                      
                    </form>
            </div>

       
            </div>
            
            </div>
            
            </section>

            <h3>Google map of E-mart</h3>
            <div class="mapouter"><div class="gmap_canvas"><iframe class="gmap_iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=tokha&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe><a href="https://kokagames.com/">FNF Mods</a></div>
          
          </div>
          
        
            </div>
        )
    }
}

export default Conatctus