/**
 * Modelo de anuncio en nodepop
 */
export default class Advert {
  /**
   * Constructor
   * @param {Object} Advert 
   */    
  constructor(ad, apiUrl) {
      this._id = ad._id;
      this.createdAt = ad.createdAt;
      this.name = ad.name;
      this.description = ad.description;
      this.price = ad.price;
      this.type = ad.type;
      this.photo = ad.photo.startsWith('/images/')?`${apiUrl.replace('apiv1','')}${ad.photo}`:ad.photo;
      this.tags = ad.tags;
  }

  /**
   * Comprueba si un objeto advert es válido. (Campos obligatorios completos)
   */
  isValid() {
      return  this.name && 
              this.description && 
              this.price > 0 && 
              this.type && 
              this.photo && 
              this.tags && 
              this.tags.length >= 1;
  }
}