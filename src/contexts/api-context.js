import React from "react";
import Axios from 'axios';

const API_VERSION = "apiv1"
const API_URL = "http://localhost:3001/" + API_VERSION + "/anuncios/";

const apiContext = React.createContext({
  api: {
    getAdverts: ()=>{
      Axios.get( API_URL )
        .then( response => {
         return response.data.results;
        })
    },
    getAdvert: (id)=>{
      Axios.get( API_URL + id )
        .then( response => {
          return response.data.result;
        })
    },
    
  }
});

export default apiContext;