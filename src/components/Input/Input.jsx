import React from 'react'
import styles from './Input.module.scss'

const Input = ({ label, type, min, max, value, onChange, required }) => (
  <div className={styles.Input}>
    <label className={styles.Input__label}>{label}</label>
    <input
      className={styles.Input__element}
      type={type}
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      required={required}
    />
  </div>
)


export default Input
