import React, { useState, useEffect } from 'react'
import styles from './CustomerPopup.module.scss'
import Popup from '../Popup/Popup'
import Input from '../Input/Input'
import Button from '../Button/Button'

const CustomerPopup = ({ open, customer, onSubmit, onCancel }) => {
  const [id, setId] = useState(customer ? customer.id : null)
  const [fullName, setFullName] = useState(customer ? customer.fullName : '')
  const [email, setEmail] = useState(customer ? customer.email : '')
  const [phone, setPhone] = useState(customer ? customer.phone : '')

  useEffect(() => {
    if (!open) {
      setId(customer ? customer.id : null)
      setFullName(customer ? customer.fullName : '')
      setEmail(customer ? customer.email : '')
      setPhone(customer ? customer.phone : '')
    }
  }, [open, customer])

  return (
    <Popup open={open} onSubmit={() => onSubmit({ id, fullName, email, phone })}>
      <Input
        label="Full name:"
        type="text"
        value={fullName}
        onChange={event => setFullName(event.target.value)}
        required
      />
      <Input
        label="Email:"
        type="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
        required
      />
      <Input
        label="Phone:"
        type="phone"
        value={phone}
        onChange={event => setPhone(event.target.value)}
        required
      />
      <div className={styles.CustomerPopup__actions}>
        <Button text="Cancel" onClick={onCancel} />
        <Button type="submit" text="Save" />
      </div>
    </Popup>
  )
}

export default CustomerPopup
