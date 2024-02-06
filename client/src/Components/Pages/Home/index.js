import styles from "./styles.module.css";
import { SignupModal } from "./Modals/signup";
import { useState } from "react";
import { LoginModal } from "./Modals/login";
import { useNavigate } from "react-router-dom";

export const Home = ({ user }) => {
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const nav = useNavigate();
  const loginButton = () => {
    if (window.sessionStorage.getItem("token")) {
      nav("/dashboard");
    } else {
      setLoginModalOpen(true);
    }
  };

  return (
    <>
      <div className={styles.home}>
        <button onClick={loginButton} className={styles.home__logInButton}>
          Log In
        </button>

        <div className={styles.home__header}>
          <div className={styles.home__title}>
            <h1>Express Encounters</h1>
            <h2>Like nothing else you have experienced!</h2>
          </div>
        </div>
        <button
          onClick={() => setSignUpModalOpen(true)}
          className={styles.home__signUpButton}
        >
          Sign up today
        </button>
      </div>
      <LoginModal
        isModalOpen={isLoginModalOpen}
        closeModal={() => setLoginModalOpen(false)}
      />
      <SignupModal
        isModalOpen={isSignUpModalOpen}
        closeModal={() => setSignUpModalOpen(false)}
      />
    </>
  );
};
