import Popup from "./Popup.js";
import { imgPopupSelector, descriptionImgPopupSelector } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._imgPopup = this._popup.querySelector(imgPopupSelector);
    this._descriptionImg = this._popup.querySelector(descriptionImgPopupSelector);
  }

  open(data) {
    console.log(data)
    super.open();

    this._imgPopup.src = data.link;
    this._imgPopup.alt = data.name;
    this._descriptionImg.textContent = data.name;
  }
}