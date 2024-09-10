import { useContext } from "react";
import Card from "./Card.js";
import { currentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main(props){

  const currentUser = useContext(currentUserContext);
  return(
      <main className="content">
        <section className="explorer">
          <div className="content__explorer">
            <div className="content__explorer-image" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
              <button className="content__explorer-image-button" onClick={props.onEditAvatarClick}></button>
            </div>
            <div className="content__explorer-info">
              <div className="content__explorer-info-top">
                <h2 className="content__explorer-name">{currentUser.name}</h2>
                <button className="content__explorer-edit-enable" onClick={props.onEditProfileClick}></button>
              </div>
              <h3 className="content__explorer-job">{currentUser.about}</h3>
            </div>
            <button className="content__explorer-add-enable" onClick={props.onAddPlaceClick}>+</button>
          </div>
        </section>
        <section className="grid">

          <div className="content__grid">
              {props.cards.map((card) => (
                <Card 
                  onCardClick = {props.onCardClick}
                  card = {card}
                  key={card._id} 
                  name={card.name} 
                  likes={card.likes} 
                  link={card.link}
                  onCardLike = {props.onCardLike}
                  onCardDelete = {props.onCardDelete}
                />
              ))}
          </div>

          
        </section>

      </main>
    );
}
