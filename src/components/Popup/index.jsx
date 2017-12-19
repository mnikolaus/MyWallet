import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './styles.scss';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newAmount: 0,
      newCurrency: 'BTC',
      userList: this.props.userList || [],
    };
    this.addToList = this.addToList.bind(this);
    this.generateUserList = this.generateUserList.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.removeFromList = this.removeFromList.bind(this);
  }

  addToList() {
    const newList = this.state.userList.slice(0);
    newList.push({
      amount: this.state.newAmount,
      currency: this.state.newCurrency,
    });
    this.setState({
      userList: newList,
      newAmount: 0,
      newCurrency: 'BTC',
    });
  }

  removeFromList(index) {
    this.setState({
      userList: this.state.userList.filter((a, i) => i !== index),
    });
  }

  generateUserList(list) {
    return list.map((item, i) => (
      <tr key={`${item.currencyList}-${item.amount}`}>
        <td>
          <button
            className="delete"
            onClick={() => this.removeFromList(i)}
          >
            -
          </button>
          <input type="number" value={item.amount} />
        </td>
        <td>
          {item.currency}
        </td>
      </tr>
    ));
  }

  handleSave() {
    this.props.onSave(this.state.userList);
  }

  render() {
    return (
      <section className="popup-container">
        <div className="popup">
          <header>
            <h4>Update your list</h4>
          </header>
          <div className="content">
            <table>
              <tbody>
                {this.state.userList && this.generateUserList(this.state.userList)}
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <input
                      onChange={e => this.setState({ newAmount: e.target.value })}
                      type="number"
                      value={this.state.newAmount}
                    />
                  </td>
                  <td>
                    <Select
                      clearable={false}
                      options={this.props.currencyList}
                      onChange={val => this.setState({ newCurrency: val.value })}
                      value={this.state.newCurrency}
                    />
                    <br />
                    <button
                      onClick={this.addToList}
                    >
                      Add
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <footer>
            <button
              className="save"
              onClick={this.handleSave}
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

Popup.propTypes = {
  currencyList: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  userList: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

Popup.defaultProps = {
  userList: null,
};

export default Popup;
