import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import { useState, useEffect } from "react";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import { currentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const[cards, setCards] = useState([]);

  useEffect(()=>{
    async function getProfileInfo(){
      const response = await api.getUserInfo();
      setCurrentUser(response);
      console.log('Informacion del usuario: ', response);
    }
    getProfileInfo();
  },[]);

  useEffect(()=>{
    async function getCards(){
      const response = await api.getInitialCards();
      setCards(response);
    }
    getCards();
  },[]);

  function handleEditAvatarClick() {
    console.log('Click');
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
  function handleUpdateUser(userData){
    api.setUserInfo(userData).then((newUser) =>{
      setCurrentUser(newUser);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(link){
    api.updateAvatar(link).then((newUser) =>{
      setCurrentUser(newUser);
      closeAllPopups();
    });
  }
  function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya le han dado like
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Envía una petición a la API y obtén los datos actualizados de la tarjeta
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card){
    api.deleteCard(card._id).then(() =>{
      setCards((state) => state.filter(c => c._id !== card._id));
    });
  }
  function handleAddPlace(data){
    api.addCard(data).then((newCard) => {
    setCards([newCard, ...cards]);
    closeAllPopups();
  });

  }
  return (
    <div className="page">
      <currentUserContext.Provider value = {currentUser}>
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards = {cards}
          onCardLike = {handleCardLike}
          onCardDelete = {handleCardDelete}
        />
        <Footer />
        <EditAvatarPopup 
          isOpen = {isEditAvatarPopupOpen}
          onClose = {closeAllPopups}
          onUpdateAvatar = {handleUpdateAvatar}
        />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser = {handleUpdateUser} 
        />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace = {handleAddPlace}
        />
        <ImagePopup
          isOpen = {isImagePopupOpen}
          link={selectedCard.link}
          name={selectedCard.name}
          onClose={closeAllPopups}
        />
    </currentUserContext.Provider> 
    </div>
  );
}

export default App;
