import axios from 'axios';
import React from 'react';
import Deliveryaddress from './Deliveryaddress';
import CartDetails from './CartDetails';


class UserList extends React.Component{
  constructor(){

    super();
    this.state={
      users:[],
      selectedDish:{
        restId:2,
        userId:1,
        dishes:[{
          dishId:3,
          dishName:"paneer",
          quantity:2,
          price:200
        },
      {
        dishId:15,
        dishName:"paratha",
        quantity:1,
        price:250
      }],

      }

    }
  }
  componentDidMount(){
    axios.get('http://localhost:8000/order')
    .then((res)=>{
      const users=res.data;
      this.setState({users})
      //  console.log(users);
    })
  }
  render(){
    return(
      <div className="container">
        <div className="row justify-content-md-center">

        </div>
        <div className="row justify-content-md-center">
          <div className="col">
            < Deliveryaddress data={this.state.selectedDish.userId}/>
          </div>
          <div className="col">
              <CartDetails details={this.state.selectedDish}></CartDetails>
          </div>
        </div>
    </div>
    )

}

}
export default UserList;
