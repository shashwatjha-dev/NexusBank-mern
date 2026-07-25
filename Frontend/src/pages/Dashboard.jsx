import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import TransactionCard from '../components/TransactionCard'
import './Dashboard.css'

export default function Dashboard() {
  const { user } = useAuth()
  const [balance, setBalance] = useState(0)
  const [recentTransactions, setRecentTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBalance(15432.50)
      setRecentTransactions([
        {
          id: 1,
          type: 'credit',
          amount: 2500,
          description: 'Salary Deposit',
          date: '2024-01-15',
          status: 'completed',
          fraudScore: 0.05
        },
        {
          id: 2,
          type: 'debit',
          amount: 150.00,
          description: 'Grocery Store',
          date: '2024-01-14',
          status: 'completed',
          fraudScore: 0.12
        },
        {
          id: 3,
          type: 'debit',
          amount: 75.50,
          description: 'Gas Station',
          date: '2024-01-14',
          status: 'completed',
          fraudScore: 0.08
        },
        {
          id: 4,
          type: 'credit',
          amount: 300,
          description: 'Freelance Payment',
          date: '2024-01-13',
          status: 'completed',
          fraudScore: 0.15
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-spinner">Loading...</div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.name}!</h1>
          <p>Here's your account overview</p>
        </div>
        <Link to="/transfer" className="btn btn-primary">
          Transfer Money
        </Link>
      </div>

      <div className="dashboard-grid">
        {/* Balance Card */}
        <div className="balance-card card">
          <div className="balance-header">
            <h3>Available Balance</h3>
            <span className="balance-status">● Active</span>
          </div>
          <div className="balance-amount">
            ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="balance-footer">
            <span>Account ending in ****1234</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions card">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <Link to="/transfer" className="action-btn">
              <span className="action-icon">💸</span>
              <span>Transfer</span>
            </Link>
            <Link to="/beneficiaries" className="action-btn">
              <span className="action-icon">👥</span>
              <span>Beneficiaries</span>
            </Link>
            <Link to="/transactions" className="action-btn">
              <span className="action-icon">📊</span>
              <span>History</span>
            </Link>
            <Link to="/profile" className="action-btn">
              <span className="action-icon">⚙️</span>
              <span>Settings</span>
            </Link>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="recent-transactions">
          <div className="section-header">
            <h2>Recent Transactions</h2>
            <Link to="/transactions" className="view-all-link">
              View All →
            </Link>
          </div>
          <div className="transactions-list">
            {recentTransactions.map(transaction => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>

        {/* Security Alert */}
        <div className="security-alert card">
          <div className="alert-header">
            <span className="alert-icon">🛡️</span>
            <h3>Security Status</h3>
          </div>
          <p className="alert-message">
            Your account is secure. No suspicious activity detected.
          </p>
          <Link to="/alerts" className="btn btn-outline btn-small">
            View Security Details
          </Link>
        </div>
      </div>
    </div>
  )
}