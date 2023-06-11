// import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

// Компонент фильтрации контактов
function Filter({ value, onChangeFilter }) {
  return (
    <div className={css.wrapper}>
      <label className={css.label}>
        Find contacts by name
        <input className={css.input} type="text" value={value} onChange={onChangeFilter} />
      </label>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;