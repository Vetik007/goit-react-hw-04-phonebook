import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css'

// Компонент списка контактов
const ContactList = ({ contacts, onRemoveContact }) => (
  <ul className={css.list}>
    {contacts.map(contact => (
      <li className={css.item} key={contact.id}>
        <p className={css.text}>{contact.name + ' : ' + contact.number}</p>
        {
          // Кнопка удаления контакта

          <button className={`${css.custom} ${css.btn9}`}
            type="button"
            name="delete"
            onClick={() => onRemoveContact(contact.id)}
          >
            delete
                    
          </button>



          // <button className={css.button}
          //   type="button"
          //   name="delete"
          //   onClick={() => onRemoveContact(contact.id)}
          // >
          //   delete
          // </button>
        }
      </li>
    ))}
  </ul>

  
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemoveContact: PropTypes.func.isRequired,
};

export default ContactList;