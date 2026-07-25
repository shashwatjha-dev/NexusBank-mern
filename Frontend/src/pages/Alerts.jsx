import React, { useState, useEffect } from 'react'
import './Alerts.css'

export default function Alerts() {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    // Simulate fetching alerts
    setAlerts([
      {
        id: 1,
        type: 'high',
        title: 'High-Risk Transaction Detected',
        message: 'A transaction of $5,000 was flagged by our AI system due to unusual activity patterns.',
        timestamp: '2024-01-15 14:30:00',
        read: false
      },
      {
        id: 2,
        type: 'medium',
        title: 'New Device Login',
        message: 'Your account was accessed from a new device in New York.',
        timestamp: '2024-01-14 09:15:00',
        read: false
      },
      {
        id: 3,
        type: 'low',
        title: 'Password Change Reminder',
        message: 'It\'s been 90 days since your last password change. Consider updating it for security.',
        timestamp: '2024-01-13 16:45:00',
        read: true
      },
      {
        id: 4,
        type: 'high',
        title: 'Multiple Failed Login Attempts',
        message: 'We detected 3 failed login attempts from an unrecognized location.',
        timestamp: '2024-01-12 11:20:00',
        read: true
      },
      {
        id: 5,
        type: 'medium',
        title: 'Unusual Spending Pattern',
        message: 'Your spending is 40% higher than usual this week.',
        timestamp: '2024-01-11 13:00:00',
        read: true
      }
    ])
  }, [])

  const markAsRead = (id) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, read: true } : alert
    ))
  }

  const getAlertClass = (type) => {
    switch (type) {
      case 'high': return 'alert-high'
      case 'medium': return 'alert-medium'
      case 'low': return 'alert-low'
      default: return ''
    }
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'high': return '🚨'
      case 'medium': return '⚠️'
      case 'low': return 'ℹ️'
      default: return '📢'
    }
  }

  const unreadCount = alerts.filter(a => !a.read).length

  return (
    <div className="alerts-page">
      <div className="page-header">
        <div>
          <h1>Alerts & Notifications</h1>
          <p>Security alerts and important notifications</p>
        </div>
        {unreadCount > 0 && (
          <span className="unread-badge">
            {unreadCount} Unread
          </span>
        )}
      </div>

      <div className="alerts-container">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className={`alert-item card ${getAlertClass(alert.type)} ${alert.read ? 'read' : 'unread'}`}
          >
            <div className="alert-icon">
              {getAlertIcon(alert.type)}
            </div>
            <div className="alert-content">
              <div className="alert-header">
                <h3>{alert.title}</h3>
                {!alert.read && <span className="new-badge">NEW</span>}
              </div>
              <p className="alert-message">{alert.message}</p>
              <div className="alert-footer">
                <span className="alert-time">{alert.timestamp}</span>
                {!alert.read && (
                  <button
                    className="btn-mark-read"
                    onClick={() => markAsRead(alert.id)}
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}