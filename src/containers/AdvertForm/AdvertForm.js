import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom";
import Axios from 'axios';
import * as types from "../../store/types";
import { connect } from 'react-redux';

export class AdvertForm extends Component {

  state = {
    advert:{
      name: "",
      description: "",
      price: "",
      photo: "",
      tags: [],
      type: "",
      createdAt: "",
      updatedAt: "",
    },
    submitted: false
  };

  
  
  componentDidMount(){
    if (this.props.match.params.type === "edit") {
      Axios.get( "http://localhost:3001/apiv1/anuncios/" + this.props.match.params.id )
      .then( response => {
        this.setState({advert:response.data.result});
      })
      
    }


    localStorage.setItem("back", true);
    this.props.enableBack(JSON.parse(localStorage.getItem("back")));
    
    
    Axios.get( "http://localhost:3001/apiv1/tags" )
    .then( response => {
      localStorage.setItem("tags", response.data.results);
      
    })
  }

  componentWillUnmount(){
    localStorage.setItem("back", false);


  }

  inputHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      advert:{
        ...this.state.advert,
        [name]: value 
      }
    });
  }

  handleCheckbox = (event) => {
    const { name } = event.target;
    const { tags } = this.state.advert;
    
    let tagsToChange = tags;

    tagsToChange.includes(name) ? tagsToChange.splice(tagsToChange.indexOf(name),1) : tagsToChange.push(name);
    

    this.setState({
      [name]: tagsToChange
    });
  }

  
  onSubmit = (event) => {
    event.preventDefault();

    
    Axios.put( "http://localhost:3001/apiv1/anuncios/"+ this.props.match.params.id, this.state.advert )
    .then( response => {
      this.setState({
        advert:{...response.data.result},
        submitted: true
      });
      
    })

    }
    createHandler = (event)=>{
      event.preventDefault();

      const { name, price, description, tags, type  } = this.state.advert;
      let advertToCreate = {
        name: name,
        price: price,
        description: description,
        tags: tags,
        type:  type.length === 0 ? "sell" : type,
        photo: "/images/anuncios/default.jpg"
      }
      
      Axios.post("http://localhost:3001/apiv1/anuncios/", advertToCreate)
        .then( response => {
          this.setState({
            advert:{...response.data.result},
            submitted: true
          });
          
        })
    }

  
  render() {
    const {  _id, name, description, price, photo, type, createdAt, updatedAt } = this.state.advert;
    const submitted = this.state.submitted;
    return (
      <Fragment>
        <div className="row mt-4">
          <div className="offset-md-3 col-md-6 col-xs-12 mb-5 ">
          
          {this.props.match.params.type === "edit" &&
            <Fragment>
              <div className="card">
                <img src={ photo } className="card-img-top" alt={ name } />
              </div>
              <p><b>Id:</b> {_id}</p>
              <p><b>CreatedAt:</b> {createdAt}</p>
              <p><b>UpdatedAt:</b> {updatedAt}</p>
              <p><b>type:</b> {type}</p>
            
              <form onSubmit={this.onSubmit}>
                  <Fragment>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" name="name" value={name} onChange={this.inputHandler} className="form-control" id="name" aria-describedby="name" placeholder="Enter name" />
                    </div>
                  
                    <div className="form-group">
                      <label htmlFor="price">Price</label>
                      <input 
                        type="text" 
                        id="price" 
                        className="form-control" 
                        placeholder=" Enter price" 
                        name="price" 
                        value={price} 
                        onChange={this.inputHandler} 
                      /> 
                    </div>
                  
                  
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea 
                        type="text" 
                        id="description" 
                        className="form-control" 
                        placeholder=" Enter Description" 
                        name="description" 
                        value={description} 
                        onChange={this.inputHandler} 
                      />
                    </div>

                    <div><b>Tags</b></div> 
                    <div className="form-check">
                      <input
                        name= "lifestyle"
                        type="checkbox"
                        className="form-check-input"
                        checked={this.state.advert.tags.includes("lifestyle")}
                        onChange={this.handleCheckbox}
                      />
                      <label className="form-check-label">lifestyle</label>
                    </div>
  
                    <div className="form-check">
                      <input
                        name= "mobile"
                        type="checkbox"
                        className="form-check-input"
                        checked={this.state.advert.tags.includes("mobile")}
                        onChange={this.handleCheckbox}
                      />
                      <label className="form-check-label">mobile</label>
                    </div>
  
                    <div className="form-check">
                      <input
                        name= "motor"
                        type="checkbox"
                        className="form-check-input"
                        checked={this.state.advert.tags.includes("motor")}
                        onChange={this.handleCheckbox}
                      />
                      <label className="form-check-label">motor</label>
                    </div>
  
                    <div className="form-check">
                      <input
                        name= "work"
                        type="checkbox"
                        className="form-check-input"
                        checked={this.state.advert.tags.includes("work")}
                        onChange={this.handleCheckbox}
                      />
                      <label className="form-check-label">work</label>
                    </div>
  
                    <div className="form-group">
                      <div>Type</div>
                        <select value={type} name="type" className="form-control" onChange={this.inputHandler}>
                          <option value="sell">sell</option>
                          <option value="buy">buy</option>
                        </select>
                    </div>
                  </Fragment>   
                <button type="submit" className="btn btn-primary disabled">Submit Changes</button>
                {submitted &&
                  <Fragment>
                    <small  className="form-text text-muted">Submitted succesfully!</small>
                  </Fragment>
                }
              </form>
            </Fragment>
          }

          {this.props.match.params.type === "add" &&
            <div>
              <form onSubmit={this.createHandler}>
                <div className="form-group">
                  <label htmlFor="name">Title</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="form-control" 
                    placeholder=" Enter name" 
                    name="name" 
                    value={name} 
                    onChange={this.inputHandler} 
                  /> 
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input 
                    type="text" 
                    id="price" 
                    className="form-control" 
                    placeholder=" Enter price" 
                    name="price" 
                    value={price} 
                    onChange={this.inputHandler} 
                  /> 
                </div>
                  
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea 
                    type="text" 
                    id="description" 
                    className="form-control" 
                    placeholder=" Enter Description" 
                    name="description" 
                    value={description} 
                    onChange={this.inputHandler} 
                  />
                </div>
                <div><b>Tags</b></div> 
                    <div className="form-check">
                      <input
                        name= "lifestyle"
                        type="checkbox"
                        className="form-check-input"
                        checked={this.state.advert.tags.includes("lifestyle")}
                        onChange={this.handleCheckbox}
                      />
                      <label className="form-check-label">lifestyle</label>
                    </div>
  
                    <div className="form-check">
                      <input
                        name= "mobile"
                        type="checkbox"
                        className="form-check-input"
                        checked={this.state.advert.tags.includes("mobile")}
                        onChange={this.handleCheckbox}
                      />
                      <label className="form-check-label">mobile</label>
                    </div>
  
                    <div className="form-check">
                      <input
                        name= "motor"
                        type="checkbox"
                        className="form-check-input"
                        checked={this.state.advert.tags.includes("motor")}
                        onChange={this.handleCheckbox}
                      />
                      <label className="form-check-label">motor</label>
                    </div>
  
                    <div className="form-check">
                      <input
                        name= "work"
                        type="checkbox"
                        className="form-check-input"
                        checked={this.state.advert.tags.includes("work")}
                        onChange={this.handleCheckbox}
                      />
                      <label className="form-check-label">work</label>
                    </div>
  
                    <div className="form-group">
                      <div>Type</div>
                        <select value={type} name="type" className="form-control" onChange={this.inputHandler}>
                          <option value="sell">sell</option>
                          <option value="buy">buy</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary disabled">Submit</button>
                      {submitted &&
                        <Fragment>
                          <small  className="form-text text-muted">Submitted succesfully!</small>
                        </Fragment>
                      }
              </form>
            </div>
          }
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
   
  };
}
const mapDispatchToProps = dispatch => {
  return {
    enableBack: (val) => dispatch({type: types.NAVIGATION, val })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdvertForm));
