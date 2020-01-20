import Axios from 'axios';
import Advert from '../models/Advert';

const ApiService = API_URL => {
  return {
    /**
     * Obtener todos los tags
     */
    getTags: () => {
      // Endpoint
      let baseURL = `${API_URL}/tags`;
      // Call endpoint and return
      return Axios.get(baseURL).then(res => res.data.results);
    },

    /**
     * Obtener todos los anuncios
     */
    getAdverts: () => {
      // Endpoint
      let baseURL = `${API_URL}/anuncios`;
      // Call endpoint and return
      return Axios.get(baseURL).then(res =>
        res.data.results.map(advert => new Advert(advert, API_URL)),
      );
    },

    /**
     * Obtener un anuncio por ID
     */
    getAdvert: advertId => {
      // Endpoint
      let baseURL = `${API_URL}/anuncios/${advertId}`;
      // Call endpoint and return
      return Axios.get(baseURL).then(
        res => new Advert(res.data.result, API_URL),
      );
    },

    /**
     * Buscar por query generica
     */
    searchAdverts: filters => {
      // Endpoint
      let baseURL = `${API_URL}/anuncios?`;
      if (filters.name) baseURL = `${baseURL}name=${filters.name}&`;
      if (filters.type && filters.type !== 'all')
        baseURL = `${baseURL}venta=${filters.type === 'sell' ? true : false}&`;
      if (filters.tag && filters.tag !== 'all')
        baseURL = `${baseURL}tag=${filters.tag}&`;
      const priceFrom = parseInt(filters.priceFrom);
      const priceTo = parseInt(filters.priceTo);
      if (priceFrom && !priceTo) {
        baseURL = `${baseURL}price=${priceFrom}-`;
      } else if (!priceFrom && priceTo) {
        baseURL = `${baseURL}price=-${priceTo}&`;
      } else if (priceFrom && priceTo) {
        baseURL = `${baseURL}price=${priceFrom}-${priceTo}&`;
      }
      // Call endpoint and return
      return Axios.get(baseURL).then(res =>
        res.data.results.map(advert => new Advert(advert, API_URL)),
      );
    },

    /**
     * Llama a la API para crear un nuevo anuncio
     * @param {Advert} advert
     */
    postAdvert: advert => {
      // Endpoint
      const baseURL = `${API_URL}/anuncios`;
      // Call endpoint and return
      return Axios.post(baseURL, null, { data: advert }).then(
        res => new Advert(res.data.result, API_URL),
      );
    },

    /**
     * Llama a la API para editar un anuncio
     * @param {Advert} advert
     */
    editAdvert: advert => {
      // Endpoint
      const baseURL = `${API_URL}/anuncios/${advert._id}`;
      // Call endpoint and return
      return Axios.put(baseURL, null, { data: advert }).then(
        res => new Advert(res.data.result, API_URL),
      );
    },
  };
};

export default ApiService;
