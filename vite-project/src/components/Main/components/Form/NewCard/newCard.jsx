// Funcionalidade para adicionar imagens

export default function NewCard() {
    return (
    <form id="add_form" className="popup__form" name="add-card" noValidate>
        <input
          type="text"
          name="title"
          className="popup__input popup__input_title"
          placeholder="Titulo"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="popup__error title-error"></span>
        <input
          type="url"
          name="link"
          className="popup__input popup__input_link"
          placeholder="URL da imagem"
          required
        />
        <span className="popup__error link-error"></span>
        <button type="submit" className="popup__button" disabled>
          Criar
        </button>
    </form>
    );
}