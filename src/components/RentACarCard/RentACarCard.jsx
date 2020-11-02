import React from 'react'
import styles from './RentACarCard.module.scss'

const RentACarCard = ({ rent }) => {
  const { startDate, endDate, vehicle, customer, price } = rent

  return (
    <div className={styles.CustomerCard}>
      <div className={styles.CustomerCard__title}>
        <h3 className={styles.CustomerCard__title__name}>{startDate.split('T')[0]} - {endDate.split('T')[0]}</h3>
      </div>
      <ul className={styles.CustomerCard__details}>
        <li className={styles.CustomerCard__details__item}>
          <strong>Vehicle:</strong> {vehicle}
        </li>
        <li className={styles.CustomerCard__details__item}>
          <strong>Customer:</strong> {customer}
        </li>
        <li className={styles.CustomerCard__details__item}>
          <strong>Price:</strong> {price}€
        </li>
      </ul>
    </div>
  )
}

export default RentACarCard
