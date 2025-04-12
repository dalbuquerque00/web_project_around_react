// função edição de perfil

import { useState, useContext, useEffect } from 'react';
import CurrentUserContext from '../../../../../contexts/CurrentUserContext';

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isNameValid = name.trim().length >= 2;
    const isDescriptionValid = description.trim().length >= 2;
    setIsFormValid(isNameValid && isDescriptionValid);
  }, [name, description]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity() && isFormValid) {
      handleUpdateUser({
        name,
        about: description
      });
    }
  };

  return (
    <form
      id="edit_form"
      className="popup__form"
      name="edit-profile"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          type="text"
          name="name"
          className="popup__input popup__input_name"
          placeholder="Nome"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error">
          {name.trim().length === 0 ? 
            'Este campo no puede estar vacío' : 
            name.trim().length < 2 ? 
            `Use pelo menos 2 caracteres (atualmente está usando ${name.length} caracteres).` : 
            '\u00A0'}
        </span>
      </div>

      <div className="popup__field">
        <input
          type="text"
          name="job"
          className="popup__input popup__input_job"
          placeholder="Sobre mim"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error">
          {description.trim().length === 0 ? 
            'Este campo não pode estar vazio' : 
            description.trim().length < 2 ? 
            `Use pelo menos 2 caracteres (atualmente está usando ${description.length} caracteres).` : 
            '\u00A0'}
        </span>
      </div>

      <button
        type="submit"
        className={`popup__button ${!isFormValid ? 'popup__button_disabled' : ''}`}
        disabled={!isFormValid}
      >
        Guardar
      </button>
    </form>
  );
}