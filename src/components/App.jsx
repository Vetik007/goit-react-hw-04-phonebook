import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import contacts from './data/contactsData.json';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: contacts,
    filter: '',
  };

  // =====================================================
  componentDidMount() {
    // console.log('App componentDidMount');

    const contacts = localStorage.getItem('contacts'); // читаем данные из локалстороджа
    const parsedContacts = JSON.parse(contacts); // преобразуем строку в массив

    // this.setState({ todos: parsedTodos }); // передаем в todos данные из локалстороджа. Если локалсторадж пустой будет ошибка т.к. в todos передастся null. Поэтому неоходима проверка

    // делаем проверку - если в parsedTodos есть распаршенные данные передаем их в  todos. В противном случае if не выполнится
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  //! ===============================================
  //? ===============================================
  /**
   * ! Параметры до момента обновления
   * * prevProps - предыдущие пропсы
   * * prevState - предыдущие стейты
   *
   *
   */

  componentDidUpdate(prevProps, prevState) {
    // console.log('App componentDidUpdate');
    // console.log(prevState); //отобразит предыдущий стейт
    // console.log(this.state); // отобразит текущий стейт(после обновления)

    const nextContacts = this.state.contacts; // текущий стейт
    const prevContacts = prevState.contacts; // предыдущий стейт

    if (nextContacts !== prevContacts) {
      // console.log('Обновилось поле contacts, записываю todos в хранилище');
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }

    // if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
    //   this.toggleModal();
    // }
  }

  // =======================================================

  // Добавление нового контакта в список контактов
  addContact = contact => {
    const isInContacts = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
    }));
  };

  // Изменение значения фильтра
  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  // Получение отфильтрованных контактов
  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // Удаление контакта из списка
  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { filter } = this.state;

    return (
      <div className={css.wrapper}>
        <h1>Phonebook</h1>

        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        {this.state.contacts.length > 0 ? (
          // Фильтр для отображения контактов
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        ) : (
          <p>There are no contacts in the phone book!</p>
        )}
        {this.state.contacts.length > 0 && (
          // Список контактов
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          />
        )}
      </div>
    );
  }
}

export default App;
