import React, { Component } from 'react'
import Category from './Categoryu';
import Popular from './Popular';



export default class Home extends Component {
    render() {
        if(localStorage.getItem('token') && localStorage.getItem('role')==="admin"){

            return(
                <h1>Welcome to admin dashboard</h1>
            )
        }

        else{
        return (
            <div>
           
                <Category />
               
                <Popular />
                
                
                
            
            </div>
        )
        }
    }
}
