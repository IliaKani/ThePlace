import './index.css';
import Card from '../components/Card.js';
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  templateElementSelector,
  config,
  containerCardSelector,
  popupAddCardSelector,
  popupImgSelector,
  popupProfileSelector,
  popupDeleteCardSelector,
  avatarUserSelector,
  profileJobSelector,
  profileNameSelector,
  popupReplaceAvatarSelector,
  preloaderSelector,
} from "../utils/constants.js";

import { togglePreloader } from "../utils/preloader.js";
import { loaderForSubmit } from "../utils/loaderForSubmit.js";

 const buttonEditProfile = document.querySelector('.button_edit');
 const buttonAddCard = document.querySelector('.button_add');
 const formProfile = document.querySelector('.popup__content_theme_profile');
 const formCard = document.querySelector('.popup__content_theme_elements');
 const formAvatar = document.querySelector('.popup__content_theme_avatar');
 const nameInput = document.querySelector('.popup__input_type_name');
 const jobInput = document.querySelector('.popup__input_type_job');
 const changeUserAvatar = document.querySelector('.profile__wrap');


const profileFormValidator = new FormValidator(config, formProfile);
profileFormValidator.enableValidation(config);

const cardFormValidator = new FormValidator(config, formCard);
cardFormValidator.enableValidation(config);

const avatarFormValidator = new FormValidator(config, formAvatar);
avatarFormValidator.enableValidation(config);

const popupWithImg = new PopupWithImage(popupImgSelector);
popupWithImg.setEventListeners();

const popupDeleteCard = new PopupDeleteCard(popupDeleteCardSelector);
popupDeleteCard.setEventListeners();

export function setValueInputPopupProfile(data) {
  nameInput.value = data.name;
  jobInput.value = data.job;
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'c3c58a7a-9312-4cf1-b3a9-64c7a7a81e94',
    'Content-Type': 'application/json'
  }
});

togglePreloader(true, preloaderSelector);

api.getAppInfo()
  .then(data => {
    const [ initialCards, profileData ] = data
    const userInfo = new UserInfo({
      nameTextSelector: profileNameSelector,
      jobTextSelector: profileJobSelector,
      avatarUserSelector: avatarUserSelector,
    });
    userInfo.setUserInfo(profileData);

    const userId = profileData._id;
    const renderer = (item) => {
      const card = new Card({
        data: item,
        currentUserId: userId,
        handleCardClick: () => {
          popupWithImg.open(item);
        },

        handleLikeClick: () => {
          const isLiked = card.isLiked();

          if(isLiked) {
            api.deleteLikeCard(item._id)
              .then(item => card.updateLikes(item.likes))
              .catch(err => console.log(err));
          } else {
            api.addLikeCard(item._id)
              .then(item => card.updateLikes(item.likes))
              .catch(err => console.log(err))
          }
        },

        handleDeleteIconClick: () => {
          popupDeleteCard.open();
          popupDeleteCard.setSubmitHandler( () => {
            api.deleteCard(item._id)
              .then(() => {
                  card.removeCard();
                  popupDeleteCard.close();
                }
              )
              .catch(err => console.log(err));
          });
        }
      }, templateElementSelector);


      cardList.addItem(card.getCard());
    }

    const cardList = new Section({
        items: initialCards,
        renderer
      },
      containerCardSelector
    );
    cardList.renderItems();

    const popupFormAddCard = new PopupWithForm({
      popupSelector: popupAddCardSelector,
      handleFormSubmit: (data) => {
        loaderForSubmit(true, popupAddCardSelector);
        api.createCard(data)
          .then( data => {
            renderer(data);
            popupFormAddCard.close();
            }
          )
          .catch(err => console.log(err))
          .finally(() => loaderForSubmit(false, popupAddCardSelector));
      }
    });

    const popupEditProfile = new PopupWithForm({
      popupSelector: popupProfileSelector,
      handleFormSubmit: (data) => {
        loaderForSubmit(true, popupProfileSelector);
        api.editUserInfo(data)
          .then(data => {
            userInfo.setUserInfo(data);
            popupEditProfile.close();
          })
          .catch(err => console.log(err))
          .finally(() => loaderForSubmit(false, popupProfileSelector));;
      }
    });

    const popupChangeAvatar = new PopupWithForm({
      popupSelector: popupReplaceAvatarSelector,
      handleFormSubmit: (item) => {
        loaderForSubmit(true, popupReplaceAvatarSelector);
        api.changeUserPicture(item.link)
          .then( res => {
            userInfo.setUserInfo(res);
            popupChangeAvatar.close()
          })
          .catch(err => console.log(err))
          .finally(() => loaderForSubmit(false, popupReplaceAvatarSelector));
      }
    });

    return {
      userInfo,
      popupFormAddCard,
      popupEditProfile,
      popupChangeAvatar,
    }
  }).then( res => {
    const {
      userInfo,
      popupFormAddCard,
      popupEditProfile,
      popupChangeAvatar,
    } = res;

    popupFormAddCard.setEventListeners();
    popupEditProfile.setEventListeners();
    popupChangeAvatar.setEventListeners();

    return {
      userInfo,
      popupFormAddCard,
      popupEditProfile,
      popupChangeAvatar,
    }
}).then( res => {
  const {
    userInfo,
    popupFormAddCard,
    popupEditProfile,
    popupChangeAvatar,
  } = res;

  buttonAddCard.addEventListener('click', () => {
    popupFormAddCard.open();
    cardFormValidator.resetErrorElement();
  });


  buttonEditProfile.addEventListener('click', () => {
    popupEditProfile.open();
    profileFormValidator.resetErrorElement();
    setValueInputPopupProfile(userInfo.getUserInfo());
  });

  changeUserAvatar.addEventListener('click', () => {
    popupChangeAvatar.open();
    avatarFormValidator.resetErrorElement();
  });
}).catch(err => console.log(err))
  .finally(() => togglePreloader(false, preloaderSelector));



