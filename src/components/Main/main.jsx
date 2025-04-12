import { useContext } from "react";
import EditButton from "../../images/Edit_button.svg";
import Avatar from "../../images/avatar.jpg";  
import Popup from "./components/Popup/popup";
import NewCard from "./components/form/NewCard/newCard";
import EditProfile from "./components/Form/EditProfile/editProfile";
import EditAvatar from "./components/Form/EditAvatar/editAvatar";
import Card from "./components/Card/card";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Main({ 
  onOpenPopup,   
  onClosePopup,   
  popup,     
  cards,     
  onCardLike,     
  onCardDelete,    
  handleAddPlaceSubmit
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img   
            src={currentUser.avatar}   
            alt="Imagen de perfil"   
            className="profile__avatar"   
          />
          <div 
            className="profile__avatar-edit"   
            onClick={() => onOpenPopup({  
              title: "Cambiar foto de perfil",  
              children: <EditAvatar />  
            })} 
          ></div>
        </div>
        <h2 className="profile__info-title">{currentUser.name}</h2>
        <h3 className="profile__info-subtitle">{currentUser.about}</h3>
        <button className="profile__edit-button">
          <img
            src={EditButton}
            alt="Boton para editar el perfil"
            className="profile__edit-icon"
            type="button"
            onClick={() => onOpenPopup({  
              title: "Editar perfil",  
              children: <EditProfile />  
            })}
          />
        </button>
        <button 
          className="button-add"
          type="button"  
          onClick={() => onOpenPopup({  
            title: "Nuevo lugar",  
            children: <NewCard handleAddPlaceSubmit={handleAddPlaceSubmit} />  
          })}
        ></button>
      </section>
      <section className="elements">  
        {cards.map((card) => (  
          <Card     
            key={card._id}     
            card={card}     
            handleOpenPopup={onOpenPopup}    
            onCardLike={onCardLike}    
            onCardDelete={onCardDelete}    
        />  
        ))}  
      </section>
      {popup && (  
        <Popup
          isOpen={popup !== null}   
          onClose={onClosePopup}   
          title={popup.title}  
        >  
          {popup.children}  
        </Popup>  
      )}
    </main>
  );
}