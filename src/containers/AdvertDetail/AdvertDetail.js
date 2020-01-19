import React, { Component } from 'react'
import Advert from "../../components/Advert/Advert";
import Axios from 'axios';
import { withRouter } from "react-router-dom";
import * as actions from "../../store/actions";
import { connect } from 'react-redux';


export class AdvertDetail extends Component {

  state = {
    advert: ""
  }




  componentDidMount(){
    Axios.get( "http://localhost:3001/apiv1/anuncios/"+ this.props.match.params.id )
    .then( response => {
      
      
      this.setState({advert: response.data.result})
    })


    
    this.props.onEnableBack(true);
    

    
  }

  componentWillUnmount(){
    this.props.onEnableBack(false);

    
    
    
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


const mapStateToProps = state => {
  return {
   
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onEnableBack: (val) => {
      console.log(val);
        
      dispatch(actions.setNav(val))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdvertDetail));
