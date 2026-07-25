import React from 'react'
import './TransactionCard.css'

export default function TransactionCard({ transaction }) {
  const { id, type, amount, description, date, status, fraudScore } = transaction

  const getStatusClass = () => {
    if (status === 'completed') return 'status-success'
    if (status === 'pending') return 'status-warning'
    if (status === 'flagged') return 'status-danger'
    return ''
  }

  const getTypeIcon = () => {
    return type === 'credit' ? '↓' : '↑'
  }

  return (
    <div className="transaction-card">
      <div className="transaction-icon">
        <span className={`icon-${type}`}>{getTypeIcon()}</span>
      </div>
      
      <div className="transaction-details">
        <div className="transaction-header">
          <h4>{description}</h4>
          <span className={`transaction-amount ${type}`}>
            {type === 'credit' ? '+' : '-'}${amount.toFixed(2)}
          </span>
        </div>
        
        <div className="transaction-meta">
          <span className="transaction-date">{date}</span>
          <span className={`transaction-status ${getStatusClass()}`}>
            {status}
          </span>
        </div>
        
        {fraudScore !== undefined && (
          <div className="transaction-fraud">
            <span className="fraud-label">Fraud Score:</span>
            <span className={`fraud-score ${fraudScore > 0.7 ? 'high' : fraudScore > 0.4 ? 'medium' : 'low'}`}>
              {(fraudScore * 100).toFixed(1)}%
            </span>
          </div>
        )}
      </div>
    </div>
  )
}