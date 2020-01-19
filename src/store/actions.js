import Axios from 'axios';

import * as types from './types'

const API_URL = 'http://localhost:3001/apiv1/anuncios';


export const setAdverts = ( response ) => {
   
  return {
      type: types.SET_ADVERTS,
      adverts: response.results
  };
};

export const setTypeFilters = (type) => {
  return {
      type: types.SET_TAG_FILTERS,
      filters: {
        type
      }
  };
};
export const setTagFilters = (tags ) => {
  return {
      type: types.SET_TAG_FILTERS,
      filters: {
        tags
      }
  };
};
export const setPriceFilters = (priceMin, priceMax ) => {
   
  return {
      type: types.SET_FILTERS,
      filters: {
        priceMin, 
        priceMax, 
      }
  };
};


export const fetchAdvertsFailed = () => {
  return {
      type: types.FETCH_ADVERTS_FAILED
  };
};

export const loadAdverts = () => {
  return dispatch => {
      Axios.get( API_URL )
          .then( response => {
             dispatch(setAdverts(response.data));
          } )
          .catch( error => {
              dispatch(fetchAdvertsFailed());
          } );
  };
};

export const loadTypeFilters = (type, API_FILTER) => {
  return dispatch => {
    Axios.get( API_URL + API_FILTER )
          .then( response => {
            dispatch(setAdverts(response.data));
            dispatch(setTypeFilters(type));
          } )
          .catch( error => {
              dispatch(fetchAdvertsFailed());
          } );
  }
}
export const loadTagFilters = (tag, API_FILTER) => {
  return dispatch => {
    Axios.get( API_URL + API_FILTER )
          .then( response => {
            dispatch(setAdverts(response.data));
            dispatch(setTagFilters(tag));
          } )
          .catch( error => {
              dispatch(fetchAdvertsFailed());
          } );
  }
}
export const loadPriceFilters = (priceMin, priceMax, API_FILTER) => {
  return dispatch => {
    Axios.get( API_URL + API_FILTER )
          .then( response => {
                       
            dispatch(setAdverts(response.data));
            dispatch(setPriceFilters(priceMin, priceMax));
          } )
          .catch( error => {
              dispatch(fetchAdvertsFailed());
          } );
  }
}