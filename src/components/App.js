import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import { useState } from "react";
import PopUpWithForm from "./PopUpWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }
  return (
    <div className="page">
      <Header />
      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopUpWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        title="Cambiar foto de perfil"
        name="avatar"
        buttonText="Guardar"
      >
        <input
          type="url"
          id="editAvatar__window-form-link"
          className="popup__window-form-input popup__input"
          name="editAvatar__window-form-link"
          placeholder="Enlace a la imagen"
          required
        />
        <span
          id="editAvatar__window-form-link-error"
          className="popup__window-error"
        ></span>
      </PopUpWithForm>
      <PopUpWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        title="Editar Perfil"
        name="edit"
        buttonText="Guardar"
      >
        <input
          type="text"
          id="edit__window-form-name"
          className="popup__window-form-input popup__input"
          name="content__edit-form-title"
          placeholder="Nombre"
          required
          minLength="2"
        />
        <span
          id="edit__window-form-name-error"
          className="popup__window-error"
        ></span>
        <input
          type="text"
          id="edit__window-form-title"
          className="popup__window-form-input popup__input"
          name="edit__window-form-title"
          placeholder="Acerca de mi"
          required
          minLength="2"
        />
        <span
          id="edit__window-form-title-error"
          className="popup__window-error"
        ></span>
      </PopUpWithForm>
      <PopUpWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        title="Nuevo Lugar"
        name="avatar"
        buttonText="Guardar"
      >
        <input
          type="text"
          id="popup__window-form-title"
          className="popup__window-form-input popup__input"
          name="popup__window-form-title"
          placeholder="Titulo"
          required
        />
        <span
          id="popup__window-form-title-error"
          className="popup__window-error"
        ></span>
        <input
          type="url"
          id="popup__window-form-link"
          className="popup__window-form-input popup__input"
          name="popup__window-form-link"
          placeholder="Enlace a la imagen"
          required
        />
        <span
          id="popup__window-form-link-error"
          className="popup__window-error"
        ></span>
      </PopUpWithForm>
      <ImagePopup
        isOpen = {isImagePopupOpen}
        link={selectedCard.link}
        name={selectedCard.name}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
