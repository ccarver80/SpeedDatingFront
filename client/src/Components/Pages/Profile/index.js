import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../Main";
import { GETAPI, API_URL } from "../../common";
import profile from "../../static/imgs/profileDefault.png";
import styles from "./styles.module.css";
import { EditProfile } from "./modal";

export const Profile = () => {
  const [user, setUser] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formInput, setFormInput] = useState();
  const [placeholder, setPlaceHolder] = useState();
  const [update, setUpdate] = useState();

  const id = window.sessionStorage.getItem("id");
  useEffect(() => {
    GETAPI(`${API_URL}users/user/${id}`).then((res) => setUser(res));
  }, [update]);

  return (
    <>
      <Header pageTitle={"Profile"} />
      <div className={styles.profile}>
        {user ? (
          <>
            <div className={styles.profile__card}>
              <div className="flex flex-col">
                <h2 className="mt-5 mb-5 text-4xl font-bold">
                  {user.username}
                </h2>
                <div className="flex flex-col">
                  {user.profilePic ? (
                    <img src={user.profilePic} alt="Profile" />
                  ) : (
                    <img src={profile} alt="Profile" />
                  )}
                  <button onClick={() => setModalOpen(true)}>
                    Upload Profile Picture
                  </button>
                </div>
              </div>

              <div className={styles.profile__card__info}>
                <h2>
                  <b>Location:</b>
                  <p className="mx-auto text-xl">{user.location}</p>
                  <button
                    onClick={() => {
                      setModalOpen(true);
                      setFormInput("location");
                      setPlaceHolder(user.location);
                    }}
                  >
                    Edit Location
                  </button>
                </h2>

                <h2>
                  <b>Bio:</b>
                  <p className="text-base">{user.bio}</p>
                  <button
                    onClick={() => {
                      setModalOpen(true);
                      setFormInput("bio");
                      setPlaceHolder(user.bio);
                    }}
                  >
                    Edit bio
                  </button>
                </h2>

                <h2>
                  <b>Hobbies:</b> {user.hobbies}
                  <button
                    onClick={() => {
                      setModalOpen(true);
                      setFormInput("hobbies");
                      setPlaceHolder(user.hobbies);
                    }}
                  >
                    Edit hobbies
                  </button>
                </h2>
              </div>
            </div>
            <div className={styles.profile__activities}>
              <div className={styles.profile__activity}></div>

              <div className="flex flex-col w-3/4 mx-auto h-3/4"></div>
            </div>
          </>
        ) : (
          ""
        )}
        <EditProfile
          formInput={formInput}
          isModalOpen={isModalOpen}
          closeModal={() => setModalOpen(false)}
          placeholder={placeholder}
          setUpdate={setUpdate}
        />
      </div>
    </>
  );
};
