import { useState, useEffect } from "react";
import styles from "../styles/navbar.module.css";
import { useAuth } from "../Auth/Authentication";

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
  }, [isLoggedIn]);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false);
  };

  const handleLogout = () => {
    logout();
    removeActive();
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className={`${styles.navbar}`}>
          <a href="/" className={`${styles.logo}`}>
            VigilantEye{" "}
          </a>
          <ul className={`${styles.navMenu} ${isActive ? styles.active : ""}`}>
            <li onClick={removeActive}>
              <a href="/home" className={`${styles.navLink}`}>
                Home
              </a>
            </li>
            {isLoggedIn && (
              <>
                <li onClick={removeActive}>
                  <a href="/profile" className={`${styles.navLink}`}>
                    Profili yt
                  </a>
                </li>
                <li onClick={removeActive}>
                  <a href="/report" className={`${styles.navLink}`}>
                    Raporto
                  </a>
                </li>
                <li onClick={removeActive}>
                  <a href="/incidents" className={`${styles.navLink}`}>
                    Incidentet
                  </a>
                </li>
                <li onClick={removeActive}>
                  <a href="/about" className={`${styles.navLink}`}>
                    Rreth nesh
                  </a>
                </li>
                <li onClick={handleLogout}>
                  <a href="/" className={`${styles.navLink}`}>
                    Dilni {userEmail}
                  </a>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li onClick={removeActive}>
                  <a href="/about" className={`${styles.navLink}`}>
                    Rreth nesh
                  </a>
                </li>
                <li onClick={removeActive}>
                  <a href="/incidents" className={`${styles.navLink}`}>
                    Incidentet
                  </a>
                </li>
                <li onClick={removeActive}>
                  <a href="/login" className={`${styles.navLink}`}>
                    Logohu
                  </a>
                </li>
              </>
            )}
          </ul>
          <div
            className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
            onClick={toggleActiveClass}
          >
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
