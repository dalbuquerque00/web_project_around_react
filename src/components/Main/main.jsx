import { useState } from "react";
import EditButton from "../../images/Edit_Button.svg";
import Avatar from "../../images/Avatar.jpg";  
import Popup from "./components/Popup/popup";
import NewCard from "./components/Form/NewCard/newCard";
import EditProfile from "./components/Form/EditProfile/editProfile";
import EditAvatar from "./components/Form/EditAvatar/editAvatar";
import Card from "./components/Card/card";
// cARDS Iniciais
const cards = [
  {
    isLiked: false,
    _id: '5d1f0611d321eb4bdcd707dd',
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:10:57.741Z',
  },
  {
    isLiked: false,
    _id: '5d1f064ed321eb4bdcd707de',
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:11:58.324Z',
  },
];

console.log(cards);

export default function Main() {
  const [popup, setPopup] = useState(null);  
  const newCardPopup = { title: "Novo local", children: <NewCard /> };
  const editProfilePopup = { title: "Editar perfil", children: <EditProfile /> };
  const editAvatarPopup = { title: "Trocar foto de perfil", children: <EditAvatar /> };
  
  function handleOpenPopup(popup) {  
    setPopup(popup);  
  }  
  
  function handleClosePopup() {  
    setPopup(null);  
  }
// Clique na imagem ( Verficar depois )
  function handleCardClick(imageComponent) {
    setPopup(imageComponent);
  }
// Edição de Avatar
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