
import React from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';


class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };






  // Генерируем уникальные id
  nameInputId = nanoid();
  numberInputId = nanoid();

  
  // метод обработки события отправки формы (onSubmit).
  handleSubmit = event => {
    // отмена действия браузера по умолчанию(перезагрузка страницы при отправке формы)
    event.preventDefault();

      // вызов функции обратного вызова (callback), переданной в качестве свойства (prop). Компонент ожидает, что в свойстве onSubmit будет передана функция, которая будет вызвана при отправке формы.
    this.props.onSubmit({ name: this.state.name, number: this.state.number });

    // Вызов функции очистки полей формы
    this.reset();
  };

    
  // обработка события изменения значения ввода
 // name - атрибут name элемента формы, value - новое значение, введенное пользователем.
    handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Очистка полей формы
  reset = () => {
    this.setState({
      number: '',
      name: ''
    });
  };

  render() {
      return (
    
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label className={css.label}htmlFor={this.nameInputId}>
          Name
          <input className={css.input}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

          <label className={css.label} htmlFor={this.numberInputId}>
          Number
          <input className={css.input}
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

          {/* <button className={css.button} type="submit">Add contact </button> */}
           <button className={`${css.custom} ${css.btn12}`}><span>Click!</span><span>Add contact</span></button>
      </form>
    );
  }
}

export default ContactForm;