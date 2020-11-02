import React, { useState, useEffect } from 'react'
import styles from './VehiclePopup.module.scss'
import Popup from '../Popup/Popup'
import Input from '../Input/Input'
import Select from '../Select/Select'
import FileSelect from '../FileSelect/FileSelect'
import Button from '../Button/Button'

const CustomerPopup = ({ open, vehicle, onSubmit, onCancel }) => {
  const [id, setId] = useState(vehicle ? vehicle.id : null)
  const [picture, setPicture] = useState(vehicle ? vehicle.picture : '')
  const [vehicleType, setVehicleType] = useState(vehicle ? vehicle.vehicleType : '')
  const [brand, setBrand] = useState(vehicle ? vehicle.brand : '')
  const [model, setModel] = useState(vehicle ? vehicle.model : '')
  const [constructionYear, setConstructionYear] = useState(vehicle ? vehicle.constructionYear : '')
  const [fuelType, setFuelType] = useState(vehicle ? vehicle.fuelType : '')
  const [numberOfSeats, setNumberOfSeats] = useState(vehicle ? vehicle.numberOfSeats : 0)
  const [pricePerDay, setPricePerDay] = useState(vehicle ? vehicle.pricePerDay : 0)
  const [count, setCount] = useState(vehicle ? vehicle.count : 0)

  useEffect(() => {
    if (!open) {
      setId(vehicle ? vehicle.id : null)
      setVehicleType(vehicle ? vehicle.vehicleType : '')
      setBrand(vehicle ? vehicle.brand : '')
      setModel(vehicle ? vehicle.model : '')
      setConstructionYear(vehicle ? vehicle.constructionYear : '')
      setFuelType(vehicle ? vehicle.fuelType : '')
      setNumberOfSeats(vehicle ? vehicle.numberOfSeats : '')
      setPricePerDay(vehicle ? vehicle.pricePerDay : '')
      setCount(vehicle ? vehicle.count : '')
    }
  }, [open, vehicle])

  const getImageData = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPicture(reader.result)
    }
  }

  return (
    <Popup open={open} onSubmit={() => onSubmit(
      { id, picture, vehicleType, brand, model, constructionYear, fuelType, numberOfSeats, pricePerDay, count }
    )}>
      <div className={styles.VehiclePopup__rows}>
        <div className={styles.VehiclePopup__rows__row}>
          <Select
            label="Vehicle type:"
            value={vehicleType}
            options={[
              { label: 'Economy', value: 'Economy' },
              { label: 'Estate', value: 'Estate' },
              { label: 'Luxury', value: 'Luxury' },
              { label: 'SUV', value: 'SUV' },
              { label: 'Cargo', value: 'Cargo' }
            ]}
            onChange={event => setVehicleType(event.target.value)}
          />
          <Input
            label="Brand:"
            type="text"
            value={brand}
            onChange={event => setBrand(event.target.value)}
            required
          />
          <Input
            label="Model:"
            type="text"
            value={model}
            onChange={event => setModel(event.target.value)}
            required
          />
          <Input
            label="Construction year:"
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            value={constructionYear}
            onChange={event => setConstructionYear(event.target.value)}
            required
          />
          <FileSelect
            label="Picture:"
            onChange={event => getImageData(event.target.files[0])}
            required={!vehicle}
          />
        </div>
        <div className={styles.VehiclePopup__rows__row}>
          <Select
            label="Fuel type:"
            value={fuelType}
            options={[
              { label: 'Petrol', value: 'Petrol' },
              { label: 'Diesel', value: 'Diesel' },
              { label: 'Hybrid', value: 'Hybrid' },
              { label: 'Electric', value: 'Electric' },
            ]}
            onChange={event => setFuelType(event.target.value)}
            required
          />
          <Input
            label="Number of seats:"
            type="number"
            min="1"
            value={numberOfSeats}
            onChange={event => setNumberOfSeats(event.target.value)}
            required
          />
          <Input
            label="Price per day:"
            type="number"
            min="1"
            value={pricePerDay}
            onChange={event => setPricePerDay(event.target.value)}
            required
          />
          <Input
            label="Count:"
            type="number"
            min="0"
            value={count}
            onChange={event => setCount(event.target.value)}
            required
          />
        </div>
      </div>
      <div className={styles.VehiclePopup__actions}>
        <Button text="Cancel" onClick={onCancel} />
        <Button type="submit" text="Save" />
      </div>
    </Popup>
  )
}

export default CustomerPopup
