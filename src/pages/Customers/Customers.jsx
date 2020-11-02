import React, { useState } from 'react'
import styles from './Customers.module.scss'
import CustomerCard from '../../components/CustomerCard/CustomerCard'
import CustomerPopup from '../../components/CustomerPopup/CustomerPopup'
import Button from '../../components/Button/Button'

const Customers = () => {
  const [addOpen, setAddOpen] = useState(false)
  const [customers, setCustomers] = useState(JSON.parse(localStorage.getItem('customers')) || [])

  const addCustomer = customer => {
    let id = 1

    if (customers.length) {
      id = customers[customers.length - 1].id + 1
      localStorage.setItem('customers', JSON.stringify([ ...customers, { ...customer, id } ]))
    } else {
      localStorage.setItem('customers', JSON.stringify([{ ...customer, id }]))
    }

    setCustomers([ ...customers, { ...customer, id }])
    setAddOpen(false)
  }

  const editCustomer = editedCustomer => {
    console.log(editedCustomer)
    const newCustomers = customers.map(customerItem =>
      customerItem.id === editedCustomer.id ? editedCustomer : customerItem)
    setCustomers(newCustomers)
    localStorage.setItem('customers', JSON.stringify(newCustomers))
  }

  const deleteCustomer = id => {
    const newCustomers = customers.filter(customerItem => customerItem.id !== id)
    setCustomers(newCustomers)
    localStorage.setItem('customers', JSON.stringify(newCustomers))
  }

  return (
    <div className={styles.Customers}>
      <div className={styles.Customers__header}>
        <h1>Customers</h1>
        <Button
          text="Add customer"
          onClick={() => setAddOpen(true)}
        />
      </div>
      <div className={styles.Customers__list}>
        {customers && customers.length
          ? customers.map(customer =>
            <CustomerCard
              key={customer.id}
              customer={customer}
              editCustomer={editedCustomer => editCustomer(editedCustomer)}
              deleteCustomer={id => deleteCustomer(id)}
            />
          )
          : <p className={styles['Customers__no-items']}>No customers added...</p>
        }
      </div>
      <CustomerPopup
        open={addOpen}
        onSubmit={customer => addCustomer(customer)}
        onCancel={() => setAddOpen(false)}
      />
    </div>
  )
}

export default Customers
