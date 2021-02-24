import axios from 'axios';
import React from 'react';

class Deliveryaddress extends React.Component{
  constructor(props){
    super(props);
    this.state={
      users:[],
      id:this.props.data

    }
    //  console.log(this.props.data);
  }
  componentDidMount(){
    axios.get(`http://localhost:8000/user/${this.state.id}`)
    .then((res)=>{
      // console.log(res);
      const users=res.data;
      this.setState({users})
      // console.log(users);
    })
  }
  render(){

    return(
      <div>
        <h5>Delivery Address</h5>
         {this.state.users.address}
         {/* <ul>
          {
            this.state.users.map((user)=>{
              return <div>
                <li key={user.orderId}>
                  {user.address}
                </li>
              </div>
            })
          }
        </ul> */}
      </div>
    )
}
}
export default Deliveryaddress;
