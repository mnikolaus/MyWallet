import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import currencies from '../../constants/currencies';
import './styles.scss';

const Header = ({ changeCurrency, currency }) => (
  <header className="main">
    <div className="container">
      <div className="left">
        <h1>
          My Wallet
        </h1>
      </div>
      <div className="right" style={{ width: '100px' }}>
        <Select
          clearable={false}
          onChange={val => changeCurrency(val.value)}
          options={currencies}
          searchable={false}
          value={currency}
        />
      </div>
    </div>
  </header>
);

Header.propTypes = {
  changeCurrency: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
};

export default Header;
