import {
  buttonSubmitSelector
} from './constants';

export const loaderForSubmit = (loading, popupSelector) => {
  const popupOpened = document.querySelector(popupSelector);
  const buttonSubmit = popupOpened.querySelector(buttonSubmitSelector);

    buttonSubmit.textContent = loading ? 'Сохранение...' : 'Сохранить';
}