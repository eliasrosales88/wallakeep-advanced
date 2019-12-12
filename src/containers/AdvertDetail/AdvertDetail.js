import React, { Component } from 'react'
import Advert from "../../components/Advert/Advert";
import Axios from 'axios';
import { withRouter } from "react-router-dom";
import AuthContext from "../../contexts/auth-context";


export class AdvertDetail extends Component {

  state = {
    advert: ""
  }

  static contextType = AuthContext;


  componentDidMount(){
    Axios.get( "http://localhost:3001/apiv1/anuncios/"+ this.props.match.params.id )
    .then( response => {
      console.log(response.data.result.tags);
      
      this.setState({advert: response.data.result})
    })
    this.context.login({
      name: localStorage.getItem("name"),
      lastname: localStorage.getItem("lastname"),
      authenticated: localStorage.getItem("authenticated"),
      back: true
    })

    localStorage.setItem("back", true);
  }

  componentWillUnmount(){
    localStorage.setItem("back", false);

    this.context.login({
      name: localStorage.getItem("name"),
      lastname: localStorage.getItem("lastname"),
      authenticated: localStorage.getItem("authenticated"),
      back: JSON.parse(localStorage.getItem("back"))
    })
    
    console.log(this.context);
    
  }

  render() {
    const { advert } = this.state;
    return (
      <div className="row mt-4">
        <div className="col-md-8 offset-md-2 col-xs-12">
          <Advert
            key={advert._id} 
            name={advert.name} 
            price={advert.price} 
            description={advert.description}
            id={advert._id} 
            tags={advert.tags} 
            photo={advert.photo}
            buttonsActive={false}
          /> 
        </div>
      </div>
    )
  }
}

export default withRouter(AdvertDetail);
