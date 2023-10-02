// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onChangeTransactionItem} = props
  const {id, title, amount, type} = transactionDetails

  const onDeleteItem = () => {
    onChangeTransactionItem(id)
  }

  return (
    <li className="transaction-items">
      <p className="transaction-para">{title}</p>
      <p className="transaction-para">{amount}</p>
      <p className="transaction-para">{type}</p>
      <button
        type="button"
        className="delete-button"
        onClick={onDeleteItem}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default TransactionItem
