import React, { useState, useEffect } from 'react'
import FraudScoreDisplay from '../components/FraudScoreDisplay'
import './Transfer.css'

export default function Transfer() {
  const [beneficiaries, setBeneficiaries] = useState([])
  const [formData, setFormData] = useState({
    beneficiary: '',
    amount: '',
    description: ''
  })
  const [fraudScore, setFraudScore] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // Simulate fetching beneficiaries
    setBeneficiaries([
      { id: 1, name: 'John Doe', account: '****1234' },
      { id: 2, name: 'Jane Smith', account: '****5678' },
      { id: 3, name: 'Bob Johnson', account: '****9012' }
    ])
  }, [])

  const calculateFraudScore = (amount) => {
    // Simulate AI fraud detection
    let score = 0.05
    if (amount > 5000) score = 0.85
    else if (amount > 1000) score = 0.45
    else if (amount > 500) score = 0.25
    return score
  }

  const handleAmountChange = (value) => {
    setFormData({ ...formData, amount: value })
    if (value) {
      const score = calculateFraudScore(parseFloat(value))
      setFraudScore(score)
    } else {
      setFraudScore(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSuccess(true)
    setLoading(false)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSuccess(false)
      setFormData({ beneficiary: '', amount: '', description: '' })
      setFraudScore(null)
    }, 3000)
  }

  return (
    <div className="transfer-page">
      <div className="page-header">
        <h1>Transfer Money</h1>
        <p>Send money securely with AI fraud detection</p>
      </div>

      <div className="transfer-container">
        <div className="transfer-form-section">
          {success && (
            <div className="alert alert-success">
              Transfer completed successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="transfer-form card">
            <h2>Transfer Details</h2>

            <div className="input-group">
              <label>Select Beneficiary</label>
              <select
                value={formData.beneficiary}
                onChange={(e) => setFormData({ ...formData, beneficiary: e.target.value })}
                required
              >
                <option value="">Choose a beneficiary</option>
                {beneficiaries.map(ben => (
                  <option key={ben.id} value={ben.id}>
                    {ben.name} - {ben.account}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Amount ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>

            <div className="input-group">
              <label>Description (Optional)</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="What's this transfer for?"
                rows="3"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading || !formData.beneficiary || !formData.amount}
            >
              {loading ? 'Processing...' : 'Transfer Money'}
            </button>
          </form>

          <div className="transfer-info card">
            <h3>Transfer Information</h3>
            <div className="info-item">
              <span>Processing Time</span>
              <strong>Instant</strong>
            </div>
            <div className="info-item">
              <span>Transaction Fee</span>
              <strong>$0.00</strong>
            </div>
            <div className="info-item">
              <span>Daily Limit</span>
              <strong>$10,000</strong>
            </div>
          </div>
        </div>

        <div className="fraud-detection-section">
          <div className="card">
            <h2>AI Fraud Detection</h2>
            {fraudScore !== null ? (
              <FraudScoreDisplay score={fraudScore} size="large" />
            ) : (
              <div className="no-analysis">
                <p>Enter an amount to analyze fraud risk</p>
              </div>
            )}
          </div>

          <div className="card security-features">
            <h3>Security Features</h3>
            <ul className="features-list">
              <li>
                <span>✓</span>
                <span>Real-time AI analysis</span>
              </li>
              <li>
                <span>✓</span>
                <span>256-bit encryption</span>
              </li>
              <li>
                <span>✓</span>
                <span>Two-factor authentication</span>
              </li>
              <li>
                <span>✓</span>
                <span>Instant fraud alerts</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}