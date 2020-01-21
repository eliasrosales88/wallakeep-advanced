import React, { Component } from 'react'
import Advert from "../../components/Advert/Advert";
import { withRouter } from "react-router-dom";
import * as actions from "../../store/actions";
import { connect } from 'react-redux';

// SACAR LA API DE AdvertDetail y AdvertForm 
// REFACTOR DEL FORMULARIO
export class AdvertDetail extends Component {

  

  componentDidMount(){
    this.props.onFetchAdvert(this.props.match.params.id)
    this.props.onEnableBack(true);
  }

  componentWillUnmount(){
    this.props.onEnableBack(false);
  }

  render() {

    const advert = this.props.storeAdvert;
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
   storeAdvert: state.list.advert
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onEnableBack: (val) => dispatch(actions.setNav(val)),
    onFetchAdvert: (advertId) => dispatch(actions.loadAdvert(advertId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdvertDetail));
