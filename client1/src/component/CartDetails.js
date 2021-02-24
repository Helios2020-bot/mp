import axios from 'axios';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class UserList2 extends React.Component{
  constructor(){
    super();
    this.state={
      users:[],
      Total:0
    }
  }
  // componentDidMount(){
  //   axios.get('http://localhost:8000/order')
  //   .then((res)=>{
  //     const users=res.data;
  //     this.setState({users});
  //     console.log(users);
  //   })
  // }

  render(){
     console.log(this.props.details.dishes[0].dishId);
    return(
      <>
      <div>
         <div className="card">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5d_U24KzfUvZ-UqAr-jP2vv_ezJnAZK7KNw&usqp=CAU" alt="..."></img>
         <div className="card-body">
           <h5 className="card-title ">{this.props.details.restId}</h5>
           <h5 className="card-title ">{this.props.details.dishes[0].dishid}</h5>
            <p>{this.props.details.dishes.map(ord=>{
              return<>
              {/* DishId:{ord.dishId}<br></br> */}
              {ord.dishName}  <span style={{float:'right'}}>{ord.price}</span><br></br>

              </>

            }) }</p>

            {/* <span>Total:{Number(this.props.details.quantity) * Number(this.props.details.price)}</span> */}
            {this.props.details.dishes.map(element => {
              return<><span>{Number(element.price)*Number(element.quantity)} </span>
            </>})
            }
           {/* <button type="button" className="btn btn-primary" onClick={this.ToggleFlag}>Hide</button> */}
           {/* <Link to={`/detailImage/${this.getImgWithId.imgId}`} className="btn btn-primary">Detail</Link> */}
         </div>
       </div>
      </div>
      </>
    )
}
}
export default UserList2;
