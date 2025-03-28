import likeIcon from "../../../../images/like.svg";
// Funcionalidades do card 
export default function Card(props) {
  const { card, handleOpenPopup } = props;
  const { name, link } = card;

  const imageComponent = {
    children: (
      <>
        <img src={link} alt={name} className="popup__image" />
        <h3 className="popup__description">{name}</h3>
      </>
    )
  };

  return (
    <div className="elements__item">
      <button type="button" className="elements__delete"></button>
      <img 
        className="elements__item-image" 
        src={link} 
        alt={name} 
        onClick={() => handleOpenPopup(imageComponent)}
      />
      <div className="elements__item-content">
        <h2 className="elements__item-title">{name}</h2>
        <button type="button" className="elements__item-button">
          <img
            src={likeIcon}
            alt="Botão de like"
            className="elements__item-like"
          />
        </button>
      </div>
    </div>
  );
}