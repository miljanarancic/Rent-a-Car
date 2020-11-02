import React, { useState } from 'react'
import styles from './Vehicles.module.scss'
import VehicleCard from '../../components/VehicleCard/VehicleCard'
import VehiclePopup from '../../components/VehiclePopup/VehiclePopup'
import Button from '../../components/Button/Button'

const Vehicles = () => {
  const [addOpen, setAddOpen] = useState(false)
  const [vehicles, setVehicles] = useState(JSON.parse(localStorage.getItem('vehicles')) || [])

  const addVehicle = vehicle => {
    let id = 1

    if (vehicles.length) {
      id = vehicles[vehicles.length - 1].id + 1
      localStorage.setItem('vehicles', JSON.stringify([ ...vehicles, { ...vehicle, id } ]))
    } else {
      localStorage.setItem('vehicles', JSON.stringify([{ ...vehicle, id }]))
    }

    setVehicles([ ...vehicles, { ...vehicle, id }])
    setAddOpen(false)
  }

  const editVehicle = editedVehicle => {
    const newVehicles = vehicles.map(vehicleItem =>
      vehicleItem.id === editedVehicle.id ? editedVehicle : vehicleItem)
    setVehicles(newVehicles)
    localStorage.setItem('vehicles', JSON.stringify(newVehicles))
  }

  const deleteVehicle = id => {
    const newVehicles = vehicles.filter(vehicleItem => vehicleItem.id !== id)
    setVehicles(newVehicles)
    localStorage.setItem('vehicles', JSON.stringify(newVehicles))
  }

  return (
    <div className={styles.Vehicles}>
      <div className={styles.Vehicles__header}>
        <h1>Vehicles</h1>
        <Button
          text="Add vehicle"
          onClick={() => setAddOpen(true)}
        />
      </div>
      <div className={styles.Vehicles__list}>
        {vehicles && vehicles.length
          ? vehicles.map(vehicle =>
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              editVehicle={editedVehicle => editVehicle(editedVehicle)}
              deleteVehicle={id => deleteVehicle(id)}
            />
          )
          : <p className={styles['Vehicles__no-items']}>No vehicles added...</p>
        }
      </div>
      <VehiclePopup
        open={addOpen}
        onSubmit={vehicle => addVehicle(vehicle)}
        onCancel={() => setAddOpen(false)}
      />
    </div>
  )
}

export default Vehicles
