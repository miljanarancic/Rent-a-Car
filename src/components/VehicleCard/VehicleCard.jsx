import React, { useState } from 'react'
import styles from './VehicleCard.module.scss'
import VehiclePopup from '../VehiclePopup/VehiclePopup'
import DeletePopup from '../DeletePopup/DeletePopup'
import RentACarPopup from '../RentACarPopup/RentACarPopup'
import Button from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const VehicleCard = ({ vehicle, editVehicle, deleteVehicle, rentVehicle }) => {
  const {
    vehicleType,
    brand,
    model,
    constructionYear,
    fuelType,
    numberOfSeats,
    picture,
    pricePerDay,
    count
  } = vehicle
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const handleEdit = editedVehicle => {
    editVehicle(editedVehicle)
    setEditOpen(false)
  }

  const handleDelete = () => {
    deleteVehicle(vehicle.id)
    setDeleteOpen(false)
  }

  return (
    <div className={styles.VehicleCard}>
      <div className={styles.VehicleCard__title}>
        <h3 className={styles.VehicleCard__title__name}>{model}</h3>
        <div className={styles.VehicleCard__title__actions}>
          {rentVehicle
            ? <Button text="Rent this car" onClick={rentVehicle} />
            : (
              <div>
                <FontAwesomeIcon
                  className={styles.VehicleCard__title__actions__icon}
                  icon={faEdit}
                  onClick={() => setEditOpen(true)}
                />
                <FontAwesomeIcon
                  className={styles.VehicleCard__title__actions__icon}
                  icon={faTrash}
                  onClick={() => setDeleteOpen(true)}
                />
              </div>
            )
          }
        </div>
      </div>
      <ul className={styles.VehicleCard__details}>
        <li className={styles['VehicleCard__details__item--image']}>
          <img src={picture} alt="Car" />
        </li>
        <li className={styles.VehicleCard__details__item}>
          <strong>Vehicle Type:</strong> {vehicleType}
        </li>
        <li className={styles.VehicleCard__details__item}>
          <strong>Brand:</strong> {brand}
        </li>
        <li className={styles.VehicleCard__details__item}>
          <strong>Model:</strong> {model}
        </li>
        <li className={styles.VehicleCard__details__item}>
          <strong>Construction year:</strong> {constructionYear}
        </li>
        <li className={styles.VehicleCard__details__item}>
          <strong>Fuel type:</strong> {fuelType}
        </li>
        <li className={styles.VehicleCard__details__item}>
          <strong>Number of seats:</strong> {numberOfSeats}
        </li>
        <li className={styles.VehicleCard__details__item}>
          <strong>Price per day:</strong> {pricePerDay}
        </li>
        <li className={styles.VehicleCard__details__item}>
          <strong>Count:</strong> {count}
        </li>
      </ul>
      {rentVehicle
        ? <RentACarPopup />
        : (
          <div>
            <VehiclePopup
              open={editOpen}
              vehicle={vehicle}
              onSubmit={editedVehicle => handleEdit(editedVehicle)}
              onCancel={() => setEditOpen(false)}
            />
            <DeletePopup
              open={deleteOpen}
              itemName={model}
              onSubmit={() => handleDelete()}
              onCancel={() => setDeleteOpen(false)}
            />
          </div>
        )
      }
    </div>
  )
}

export default VehicleCard
