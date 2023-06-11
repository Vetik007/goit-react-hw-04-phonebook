import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // проводимо генерацію унікальних id
  const nameInputId = nanoid();
  const numberInputId = nanoid();

  // функція обробки події відправки форми (onSubmit).
  const handleSubmit = event => {
    // скасування дії за замовчуванням - перезавантаження сторінки при відправленні форми
    event.preventDefault();
    // виклик функції яка передається до компоненту ContactForm в як властивістью До функції перадється об'єкт з властивостями name та number які є значеннями стану, що дозволяє передати значення форми до батьківського компоненту.
    onSubmit({ name, number });
    // очищення полей форми після відправки
    reset();
  };

  // Обробка події зміни значення в полі(input) - name (им`я поля), value (нове значення поля),
  const handleChange = event => {
    const { name, value } = event.target;
    // робимо перевірку значення name, Якщо name дорівнює 'name', викликається setName, яка відновлює стан name та якщо name дорівнює 'number', викликається setNumber, яка оновлює стан number
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label} htmlFor={nameInputId}>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+([' \-][a-zA-Zа-яА-Я]+)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label className={css.label} htmlFor={numberInputId}>
        Number
        <input
          className={css.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button className={`${css.custom} ${css.btn12}`} type="submit">
        <span>Click!</span>
        <span>Add contact</span>
      </button>
    </form>
  );
};

export default ContactForm;

// ===========================================
// import React from 'react';
// import { nanoid } from 'nanoid';
// import css from './ContactForm.module.css';

// class ContactForm extends React.Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   // Генерируем уникальные id
//   nameInputId = nanoid();
//   numberInputId = nanoid();

//   // метод обработки события отправки формы (onSubmit).
//   handleSubmit = event => {
//     // отмена действия браузера по умолчанию(перезагрузка страницы при отправке формы)
//     event.preventDefault();

//     // вызов функции обратного вызова (callback), переданной в качестве свойства (prop). Компонент ожидает, что в свойстве onSubmit будет передана функция, которая будет вызвана при отправке формы.
//     this.props.onSubmit({ name: this.state.name, number: this.state.number });

//     // Вызов функции очистки полей формы
//     this.reset();
//   };

//   // обработка события изменения значения ввода
//   // name - атрибут name элемента формы, value - новое значение, введенное пользователем.
//   handleChange = event => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   // Очистка полей формы
//   reset = () => {
//     this.setState({
//       number: '',
//       name: '',
//     });
//   };

//   render() {
//     return (
//       <form className={css.form} onSubmit={this.handleSubmit}>
//         <label className={css.label} htmlFor={this.nameInputId}>
//           Name
//           <input
//             className={css.input}
//             type="text"
//             name="name"
//             value={this.state.name}
//             onChange={this.handleChange}
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             required
//           />
//         </label>

//         <label className={css.label} htmlFor={this.numberInputId}>
//           Number
//           <input
//             className={css.input}
//             type="tel"
//             name="number"
//             value={this.state.number}
//             onChange={this.handleChange}
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//           />
//         </label>

//         {/* <button className={css.button} type="submit">Add contact </button> */}
//         <button className={`${css.custom} ${css.btn12}`}>
//           <span>Click!</span>
//           <span>Add contact</span>
//         </button>
//       </form>
//     );
//   }
// }

// export default ContactForm;
