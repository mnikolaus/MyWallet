import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Loader = ({ text }) => (
  <div className="loader">
    <div className="content">
      {text}
    </div>
  </div>
);

Loader.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Loader;
