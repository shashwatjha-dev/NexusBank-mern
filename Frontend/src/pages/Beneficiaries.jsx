import React, { useState, useEffect } from 'react'
import './Beneficiaries.css'

export default function Beneficiaries() {
  const [beneficiaries, setBeneficiaries] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    account: '',
    bank: ''
  })

  useEffect(() => {
    // Simulate fetching beneficiaries
    setBeneficiaries([
      { id: 1, name: 'John Doe', account: '****1234', bank: 'Chase Bank' },
      { id: 2, name: 'Jane Smith', account: '****5678', bank: 'Bank of America' },
      { id: 3, name: 'Bob Johnson', account: '****9012', bank: 'Wells Fargo' },
      { id: 4, name: 'Alice Williams', account: '****3456', bank: 'Citibank' }
    ])
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newBeneficiary = {
      id: beneficiaries.length + 1,
      ...formData
    }
    setBeneficiaries([...beneficiaries, newBeneficiary])
    setFormData({ name: '', account: '', bank: '' })
    setShowModal(false)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this beneficiary?')) {
      setBeneficiaries(beneficiaries.filter(b => b.id !== id))
    }
  }

  return (
    <div className="beneficiaries-page">
      <div className="page-header">
        <div>
          <h1>Beneficiaries</h1>
          <p>Manage your saved beneficiaries</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Beneficiary
        </button>
      </div>

      <div className="beneficiaries-grid">
        {beneficiaries.map(beneficiary => (
          <div key={beneficiary.id} className="beneficiary-card card">
            <div className="beneficiary-avatar">
              {beneficiary.name.charAt(0)}
            </div>
            <div className="beneficiary-info">
              <h3>{beneficiary.name}</h3>
              <p className="beneficiary-account">{beneficiary.account}</p>
              <p className="beneficiary-bank">{beneficiary.bank}</p>
            </div>
            <div className="beneficiary-actions">
              <button className="btn-icon btn-edit" title="Edit">
                ✏️
              </button>
              <button
                className="btn-icon btn-delete"
                onClick={() => handleDelete(beneficiary.id)}
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Beneficiary</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <label>Account Number</label>
                <input
                  type="text"
                  value={formData.account}
                  onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <label>Bank Name</label>
                <input
                  type="text"
                  value={formData.bank}
                  onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Beneficiary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}