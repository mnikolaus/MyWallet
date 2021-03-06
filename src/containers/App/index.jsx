import React, { Component } from 'react';
import Loader from '../../components/Loader';
import Header from '../../components/Header';
import Table from '../../components/Table';
import Popup from '../../components/Popup';
import Prompt from '../../components/Prompt';
import api from './actions';
import { get } from 'lodash';
import '../../styles/globals.scss';

const calculateStuff = (list, rates, defaultCurrency, invested) => {
  let sum = 0;
  const newList = list.map((item) => {
    debugger;
    const newAmount = get(rates, '[item.currency]') ? Number(parseFloat(item.amount) * rates[item.currency][defaultCurrency]).toFixed(2) : 0; // eslint-disable-line max-len
    sum += parseFloat(newAmount);
    return Object.assign({}, item, {
      changedAmount: newAmount === 0 ? '-' : newAmount,
      changedCurrency: defaultCurrency,
    });
  });
  return {
    sum,
    list: newList,
    defaultCurrency,
    invested: parseFloat(invested),
  };
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      currency: localStorage.getItem('defaultCurrency') || 'EUR',
      currencyList: JSON.parse(localStorage.getItem('currencyList')),
      invested: localStorage.getItem('invested') || 0,
      loading: 'Loading...',
      popup: false,
      userList: JSON.parse(localStorage.getItem('userList')),
    };
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleUserListChange = this.handleUserListChange.bind(this);
    this.handleInvestedChange = this.handleInvestedChange.bind(this);
    this.getExchangeRates = this.getExchangeRates.bind(this);
  }

  componentDidMount() {
    if (!this.state.currencyList) {
      api.getCryptoList().then((result) => {
        this.setState({ currencyList: result, loading: '' });
      }).then(() => {

      });
    } else if (this.state.userList) {
      this.getExchangeRates(this.state.userList, this.state.currency);
    } else {
      this.setState({ loading: '' }); // eslint-disable-line
    }
  }

  componentDidUpdate() {
    if (this.state.loading && this.state.userList) {
      this.getExchangeRates(this.state.userList, this.state.currency);
    }
  }

  getExchangeRates(cryptoCurrencies, realCurrency) {
    const currencies = cryptoCurrencies.map(cur => cur.currency);
    const endpointUrl = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${currencies.join(',')}&tsyms=${realCurrency}`;
    fetch(endpointUrl)
      .then(response => response.json())
      .then((result) => {
        this.setState({
          exchangeRates: result,
          loading: '',
        });
      });
  }

  handleCurrencyChange(currency) {
    this.setState({
      currency,
      invested: '0',
      loading: 'calculating',
    });
    localStorage.setItem('defaultCurrency', currency);
  }

  handleUserListChange(newList) {
    this.setState({
      loading: 'calculating',
      popup: false,
      userList: newList,
    });
    localStorage.setItem('userList', JSON.stringify(newList));
  }

  handleInvestedChange(invested) {
    this.setState({
      invested,
      prompt: false,
    });
    localStorage.setItem('invested', invested);
  }

  render() {
    const {
      currency,
      currencyList,
      exchangeRates,
      invested,
      loading,
      popup,
      prompt,
      userList,
    } = this.state;

    if (loading) {
      return <Loader text={loading} />;
    }
    return (
      <section>
        <Header
          changeCurrency={this.handleCurrencyChange}
          currency={currency}
        />
        <div className="container small">
          <button
            className="edit"
            onClick={() => this.setState({ popup: true })}
          >
            Edit list
          </button>
          {
            userList && exchangeRates &&
            <Table
              data={
                calculateStuff(userList, exchangeRates, currency, invested)
              }
              openPrompt={() => this.setState({ prompt: true })}
            />
          }
          {
            !userList &&
            <div>No data yet</div>
          }
        </div>
        {
          popup &&
          <Popup
            currencyList={currencyList}
            userList={userList}
            onCancel={() => this.setState({ popup: false })}
            onSave={this.handleUserListChange}
          />
        }
        {
          prompt &&
          <Prompt
            invested={invested}
            onCancel={() => this.setState({ prompt: false })}
            onSave={this.handleInvestedChange}
          />
        }
      </section>
    );
  }
}

export default App;
