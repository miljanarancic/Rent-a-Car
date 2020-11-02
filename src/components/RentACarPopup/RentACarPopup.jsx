import React, { useState, useEffect } from 'react'
import styles from './RentACarPopup.module.scss'
import Popup from '../Popup/Popup'
import Input from '../Input/Input'
import Select from '../Select/Select'
import Button from '../Button/Button'

const RentACarPopup = ({ open, rent, vehicles, customers, onCancel, onSubmit }) => {
  const minDate = new Date().toISOString().slice(0, 16)
  const vehicleOptions = vehicles
    .filter(vehicle => vehicle.count > 0)
    .map(vehicle => {
      return { label: `${vehicle.model} (${vehicle.constructionYear})`, value: vehicle.id }
    })
  const customerOptions = customers.map(customer => {
    return { label: `${customer.fullName} (${customer.email})`, value: customer.id }
  })

  const [startDate, setStartDate] = useState(minDate)
  const [endDate, setEndDate] = useState(minDate)
  const [vehicle, setVehicle] = useState(vehicleOptions[0].value)
  const [customer, setCustomer] = useState(customerOptions[0].value)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    if (!open) {
      setStartDate(minDate)
      setEndDate(minDate)
      setVehicle(vehicleOptions[0].value)
      setCustomer(customerOptions[0].value)
      setPrice(0)
    }
  }, [open, rent])

  useEffect(() => {
    const pricePerDay = vehicles.find(vehicleItem => vehicleItem.id === vehicle).pricePerDay
    const formattedStartDate = startDate.split('T')[0].split('-')
    const formattedEndDate = endDate.split('T')[0].split('-')
    const utc1 = Date.UTC(+formattedStartDate[0], +formattedStartDate[1], +formattedStartDate[2])
    const utc2 = Date.UTC(+formattedEndDate[0], +formattedEndDate[1], +formattedEndDate[2])

    const dayDifference = (Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24)) + 1)
    let calculatedPrice = pricePerDay * dayDifference

    if (dayDifference > 10) {
      calculatedPrice -= (calculatedPrice * 0.1)
    } else if (dayDifference > 5) {
      calculatedPrice -= (calculatedPrice * 0.07)
    } else if (dayDifference > 3) {
      calculatedPrice -= (calculatedPrice * 0.05)
    }

    setPrice(calculatedPrice)
  }, [startDate, endDate, vehicle])

  return (
    <Popup open={open} onSubmit={() => onSubmit({ startDate, endDate, vehicle, customer, price })}>
      <Input
        label="Start date:"
        type="datetime-local"
        value={startDate}
        min={minDate}
        onChange={event => setStartDate(event.target.value)}
        required
      />
      <Input
        label="End date:"
        type="datetime-local"
        min={startDate}
        value={endDate}
        onChange={event => setEndDate(event.target.value)}
        required
      />
      <Select
        label="Vehicle:"
        value={vehicle}
        options={vehicleOptions}
        onChange={event => setVehicle(+event.target.value)}
        required
      />
      <Select
        label="Customer:"
        value={customer}
        options={customerOptions}
        onChange={event => setCustomer(+event.target.value)}
        required
      />
      <p>Price: {price}€</p>
      <div className={styles.RentACarPopup__actions}>
        <Button text="Cancel" onClick={onCancel}/>
        <Button type="submit" text="Rent" />
      </div>
    </Popup>
  )
}

export default RentACarPopup
