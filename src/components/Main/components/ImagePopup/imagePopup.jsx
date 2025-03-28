// PopUp da imagem
export default function ImagePopup({ card }) {
    return (
      <>
        <img src={card.link} alt={card.name} className="popup__image" />
        <h3 className="popup__description">{card.name}</h3>
      </>
    );
  }