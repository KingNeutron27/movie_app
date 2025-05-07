import { useState } from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import { IoMenu, IoClose } from "react-icons/io5";
import MovieLogo from '../assets/movie-logo.svg';

function NavBar() {
  const [menu, setMenu] = useState(false);

  const handleClickedMenu = () => {
    setMenu(!menu);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to='/' className={styles.logoContainer}>
          <img 
            src={MovieLogo}  
            alt="Movie App Logo" 
            className={styles.logoImage}
            width={32}
            height={32}
          />
          <span className={styles.logoText}>Movie App</span>
        </Link>
        <div className={styles.navLinks}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to='/' className={styles.navLink}>Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link to='/favorites' className={styles.navLink}>Favorites</Link>
            </li>
          </ul>

          <div className={styles.icon} onClick={handleClickedMenu}>
            {menu ? <IoClose className={styles.close} /> : <IoMenu />}
          </div>

          <div className={`${styles.menuList} ${menu ? styles.open : ''}`}>
            <ul className={styles.newUl}>
              <li>
                <Link to='/' className={styles.newLink} onClick={handleClickedMenu}>Home</Link>
              </li>
              <li>
                <Link to='/favorites' className={styles.newLink} onClick={handleClickedMenu}>Favorites</Link>
              </li>
            </ul>
          </div>

          {menu && <div className={`${styles.overlay} ${menu ? styles.open : ''}`} onClick={handleClickedMenu}></div>}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;