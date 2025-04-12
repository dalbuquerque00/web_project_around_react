import { useEffect, useState } from 'react';
import Footer from './Footer/footer.jsx';
import Header from '../components/Header/Header';
import Main from './Main/main.jsx';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);

  useEffect(() => {  
    api.getUserInfo().then((data) => {  
      setCurrentUser(data);  
    });  
  
    api.getCardList().then((data) => {  
      setCards(data); 
    });  
}, []);

  const handleUpdateUser = (data) => {
    (async () => {
      await api.setUserInfo(data).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  const handleUpdateAvatar = (avatarLink) => {  
    api.setUserAvatar(avatarLink)  
      .then((updatedUser) => {  
        setCurrentUser(updatedUser);  
        handleClosePopup();  
      })  
      .catch((error) => console.error(error));  
  };

  async function handleCardLike(card) {
    // Verifica se o card está no estado de "like"
    const isLiked = card.isLiked;
    
    try {
        // Enviar uma solicitação para a API para obter dados atualizados
        const newCard = await api.changeLikeCardStatus(card._id, isLiked);
        setCards((state) => state.map((currentCard) => 
            currentCard._id === card._id ? newCard : currentCard
        ));
    } catch (error) {
        console.error(error);
    }
}

  const handleAddPlaceSubmit = (data) => {    
    api.addCard(data)    
      .then((newCard) => {    
        setCards([newCard, ...cards]);
        handleClosePopup();    
      })    
      .catch((error) => console.error(error));    
};

const handleCardDelete = (cardId) => {
  api.deleteCard(cardId)
    .then(() => {
      setCards((cards) => cards.filter((card) => card._id !== cardId));
    })
    .catch((error) => console.error(error));
};

  const handleOpenPopup = (popupData) => {
    setPopup(popupData);
  };

  const handleClosePopup = () => {
    setPopup(null);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}>
      <div className='page__content'>
        <Header />
        <Main
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          popup={popup}
          cards={cards}
          onCardLike={handleCardLike}
          handleAddPlaceSubmit={handleAddPlaceSubmit}
          onCardDelete={handleCardDelete}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;