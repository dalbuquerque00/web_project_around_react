import { useState, useEffect } from 'react';
import Header from "./Header/header.jsx";
import Main from './Main/main.jsx';
import Footer from './Footer/footer.jsx';
import api from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(err));
}, []);

  useEffect(() => {  
    api.getCardList()  
        .then((cardData) => {  
            setCards(cardData);  
        })  
        .catch((err) => console.error(err));  
  }, []);

  const handleCardLike = async (card) => {  
    const isLiked = card.isLiked;  
    await api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {  
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));  
    }).catch((error) => console.error(error));  
  }

  const handleCardDelete = async (card) => {  
    try {  
        await api.removeCard(card._id);  
        setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));  
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

  const handleUpdateUser = (data) => {  
    (async () => {  
      await api  
        .setUserInfo(data)  
        .then((newData) => {  
          setCurrentUser(newData);  
          handleClosePopup();  
        })  
        .catch((error) => console.error(error));  
    })();  
  };
  
  const handleUpdateAvatar = (data) => {  
    (async () => {  
        await api  
            .setUserAvatar(data)  
            .then((newData) => {  
                setCurrentUser(newData);  
                handleClosePopup();  
            })  
            .catch((error) => console.error(error));  
    })();  
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
        <Header/>
        <Main
          onOpenPopup={handleOpenPopup}  
          onClosePopup={handleClosePopup}  
          popup={popup}
          cards={cards}  
          onCardLike={handleCardLike}  
          onCardDelete={handleCardDelete}  
          onAddPlace={handleAddPlaceSubmit}
        />
        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;