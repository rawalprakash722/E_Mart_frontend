import { Component } from "react";

import './myStyle.css'


class Aboutus extends Component {



render()
{

return(


<div>
<video className="vid"  autoplay="autoplay" loop="true" muted playsInline width="100%" height="550px" >
                    <source src="about.mp4" type="video/mp4">
              
                  </source>
                  </video>

       

</div>


)



}


}


export default Aboutus;