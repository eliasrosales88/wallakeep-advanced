import Axios from 'axios';


export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const NAVIGATION = 'NAVIGATION';
export const SET_ADVERTS = 'SET_ADVERTS';
export const FETCH_ADVERTS_FAILED = 'FETCH_ADVERTS_FAILED';
export const SET_FILTERS = 'SET_FILTERS';
export const SET_TYPE_FILTERS = 'SET_TYPE_FILTERS';
export const SET_TAG_FILTERS = 'SET_TAG_FILTERS';

const API_URL = 'http://localhost:3001/apiv1/anuncios';


export const setAdverts = ( response ) => {
   
  return {
      type: SET_ADVERTS,
      adverts: response.results
  };
};

export const setTypeFilters = (type) => {
  return {
      type: SET_TAG_FILTERS,
      filters: {
        type
      }
  };
};
export const setTagFilters = (tags ) => {
  return {
      type: SET_TAG_FILTERS,
      filters: {
        tags
      }
  };
};
export const setPriceFilters = (priceMin, priceMax ) => {
   
  return {
      type: SET_FILTERS,
      filters: {
        priceMin, 
        priceMax, 
      }
  };
};


export const fetchAdvertsFailed = () => {
  return {
      type: FETCH_ADVERTS_FAILED
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