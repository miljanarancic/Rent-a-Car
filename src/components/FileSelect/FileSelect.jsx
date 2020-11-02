import React from 'react'
import styles from './FileSelect.module.scss'

const Select = ({ label, onChange, required }) => (
  <div className={styles.FileSelect}>
    <label>{label}</label>
    <input type="file" alt="Image Select" onChange={onChange} required={required} />
  </div>
)

export default Select
