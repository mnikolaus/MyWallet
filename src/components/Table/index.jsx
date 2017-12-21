import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import './styles.scss';

const Table = ({ data, openPrompt }) => (
  <div className="container small">
    <div className="table">
      <table>
        <tbody>
          {
            data.list.map(line => (
              <tr key={line.currency}>
                <td>
                  {line.amount} <span className="currency">{line.currency}</span>
                </td>
                <td>
                  {numeral(line.changedAmount).format('0.00 a')} <span className="currency">{line.changedCurrency}</span>
                </td>
              </tr>
            ))
          }
        </tbody>
        <tfoot>
          <tr className="label">
            <td>
              Invested
            </td>
            <td>
              Total
            </td>
          </tr>
          <tr>
            { /* eslint-disable */}
            <td onClick={openPrompt} style={{ cursor: 'pointer' }}>
            { /* eslint-enable */}
              {numeral(data.invested.toFixed(2)).format('0.00 a')} <span className="currency">{data.defaultCurrency}</span>
            </td>
            <td>
              {numeral(data.sum.toFixed(2)).format('0.00 a')} <span className="currency">{data.defaultCurrency}</span>
            </td>
          </tr>
          <tr className="total">
            <td
              colSpan="2"
              style={{ background: data.sum - data.invested < 0 ? '#c0392b' : '#27ae60' }}
            >
              {numeral(data.sum.toFixed(2) - data.invested.toFixed(2)).format('0.00 a')} <span className="currency">{data.defaultCurrency}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
);

Table.propTypes = {
  data: PropTypes.shape({
    sum: PropTypes.number,
    list: PropTypes.array,
    defaultCurrency: PropTypes.string,
  }).isRequired,
  openPrompt: PropTypes.func.isRequired,
};

export default Table;
