import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import Advert from '../Advert/Advert';
import  AuthContext  from "../../contexts/auth-context";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

import * as actions from "../../store/actions";



class AdvertList extends Component {
  
  // Adding context
  static contextType = AuthContext;
  
  
  state = {
    advert: [],
    filters: {
      type: "",
      tag: "",
      priceMin:"1",
      priceMax: "100"
    }
    
  }
  
  componentDidMount () {
    this.props.onFetchAdverts();
    
    // if (!this.context.authenticated) {
    //   this.props.history.replace("/");
    //   return;
    // }

    // Axios.get( "http://localhost:3001/apiv1/anuncios" )
    //   .then( response => {
    //     this.setState({advert: response.data.results})
    //   })

      
  }

  componentWillUnmount(){
    // this.context.login({
    //   name: localStorage.getItem("name"),
    //   lastname: localStorage.getItem("lastname"),
    //   authenticated: localStorage.getItem("authenticated"),
    //   back: false
    // })

    localStorage.setItem("back", false);
    this.props.enableBack(JSON.parse(localStorage.getItem("back")));
  }

  // FILTERS
  filterTypeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      filters: {
        ...this.state.filters,
        [name]:value
      }
    })

    this.props.onSetTypeFilters(value, "?venta=" + (value === "sell" ? "true" : "false"))
    // Axios.get("http://localhost:3001/apiv1/anuncios?venta=" + (value === "sell" ? "true" : "false"))
    //   .then((response)=>{
    //     this.setState({
    //       advert: response.data.results,
    //       filters: {
    //         ...this.state.filters,
    //         [name]:value
    //       }
    //     })
    //   },
    //   (err)=>{
    //     console.error(err);
    //   }
    //   )
  }

  filterTagHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      filters: {
        ...this.state.filters,
        [name]:value
      }
    })
    
    console.log(value);
    
    
    this.props.onSetTagFilters(value, `?tag=${value}`)
    // Axios.get("http://localhost:3001/apiv1/anuncios?tag=" + value)
    //   .then((response)=>{
    //     this.setState({
    //       advert: response.data.results,
    //       filters: {
    //         ...this.state.filters,
    //         [name]:value
    //       }
    //     })
    //   },
    //   (err)=>{
    //     console.error(err);
    //   }
    //   )
  }

  inputPriceHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      filters:{
        ...this.state.filters,
        [name]: value 
      }
    });
  }
  onSubmitPrice = (event) =>{
    event.preventDefault();
    const { priceMin, priceMax } = this.state.filters;
    console.log(this.state.filters);
    
    this.props.onSetPriceFilters( priceMin, priceMax, `?price=${priceMin}-${priceMax}`);
    
    // Axios.get("http://localhost:3001/apiv1/anuncios?price="+ priceMin + "-" + priceMax)
    //   .then((response)=>{
    //     this.setState({
    //       advert: response.data.results,
    //       filters: {
    //         priceMin: priceMin, 
    //         priceMax: priceMax, 
    //       }
    //     })
    //   },
    //   (err)=>{
    //     console.error(err);
    //   }
    //   )

  }

  createHandler = () =>{
    this.props.history.push("advert/add/new")
  }
  render() {
    const { type, tag, priceMin, priceMax } = this.state.filters;
    
    const adverts = this.props.storeAdverts.map( advert => {
      return <Advert 
        key={advert._id} 
        name={advert.name} 
        price={advert.price}
        type={advert.type}
        tags={advert.tags}
        description={advert.description}
        id={advert._id} 
        photo={advert.photo} />
    })
    return (
      <Fragment>
        {/* FILTERS */}
        <div className="row mt-1">
          <div className="col-xs-12 col-md-3">
            <div className="form-group">
              <div>Type</div>
              <select value={type} name="type" className="form-control" onChange={this.filterTypeHandler}>
                <option value="sell">sell</option>
                <option value="buy">buy</option>
              </select>
            </div>
          </div>
          <div className="col-xs-12 col-md-3">
            <div className="form-group">
              <div>Tag</div>
              <select value={tag} name="tag" className="form-control" onChange={this.filterTagHandler}>
                <option value="lifestyle">lifestyle</option>
                <option value="mobile">mobile</option>
                <option value="motor">motor</option>
                <option value="work">work</option>
              </select>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <form  onSubmit={this.onSubmitPrice} className="form-group">
              <div>Price</div>
              <div className="row">
                <div className="col">
                  <input type="text"className="form-control" id="priceMin" name="priceMin" value={priceMin} onChange={this.inputPriceHandler} />
                </div>
                <div className="col">
                  <input type="text"className="form-control" id="priceMax" name="priceMax" value={priceMax} onChange={this.inputPriceHandler} />
                </div>
                <div className="col">
                  <input type="submit"className="btn btn-primary" value="price" />
                </div>
              </div>
            </form>
          </div>
        </div>
        
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-success ml-3" onClick={this.createHandler}>Create Advert</button>
          </div>
        </div>

        {/* ADVERT GRID */}
        <div className="row justify-content-center mt-3">
          <div className="col-xs-12 advertGrid">
            {adverts}
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    storeAdverts: state.adverts

  };
}
const mapDispatchToProps = dispatch => {
  return {
    enableBack: (val) => dispatch({type: actions.NAVIGATION, val }),
    onFetchAdverts: () => dispatch(actions.loadAdverts()),
    onSetTypeFilters: (type, filter) => dispatch(actions.loadTypeFilters(type, filter)),
    onSetTagFilters: (tag, filter) => dispatch(actions.loadTagFilters(tag, filter)),
    onSetPriceFilters: (priceMin, priceMax, filter) => dispatch(actions.loadPriceFilters(priceMin, priceMax, filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdvertList));
