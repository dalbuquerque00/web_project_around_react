import React, { useEffect, useState } from 'react';
import api from "../../utils/api";
import EditButton from "../../images/Edit_Button.svg";
import Avatar from "../../images/Avatar.jpg";  
import Popup from "./components/Popup/popup";
import NewCard from "./components/Form/NewCard/newCard";
import EditProfile from "./components/Form/EditProfile/editProfile";
import EditAvatar from "./components/Form/EditAvatar/editAvatar";
import Card from "./components/Card/card";

export default function Main() {
  const [popup, setPopup] = useState(null);  
  const [cards, setCards] = useState([]);
  const newCardPopup = { title: "Novo local", children: <NewCard /> };
  const editProfilePopup = { title: "Editar perfil", children: <EditProfile /> };
  const editAvatarPopup = { title: "Trocar foto de perfil", children: <EditAvatar /> };
  
  useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.error('Erro ao buscar os cards:', err);
      });
  }, []);

  function handleOpenPopup(popup) {  
    setPopup(popup);  
  }  
  
  function handleClosePopup() {  
    setPopup(null);  
  }

  function handleCardClick(imageComponent) {
    setPopup(imageComponent);
  }

    return (
        <main className="content">
        <section className="profile">
          <div className="profile__avatar-container">
            <img 
              src={Avatar} alt="Imagem de perfil" className="profile__avatar" />
            <div className="profile__avatar-edit" onClick={()=> handleOpenPopup(editAvatarPopup)} ></div>
          </div>
          <h2 className="profile__info-title">Jacques Costeau</h2>
          <h3 className="profile__info-subtitle">Explorador</h3>
          <button className="profile__edit-button">
            <img
              src={EditButton}
              alt="Botão para edição de perfil"
              className="profile__edit-icon"
              type="button"
              onClick={()=> handleOpenPopup(editProfilePopup)}
            />
          </button>
          <button 
            className="button-add"
            type="button"  
            onClick={() => handleOpenPopup(newCardPopup)}
          ></button>
        </section>
        <section className="elements">
          {cards.map((card) => (
            <Card 
              key={card._id} 
              card={card} 
              handleOpenPopup={handleOpenPopup}
            />
          ))}
        </section>
        {popup && (  
        <Popup
          isOpen={popup !== null}   
          onClose={handleClosePopup}   
          title={popup.title}  
        >  
          {popup.children}  
        </Popup>  
        )}
      </main>
    );
}