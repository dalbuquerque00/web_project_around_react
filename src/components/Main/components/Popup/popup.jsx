export default function Popup(props) {
  const { onClose, title, children } = props;
// Função para fechar
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div
        className={`popup__container ${
          !title ? "popup__preview" : ""
        }`}
      >
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        
        {title && <h3 className="popup__title">{title}</h3>}

        {children}
      </div>
    </div>
  );
}