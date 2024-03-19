import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { Header } from "../../Main";
import { GETAPI, API_URL, TextInput } from "../../common";
import { io } from "socket.io-client";
import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
const socket = io(`${API_URL}`);

export const ChatRoom = () => {
  const id = useParams();
  const user = window.sessionStorage;
  const [room, setRoom] = useState();
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    GETAPI(`${API_URL}rooms/getRoom/${id.id}`).then((res) => setRoom(res));
    socket.emit("join-room", id.id, user.id);
    socket.on("new-user", (user) => {
      setUsers([...users, user]);
    });

    socket.on("receive-message", (message) => {
      setChat([...chat, message]);
    });

    socket.on("disconnect", id.id, user.id);
  }, [chat]);

  const onSubmit = (data) => {
    socket.emit("send-message", data.message, id.id, user.username);
    reset();
  };

  console.log(room);
  return (
    <>
      <div className={styles.profile}>
        {room ? <Header pageTitle={`ChatRoom: ${room.room_name}`} /> : ""}

        <div className="flex h-screen ">
          {/* Users:  */}
          <div className="w-1/4 mx-auto border border-black h-fit">
            <h1>
              Users:{" "}
              <ul>
                {room ? room.users.map((user) => <li>{user.username}</li>) : ""}
              </ul>
            </h1>
          </div>

          {/* Chat Box */}
          <div className="w-1/2 mx-auto ">
            <div className="flex mx-auto border border-black h-4/6">
              <ul>
                {chat
                  ? chat.map((message) => {
                      return (
                        <li>
                          {message.user}: {message.message}
                        </li>
                      );
                    })
                  : ""}
              </ul>
            </div>
            <div className="">
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                  register={register}
                  label="Message:"
                  name="message"
                  required
                />{" "}
                <button
                  type="submit"
                  className="flex p-5 mx-auto my-auto mt-2 text-xl bg-green-500 rounded-xl"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
