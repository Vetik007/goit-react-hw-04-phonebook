import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import contactsData from './data/contactsData.json';
import css from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState(contactsData);
  const [filter, setFilter] = useState('');

  // зчитуємо дані з localStorage
  // у масиві залежності вказуємо порожній масив [], що означає, що ефект буде виконано лише один раз - після першого рендерингу компонента.
  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    // Робимо перевірку на наявнясть у localStorage даних. Якщо так оновлюємо стан contacts у useState
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  // збереження даних у localStorage. В масив залежностей useEffect передаємо поточний стан елементу contacts який зберігається у хуку useState.
  // useEffect викликається при кожнній зміні стану contacts результатом чого є збереження оновленного масиву
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // Додаємо новий контакт до списку контактів
  const addContact = contact => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [
      { id: nanoid(), ...contact },
      ...prevContacts,
    ]);
  };

  // оновлюємо значення стану filter
  const changeFilter = event => {
    setFilter(event.target.value);
  };

  //отримуємо новий масив з контактів які відповідають фільтру
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // видалення контакту з масиву
  const removeContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== contactId)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className={css.wrapper}>
      <h1 className={css.book}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={css.cont}>Contacts</h2>
      {contacts.length > 0 ? (
        <Filter value={filter} onChangeFilter={changeFilter} />
      ) : (
        <p>There are no contacts in the phone book!</p>
      )}
      {contacts.length > 0 && (
        <ContactList
          contacts={visibleContacts}
          onRemoveContact={removeContact}
        />
      )}
    </div>
  );
};

export default App;

//! =========================================================
// !====================без хуков============================

// class App extends Component {
//   state = {
//     contacts: contacts,
//     filter: '',
//   };

//   // =====================================================
//   componentDidMount() {
//     // console.log('App componentDidMount');

//     const contacts = localStorage.getItem('contacts'); // читаем данные из локалстороджа
//     const parsedContacts = JSON.parse(contacts); // преобразуем строку в массив

//     // this.setState({ todos: parsedTodos }); // передаем в todos данные из локалстороджа. Если локалсторадж пустой будет ошибка т.к. в todos передастся null. Поэтому неоходима проверка

//     // делаем проверку - если в parsedTodos есть распаршенные данные передаем их в  todos. В противном случае if не выполнится
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   //! ===============================================
//   //? ===============================================
//   /**
//    * ! Параметры до момента обновления
//    * * prevProps - предыдущие пропсы
//    * * prevState - предыдущие стейты
//    *
//    *
//    */

//   componentDidUpdate(prevProps, prevState) {
//     // console.log('App componentDidUpdate');
//     // console.log(prevState); //отобразит предыдущий стейт
//     // console.log(this.state); // отобразит текущий стейт(после обновления)

//     const nextContacts = this.state.contacts; // текущий стейт
//     const prevContacts = prevState.contacts; // предыдущий стейт

//     if (nextContacts !== prevContacts) {
//       // console.log('Обновилось поле contacts, записываю todos в хранилище');
//       localStorage.setItem('contacts', JSON.stringify(nextContacts));
//     }

//     // if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
//     //   this.toggleModal();
//     // }
//   }

//   // =======================================================

//   // Добавление нового контакта в список контактов
//   addContact = contact => {
//     const isInContacts = this.state.contacts.some(
//       ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
//     );

//     if (isInContacts) {
//       alert(`${contact.name} is already in contacts`);
//       return;
//     }
//     this.setState(prevState => ({
//       contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
//     }));
//   };

//   // Изменение значения фильтра
//   changeFilter = event => {
//     this.setState({ filter: event.target.value });
//   };

//   // Получение отфильтрованных контактов
//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   // Удаление контакта из списка
//   removeContact = contactId => {
//     this.setState(prevState => {
//       return {
//         contacts: prevState.contacts.filter(({ id }) => id !== contactId),
//       };
//     });
//   };

//   render() {
//     const visibleContacts = this.getVisibleContacts();
//     const { filter } = this.state;

//     return (
//       <div className={css.wrapper}>
//         <h1>Phonebook</h1>

//         <ContactForm onSubmit={this.addContact} />

//         <h2>Contacts</h2>
//         {this.state.contacts.length > 0 ? (
//           // Фильтр для отображения контактов
//           <Filter value={filter} onChangeFilter={this.changeFilter} />
//         ) : (
//           <p>There are no contacts in the phone book!</p>
//         )}
//         {this.state.contacts.length > 0 && (
//           // Список контактов
//           <ContactList
//             contacts={visibleContacts}
//             onRemoveContact={this.removeContact}
//           />
//         )}
//       </div>
//     );
//   }
// }

// export default App;

// *================================================================
// *================================================================
