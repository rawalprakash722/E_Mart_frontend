import { Component } from "react";

import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Register from './Register'
import Login from "./Login";
import ViewUsers from "./ViewUsers";
import Profile from "./Profile";
import AddStore from "./Store";
import Category from "./Category";
import Addproduct from "./Product";
import Popular from "./UserDashboard/Popular";
import Store from "./UserDashboard/Store";
import Home from "./UserDashboard/Home";
import Productdetails from "./UserDashboard/Product";
import Cart from "./UserDashboard/Viewcart";
import ViewOrder from "./UserDashboard/vieworder";
import Vieworderadmin from "./VieworderAdmin";
import Categoryu from "./UserDashboard/Categoryu";
import Aboutus from './Aboutus';
import Contactus from './Contactus';
import Viewcontactus from "./viewContactus";
import Viewsingleproduct from "./UserDashboard/viewsingleproduct";
class Container extends Component{
    render(){
     
        return(
                <BrowserRouter>
                    <div className="app">
                        <Routes>
                            {/* <Route path="/users/signup" component={Register} />
                            <Route path="/users/login" component={Login} />
                            <Route path="/users/logout" component={Logout} /> */}
                            <Route path="/users/signup" element={<Register/>} />
                            <Route path="/users/login" element={<Login/>} />
                            <Route path="/user/show" element={<ViewUsers></ViewUsers>}/>
                            <Route path="/user/single/:id" element={<Profile/>}/>
                            <Route path='/stores/add' element={<AddStore/>} />
                            <Route path='/add/cat' element={<Category/>}/>
                            <Route path='/add/product' element={<Addproduct/>}/>
                            <Route path='/popular' element={<Popular/>}/>
                            <Route path='/viewRes/:id' component={<Productdetails/>}/>
                            <Route path='/store' element={<Store/>}/>
                            <Route exact path="/" element={<Home/>} />
                            <Route path="/view/carts" element={<Cart/>} />
                            <Route path='/category' element={<Categoryu/>}/>
                            <Route path="/view/order" element={<ViewOrder/>} />
                            <Route path="/order/admin" element={<Vieworderadmin/>} />
                            <Route path="/Aboutus" element={<Aboutus/>} />
                            <Route path="/insert/contact" element={<Contactus/>} />
                            <Route path="/contact" element={<Viewcontactus/>} />
                            <Route path="/single/prd/:id" element={<Viewsingleproduct/>} />
                        </Routes>
                    </div>
                </BrowserRouter>
            
        )
    }
}

export default Container