import React from 'react'
import styles from './Select.module.scss'

const Select = ({ label, value, options, onChange, required }) => (
  <div className={styles.Select}>
    <label>{label}</label>
    <select
      className={styles.Select__element}
      defaultValue={value}
      onChange={onChange}
      required={required}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
)

export default Select
