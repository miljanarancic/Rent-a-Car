import React, { useState } from 'react'
import styles from './RentACar.module.scss'
import RentACarCard from '../../components/RentACarCard/RentACarCard'
import RentACarPopup from '../../components/RentACarPopup/RentACarPopup'
import Button from '../../components/Button/Button'

const RentACar = () => {
  const [rentOpen, setRentOpen] = useState(false)
  const [rents, setRents] = useState(JSON.parse(localStorage.getItem('rents')) || [])
  const [vehicles, setVehicles] = useState(JSON.parse(localStorage.getItem('vehicles')) || [])
  const customers = JSON.parse(localStorage.getItem('customers')) || []

  const addRent = rent => {
    const vehicle = vehicles.find(vehicleItem => vehicleItem.id === rent.vehicle)
    const customer = customers.find(customerItem => customerItem.id === rent.customer)
    const newVehicles = vehicles.map(vehicleItem =>
      vehicleItem.id === rent.vehicle ? { ...vehicleItem, count: +vehicleItem.count - 1 } : vehicleItem)

    const rentObject = {
      ...rent,
      customer: `${customer.fullName} (${customer.email})`,
      vehicle: `${vehicle.model} (${vehicle.constructionYear})`
    }

    if (rents.length) {
      localStorage.setItem('rents', JSON.stringify([...rents, rentObject]))
    } else {
      localStorage.setItem('rents', JSON.stringify([rentObject]))
    }

    localStorage.setItem('vehicles', JSON.stringify(newVehicles))
    setRents([ ...rents, rentObject])
    setRentOpen(false)
    setVehicles(newVehicles)
  }

  return (
    <div className={styles.RentACar}>
      <div className={styles.RentACar__header}>
        <h1>Rent-a-Car</h1>
        <Button
          text="Rent-a-Car"
          onClick={() => setRentOpen(true)}
        />
      </div>
      <div className={styles.RentACar__list}>
        {rents && rents.length
          ? rents.map((rent, index) =>
            <RentACarCard
              key={index}
              rent={rent}
              rentRent={() => setRentOpen(true)}
            />
          )
          : <p className={styles['RentACar__no-items']}>No rents added...</p>
        }
      </div>
      <RentACarPopup
        open={rentOpen}
        vehicles={vehicles}
        customers={customers}
        onSubmit={rent => addRent(rent)}
        onCancel={() => setRentOpen(false)}
      />
    </div>
  )
}

export default RentACar
