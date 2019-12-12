import React, { Fragment } from 'react';
import { withRouter } from "react-router-dom";


const Advert = ( props ) => {
  const {photo, name, description, price, id, history, type, tags=[], buttonsActive = true} = props;
  
  const detailHandler = () => {
    history.push("advert/"+ id)
  }
  
  const editHandler = () => {
    history.push("advert/edit/" + id )
    
  }

  
  return (
    <Fragment>
      <div className="card">
        <img src={ photo } className="card-img-top" alt={ name } />
        <div className="card-body">
          <h5 className="card-title">{ name }</h5>
          <p className="card-text"><b>Precio: { price }$</b></p>
          <p className="card-text">{ description }</p>
          <p>
            {type === "sell" ? <span className="badge badge-danger p-2">{type}</span> : <span className="badge badge-success p-2">{type}</span>}
          </p>
          {tags.map((tag, index) =>{
            return (
              <Fragment key={index}>
                <span className="badge badge-primary ml-1">{tag}</span>
              </Fragment>
            )
            })
          }

          {buttonsActive &&
            <div className="mt-1">
              <button onClick={detailHandler} className="btn btn-primary">More</button>
              <button onClick={editHandler} className="btn btn-warning ml-1">Edit</button>
            </div>  
          }
        </div>
      </div>
    </Fragment>
  )
}

export default withRouter(Advert);
