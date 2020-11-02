import React from 'react'
import styles from './Popup.module.scss'

const Popup = ({ open, onSubmit, children }) => {
  const handleSubmit = event => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <div className={`${styles.Popup} ${open ? styles['Popup--open'] : ''}`}>
      <form className={styles.Popup__content} onSubmit={handleSubmit}>
        {children}
      </form>
    </div>
  )
}

export default Popup
