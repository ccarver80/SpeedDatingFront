import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { Header } from "../../Main";
import { GETAPI, API_URL, TextInput } from "../../common";
import { io } from "socket.io-client";
import styles from "./styles.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dashboard } from "../Dashboard";
const socket = io(`${API_URL}`);

export const ChatRoom = () => {
  const id = useParams();
  const nav = useNavigate();
  const user = window.sessionStorage;
  const [room, setRoom] = useState();
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    GETAPI(`${API_URL}rooms/getRoom/${id.id}`).then((res) => {
      if (res.spots_availble > 0) {
        socket.emit("join-room", id.id, user.id);
        setRoom(res);
      } else {
        const userArray = [];
        res.users.map((u) => userArray.push(u.rec_id));
        if (!userArray.includes(parseInt(user.id))) {
          nav("/dashboard");
        }
      }
    });

    socket.on("new-user", (user) => {
      setUsers([...users, user]);
    });
    socket.on("receive-message", (message) => {
      setChat([...chat, message]);
    });
    const scroll = () => {
      try {
        const chatbox = document.getElementById("chat-box");
        if (chatbox != null) {
          chatbox.scrollTop = chatbox.scrollHeight;
          clearInterval(inv);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const inv = setInterval(scroll, 100);
  }, [chat, users]);

  // When A Message Is Sent
  const onSubmit = (data) => {
    socket.emit("send-message", data.message, id.id, user.username);
    reset();
  };

  // When Someone Clicks Leave Room Button
  const dashboard = () => {
    socket.emit("leave-room", id.id, user.id);
    nav("/dashboard");
  };

  return (
    <>
      <div className={styles.profile}>
        <div className="flex">
          <h1 className="mx-auto my-10 text-2xl font-bold ">
            Welcome to {room ? room.room_name : ""}
          </h1>
          <h1>TIMER: </h1>

          <button onClick={dashboard}>Leave Chat</button>
        </div>

        <div className="flex h-screen ">
          {/* Users: */}
          {/* <div className="w-1/4 mx-auto border border-black h-fit">
            <h1>
              Users:{" "}
              <ul>
                {room ? room.users.map((user) => <li>{user.socketId}</li>) : ""}
              </ul>
            </h1>
          </div> */}

          {/* Chat Box */}
          <div className="w-1/2 mx-auto ">
            <div
              id="chat-box"
              className="flex p-5 mx-auto overflow-y-auto border border-black h-3/4"
            >
              <ul className="flex flex-col gap-y-5">
                {chat
                  ? chat.map((message) => {
                      return (
                        <li className="flex mb-2">
                          <p className="p-2 mr-2 bg-blue-200 rounded-lg">
                            {message.user}:{" "}
                          </p>
                          <p className="my-auto">{message.message}</p>
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
