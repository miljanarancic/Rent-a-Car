import React from 'react'
import styles from './DeletePopup.module.scss'
import Popup from '../Popup/Popup'
import Button from '../Button/Button'

const DeletePopup = ({ open, itemName, onCancel, onSubmit }) => (
  <Popup open={open}>
    <p>Are you sure you want to delete {itemName}</p>
    <div className={styles.DeletePopup__actions}>
      <Button text="Cancel" onClick={onCancel} />
      <Button text="Delete" onClick={onSubmit} />
    </div>
  </Popup>
)

export default DeletePopup
