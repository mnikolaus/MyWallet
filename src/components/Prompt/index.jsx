import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Prompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invested: this.props.invested,
    };
  }

  render() {
    return (
      <section className="popup-container">
        <div className="popup">
          <header>
            <h4>Update your investment</h4>
          </header>
          <div className="content">
            <input
              onChange={e => this.setState({ invested: e.target.value })}
              type="text"
              value={this.state.invested}
            />
          </div>
          <footer>
            <button
              className="save"
              onClick={() => this.props.onSave(this.state.invested)}
            >
              Save
            </button>
            <button
              onClick={this.props.onCancel}
            >
              Cancel
            </button>
          </footer>
        </div>
      </section>
    );
  }
}

Prompt.propTypes = {
  invested: PropTypes.number.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Prompt;
