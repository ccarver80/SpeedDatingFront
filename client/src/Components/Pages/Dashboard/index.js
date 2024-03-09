import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../../Main";
import { CallAPI, API_URL, Select, TextInput } from "../../common";
import styles from "./styles.module.css";
import { AddRoom } from "./modals/addRoom";

export const Dashboard = () => {
  const [isRoomModalOpen, setRoomModalOpen] = useState(false);
  const [rooms, setRooms] = useState();

  const { register, handleSubmit } = useForm();

  const onSubmitZip = async (data) => {
    const res = await CallAPI(`${API_URL}rooms/searchRooms`, "POST", data);
    setRooms(res);
  };

  const miles = [
    { name: 10, value: 10 },
    { name: 20, value: 20 },
    { name: 50, value: 50 },
  ];

  console.log(rooms);
  return (
    <>
      <div className={styles.dashboard}>
        <Header pageTitle={"Dashboard"} />
        <div>
          <h1>
            This website is still a work in progress, Please feel free to browse
            around and test out.
          </h1>

          <button onClick={() => setRoomModalOpen(true)}>Add Room</button>

          {/* Search rooms  */}
          <form onSubmit={handleSubmit(onSubmitZip)}>
            <TextInput
              register={register}
              label="Zipcode"
              name="zipcode"
              required
            />
            <Select
              register={register}
              label="Please Select Distance"
              name="miles"
              required
              options={miles}
            />
            <button className={styles.login__button} type="submit">
              Submit
            </button>
          </form>

          {rooms
            ? rooms.map((room) => {
                return <h1>{room.room_name}</h1>;
              })
            : ""}

          <AddRoom
            isModalOpen={isRoomModalOpen}
            closeModal={() => setRoomModalOpen(false)}
          />
        </div>
      </div>
    </>
  );
};
