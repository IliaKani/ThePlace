import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__content');
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if(this._handleFormSubmit) {
        this._handleFormSubmit();
      }
    });
  }

  setSubmitHandler(handler) {
    this._handleFormSubmit = handler;
  }
}