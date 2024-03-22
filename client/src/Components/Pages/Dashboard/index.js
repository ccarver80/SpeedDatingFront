import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../../Main";
import { CallAPI, API_URL, Select, TextInput } from "../../common";
import styles from "./styles.module.css";
import { AddRoom } from "./modals/addRoom";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const user = window.sessionStorage;
  const [isRoomModalOpen, setRoomModalOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState();

  const { register, handleSubmit } = useForm();

  const onSubmitZip = async (data) => {
    setError();
    setRooms([]);
    data.userId = user.id;
    const res = await CallAPI(`${API_URL}rooms/searchRooms`, "POST", data);

    if (res.message) {
      setError(res.message);
    } else {
      setRooms(res);
    }
  };

  const miles = [
    { name: 10, value: 10 },
    { name: 20, value: 20 },
    { name: 50, value: 50 },
  ];

  return (
    <>
      <div className={styles.dashboard}>
        <Header pageTitle={"Dashboard"} />
        <div>
          <div className="flex mx-auto mt-10 gap-x-5 w-fit">
            <div className="flex p-5 mx-auto border border-black w-fit rounded-xl">
              {/* Search rooms  */}
              <form
                className="flex flex-col"
                onSubmit={handleSubmit(onSubmitZip)}
              >
                <h2 className="mx-auto text-2xl font-bold">
                  Search For Chatroom
                </h2>
                <div className="flex flex-col mx-auto gap-y-4">
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
                </div>
                <button
                  className="p-2 mx-auto mt-5 text-2xl text-white bg-blue-500 border border-blue-900 w-fit rounded-xl"
                  type="submit"
                >
                  Search
                </button>
                {error ? (
                  <h1 className="w-1/2 mx-auto mt-2 text-red-400">
                    {error} Please Try again, <br></br>or
                    <u>
                      <button
                        onClick={() => setRoomModalOpen(true)}
                        className="p-2 mx-auto mt-5 ml-2 text-xl text-white bg-blue-500 border border-blue-900 w-fit rounded-xl"
                      >
                        Add Your Own Room
                      </button>
                    </u>
                  </h1>
                ) : (
                  ""
                )}
              </form>
            </div>
            <h3 className="flex mx-auto my-auto">OR</h3>
            <button
              onClick={() => setRoomModalOpen(true)}
              className="flex p-2 mx-auto my-auto ml-2 text-xl text-white bg-blue-500 border border-blue-900 h-fit w-fit rounded-xl"
            >
              Add Your Own Room
            </button>
          </div>
          <div className="p-2 mt-5">
            {rooms
              ? rooms.map((room) => {
                  return (
                    <div className="flex flex-col p-5 border border-black w-fit rounded-xl">
                      <h3>
                        <b>Name: </b>
                        {room.room_name}
                      </h3>
                      <p>
                        <b>Description: </b>
                        {room.room_description}
                      </p>
                      <p>
                        <b>Location: </b>
                        {room.room_city}, {room.room_state}
                      </p>
                      <p>
                        <b>Availble Spots: </b> {room.spots_availble}
                      </p>
                      <Link
                        to={`/chatroom/${room.rec_id}`}
                        className="flex p-2 mx-auto mt-2 text-white bg-blue-400 border border-blue-900 w-fit rounded-xl"
                      >
                        Join Room
                      </Link>
                    </div>
                  );
                })
              : ""}
          </div>

          <AddRoom
            isModalOpen={isRoomModalOpen}
            closeModal={() => setRoomModalOpen(false)}
          />
        </div>
      </div>
    </>
  );
};
