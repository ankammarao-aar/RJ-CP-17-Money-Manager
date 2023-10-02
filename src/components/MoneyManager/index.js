import {Component} from 'react'
import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    inputTitle: '',
    inputAmount: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionsList: [],
  }

  onChangeTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({inputAmount: event.target.value})
  }

  onChangeType = event => {
    this.setState({optionId: event.target.value})
  }

  addTransaction = event => {
    event.preventDefault()
    const {inputTitle, inputAmount, optionId} = this.state

    const findOptionType = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = findOptionType

    const newTransaction = {
      id: v4(),
      title: inputTitle,
      amount: parseInt(inputAmount),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      inputTitle: '',
      inputAmount: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTransactionItem = id => {
    const {transactionsList} = this.state
    const updateList = transactionsList.filter(eachItem => eachItem.id !== id)

    this.setState({transactionsList: updateList})
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0

    transactionsList.forEach(eachIncome => {
      if (eachIncome.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachIncome.amount
      }
    })
    return incomeAmount
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachIncome => {
      if (eachIncome.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachIncome.amount
      }
    })
    return expensesAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachIncome => {
      if (eachIncome.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachIncome.amount
      } else {
        expensesAmount += eachIncome.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  render() {
    const {inputTitle, inputAmount, optionId, transactionsList} = this.state
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    const balanceAmount = this.getBalance()

    return (
      <div className="bg-container">
        <div className="heading-card">
          <h1 className="richard-name">Hi, Richard</h1>
          <p className="welcome-para">
            Welcome back to your
            <span className="money-para"> Money Manager</span>
          </p>
        </div>

        <div className="money-details-card">
          <MoneyDetails
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
            balanceAmount={balanceAmount}
          />
        </div>

        <div className="form-card">
          <form className="form" onSubmit={this.addTransaction}>
            <h1 className="add-name">Add Transaction</h1>

            <label htmlFor="title" className="labels">
              TITLE
            </label>
            <input
              type="text"
              id="title"
              placeholder="TITLE"
              className="input"
              value={inputTitle}
              onChange={this.onChangeTitle}
            />

            <label htmlFor="amount" className="labels">
              AMOUNT
            </label>
            <input
              type="text"
              id="amount"
              placeholder="AMOUNT"
              className="input"
              value={inputAmount}
              onChange={this.onChangeAmount}
            />

            <label htmlFor="type" className="labels">
              TYPE
            </label>
            <select
              id="type"
              className="input"
              value={optionId}
              onChange={this.onChangeType}
            >
              {transactionTypeOptions.map(eachOption => (
                <option key={eachOption.optionId} value={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>

            <div>
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
          </form>

          <ul className="list-container">
            <h1 className="history-name">History</h1>
            <li className="title-row">
              <p className="text">Title</p>
              <p className="text">Amount</p>
              <p className="text">Type</p>
            </li>
            {transactionsList.map(each => (
              <TransactionItem
                key={each.id}
                transactionDetails={each}
                onChangeTransactionItem={this.onChangeTransactionItem}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MoneyManager
