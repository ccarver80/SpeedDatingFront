import { Header } from "../../Main";
import styles from "./styles.module.css";

export const Dashboard = () => {
  return (
    <>
      <div className={styles.dashboard}>
        <Header pageTitle={"Dashboard"} />
        <div>
          <h1>
            This website is still a work in progress, Please feel free to browse
            around and test out.
          </h1>
        </div>
      </div>
    </>
  );
};
