import React from 'react'
import styles from './Button.module.scss'

const Button = ({ type = 'button', text, onClick }) => (
  <input className={styles.Button} type={type} value={text} onClick={onClick} />
)

export default Button
