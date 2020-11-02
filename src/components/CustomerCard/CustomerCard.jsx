import React, { useState } from 'react'
import styles from './CustomerCard.module.scss'
import CustomerPopup from '../CustomerPopup/CustomerPopup'
import DeletePopup from '../DeletePopup/DeletePopup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const CustomerCard = ({ customer, editCustomer, deleteCustomer }) => {
  const { fullName, email, phone } = customer
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const handleEdit = editedCustomer => {
    editCustomer(editedCustomer)
    setEditOpen(false)
  }

  const handleDelete = () => {
    deleteCustomer(customer.id)
    setDeleteOpen(false)
  }

  return (
    <div className={styles.CustomerCard}>
      <div className={styles.CustomerCard__title}>
        <h3 className={styles.CustomerCard__title__name}>{fullName}</h3>
        <div className={styles.CustomerCard__title__actions}>
          <FontAwesomeIcon
            className={styles.CustomerCard__title__actions__icon}
            icon={faEdit}
            onClick={() => setEditOpen(true)}
          />
          <FontAwesomeIcon
            className={styles.CustomerCard__title__actions__icon}
            icon={faTrash}
            onClick={() => setDeleteOpen(true)}
          />
        </div>
      </div>
      <ul className={styles.CustomerCard__details}>
        <li className={styles.CustomerCard__details__item}>
          <strong>Email:</strong> {email}
        </li>
        <li className={styles.CustomerCard__details__item}>
          <strong>Phone:</strong> {phone}
        </li>
      </ul>
      <CustomerPopup
        open={editOpen}
        customer={customer}
        onSubmit={editedCustomer => handleEdit(editedCustomer)}
        onCancel={() => setEditOpen(false)}
      />
      <DeletePopup
        open={deleteOpen}
        itemName={fullName}
        onSubmit={() => handleDelete()}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  )
}

export default CustomerCard
