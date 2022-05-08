import { Component } from "react";

import { Nav, Navbar, Form, Button,  Dropdown, ButtonGroup } from 'react-bootstrap';


import {FaHotel,FaUserAstronaut,FaShoppingCart,FaSignInAlt,FaShareSquare} from 'react-icons/fa'
import {FcManager,FcOnlineSupport,FcAddDatabase} from 'react-icons/fc'





class Header extends Component{

  
  logout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('userType')
 
    localStorage.removeItem('firstname')
    window.location.href = '/'
  }

 
    render(){
      
      
      
      {
        if(localStorage.getItem('token') && localStorage.getItem('role')==="admin"){
          var menu=
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
           
            
          <Nav.Link href="/add/product">Add Product<FcAddDatabase/></Nav.Link>
              <Nav.Link href="/add/cat">Add Category<FcAddDatabase/></Nav.Link>
              <Nav.Link href="/stores/add">Add Stores<FcAddDatabase/></Nav.Link>
              <Nav.Link href="/user/show">Users<FaUserAstronaut/></Nav.Link>
              <Nav.Link href="/order/admin">Order<FaShoppingCart/></Nav.Link>
       
              <Nav.Link eventKey={2} href="/user/single/:id">{localStorage.getItem('fullname')}<FcManager/>
            </Nav.Link>
            <Nav.Link href="/contact">Contacted user<FcOnlineSupport/></Nav.Link>
          </Nav>
        
          <Form inline>



            {/* <Nav.Link href="/logout"><FaShareSquare/>Logout</Nav.Link> */}
            <Button Link to="/logout" className="btn btn-danger" onClick={this.logout}><FaShareSquare/> Log out</Button>
        
  
      </Form>
      </Navbar.Collapse>




}
         


        else if(localStorage.getItem('token') && localStorage.getItem('role')==="customer"){
          var menu=

          <Navbar.Collapse id="responsive-navbar-nav" >
        <Nav className="mr-auto">

              {/* <Nav.Link href="/restaurant/register">Request<GoGitPullRequest/></Nav.Link> */}
              <Nav.Link href="/category">Category</Nav.Link>
              {/* <Nav.Link href="/foodsr">foods<IoFastFoodSharp/></Nav.Link> */}
              <Nav.Link href="/view/carts">Cart<FaShoppingCart/></Nav.Link>
              {/* <Nav.Link href="/store">Stores<FaHotel/></Nav.Link> */}
              {/* <Nav.Link href="/popular">popular</Nav.Link> */}
              <Nav.Link href="/view/order">Order</Nav.Link>
              {/* <Nav.Link eventKey={2} href="/user/single/:id">{localStorage.getItem('fullname')}
              </Nav.Link> */}
        </Nav>

        
        <Form inline>
        <Dropdown as={ButtonGroup}>
  <Button variant="success" href="/user/single/:id">{localStorage.getItem('fullname')}<FcManager/></Button>

  <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

  <Dropdown.Menu>
    <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
    <Dropdown.Item href="/popular">Popular</Dropdown.Item>
  
  </Dropdown.Menu>
</Dropdown>


        

              {/* <Button Link to="/logout" className="btn btn-danger" onClick={this.logout}><FaShareSquare/> Log out</Button> */}
       
    
         
           
           
              </Form>
       </Navbar.Collapse>
         
        }
      
   
        else{
        var menu=
 

<Navbar.Collapse id="responsive-navbar-nav">
   
   <Nav className="mr-auto">

      <Nav.Link href="/Aboutus">About Us<FaHotel/></Nav.Link>
      <Nav.Link href="/insert/contact">Contact us<FcOnlineSupport/></Nav.Link>
      
     
    
</Nav>
    
    <Form inline>
  
    <Button href="/users/login" className="btn btn-primary"><FaSignInAlt/> Sign in</Button>
    {/* <Button href="/user/login"><FaSignInAlt/> Sign in</Button> */}
  
  </Form>


  </Navbar.Collapse>

      }
    
        return(
      
          <Navbar collapseOnSelect expand="lg" bg="white" className="shadow">
        
 
          <Navbar.Brand href="/">
            {/* <img src="/mart1.png" clsassName="d-inline-block align-top" alt="logo" style={{height:'80px', width:'80px'}} /> */}

            <video className="vid"  alt="video11" autoplay="autoplay" loop="true" muted playsInline width="80px" height="80pxpx" >
                    <source src="/mart2.mp4" type="video/mp4">
              
                  </source>
                  </video>
   
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         
    
            {menu}
           
                 
        </Navbar>

      
         
         
        )
    }
}

}




export default Header