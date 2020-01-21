import * as types from './types'

import ApiService from "../services/ApiService";

const API_URL = 'http://localhost:3001/apiv1/anuncios';
const API_URL_V1 = 'http://localhost:3001/apiv1/';



export const saveSession = (session) => ({
  type: types.SESSION_SAVE,
  session
});

export const clearSessionLS = () => ({
  type: types.SESSION_CLEAR,
});

export const clearAuthRedux = () => ({
  type: types.LOGOUT,
})

//-----
export const setAdverts = (response) => {

  return {
    type: types.SET_ADVERTS,
    adverts: response
  };
};

export const setAdvert = (response) => {

  return {
    type: types.SET_ADVERT,
    advert: response
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
export const setTagFilters = (tags) => {
  return {
    type: types.SET_TAG_FILTERS,
    filters: {
      tags
    }
  };
};
export const setPriceFilters = (priceMin, priceMax) => {

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


export const enableNav = (val) => {
  return {
    type: types.NAVIGATION,
    back: val

  }
}


export const loadAdverts = () => async (
  dispatch) => {
  try {
    const adverts = await ApiService(API_URL_V1).getAdverts()
    dispatch(setAdverts(adverts));
  } catch (error) {
    dispatch(fetchAdvertsFailed());

  }
};

export const loadAdvert = (advertId) => async (
  dispatch) => {
  try {
    const advert = await ApiService(API_URL_V1).getAdvert(advertId);
    console.log(advert);
    
    dispatch(setAdvert(advert));
  } catch (error) {
    dispatch(fetchAdvertsFailed());

  }
}; 

export const loadTypeFilters = (type, API_FILTER) => async (
  dispatch) => {
  try {
    const typeFilters = await ApiService(API_URL + API_FILTER).getTypeFilters();
    dispatch(setAdverts(typeFilters.results));
    dispatch(setTypeFilters(type));
  } catch (error) {
    dispatch(fetchAdvertsFailed());

  }
};

export const loadTagFilters = (tag, API_FILTER) => async (
  dispatch) => {
  try {
    const tags = await ApiService(API_URL + API_FILTER).getTagFilters();

    dispatch(setAdverts(tags.results));
    dispatch(setTagFilters(tag));
  } catch (error) {
    dispatch(fetchAdvertsFailed());
  }

}


export const loadPriceFilters = (priceMin, priceMax, API_FILTER) => async (
  dispatch) => {
  try {
    const prices = await ApiService(API_URL + API_FILTER).getPriceFilters()
    dispatch(setAdverts(prices.results));
    dispatch(setPriceFilters(priceMin, priceMax));
  } catch (error) {
    dispatch(fetchAdvertsFailed());
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(clearAuthRedux());
    dispatch(clearSessionLS());
  }
}

export const setNav = (val) => {
  return dispatch => {
    dispatch(enableNav(val));
  }
}