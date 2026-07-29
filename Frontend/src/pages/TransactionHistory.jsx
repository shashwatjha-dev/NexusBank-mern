import React, { useState, useEffect } from 'react'
import TransactionCard from '../components/TransactionCard'
import './TransactionHistory.css'

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Simulate fetching transactions
    const dummyTransactions = [
      { id: 1, type: 'credit', amount: 2500, description: 'Salary Deposit', date: '2024-01-15', status: 'completed', fraudScore: 0.05 },
      { id: 2, type: 'debit', amount: 150, description: 'Grocery Store', date: '2024-01-14', status: 'completed', fraudScore: 0.12 },
      { id: 3, type: 'debit', amount: 5000, description: 'Large Purchase', date: '2024-01-14', status: 'flagged', fraudScore: 0.85 },
      { id: 4, type: 'debit', amount: 75, description: 'Gas Station', date: '2024-01-13', status: 'completed', fraudScore: 0.08 },
      { id: 5, type: 'credit', amount: 300, description: 'Freelance Payment', date: '2024-01-12', status: 'completed', fraudScore: 0.15 },
      { id: 6, type: 'debit', amount: 1200, description: 'Rent Payment', date: '2024-01-12', status: 'completed', fraudScore: 0.22 },
      { id: 7, type: 'debit', amount: 45, description: 'Coffee Shop', date: '2024-01-11', status: 'completed', fraudScore: 0.04 },
      { id: 8, type: 'credit', amount: 500, description: 'Refund', date: '2024-01-10', status: 'pending', fraudScore: 0.18 }
    ]
    setTransactions(dummyTransactions)
    setFilteredTransactions(dummyTransactions)
  }, [])

  useEffect(() => {
    let filtered = transactions

    if (filter !== 'all') {
      filtered = filtered.filter(t => t.type === filter)
    }

    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredTransactions(filtered)
  }, [filter, searchTerm, transactions])

  return (
    <div className="transaction-history-page">
      <div className="page-header">
        <div>
          <h1>Transaction History</h1>
          <p>View all your transactions and activity</p>
        </div>
      </div>

      <div className="filters-bar card">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'credit' ? 'active' : ''}`}
            onClick={() => setFilter('credit')}
          >
            Credits
          </button>
          <button
            className={`filter-btn ${filter === 'debit' ? 'active' : ''}`}
            onClick={() => setFilter('debit')}
          >
            Debits
          </button>
        </div>
      </div>

      <div className="transactions-container">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <div className="no-transactions">
            <p>No transactions found</p>
          </div>
        )}
      </div>
    </div>
  )
}