import React from 'react'
import styles from './Header.module.scss'
import { Link } from "react-router-dom";

const Header = () => (
  <header className={styles.Header}>
    <nav className={styles.Header__navigation}>
      <Link className={styles.Header__navigation__item} to="/">Rent-a-Car</Link>
      <Link className={styles.Header__navigation__item} to="/vehicles">Manage Vehicles</Link>
      <Link className={styles.Header__navigation__item} to="/customers">Manage Customers</Link>
    </nav>
  </header>
)

export default Header
