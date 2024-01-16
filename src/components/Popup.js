
export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown',  this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
        this.close();
      }
  }

  _closePopupByClickingOverlay = (evt) => {
    if(evt.target === evt.currentTarget) {
      this.close();
    }

  }

  setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener('click', () => this.close());

    this._popup.addEventListener('mousedown', (evt) => this._closePopupByClickingOverlay(evt));
  }
}