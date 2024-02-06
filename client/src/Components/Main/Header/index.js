import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Navigation } from "../Navigation";

export const Header = ({ pageTitle }) => {
  const w = window.sessionStorage;
  const nav = useNavigate();
  const logout = () => {
    window.sessionStorage.clear();
    nav("/");
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__logo}></div>
        <div className={styles.header__title}>
          <h1>{pageTitle}</h1>
        </div>
        <div className={styles.header__login}>
          <p>Welcome, {w.username}</p>
          <button
            onClick={logout}
            className="p-2 mx-auto bg-blue-200 hover:bg-pink-200 rounded-xl"
          >
            Logout
          </button>
        </div>
      </div>
      <Navigation currentPage={pageTitle} />
    </>
  );
};
