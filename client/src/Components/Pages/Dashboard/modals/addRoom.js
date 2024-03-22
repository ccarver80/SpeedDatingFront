import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, TextInput, CallAPI, API_URL, Toast } from "../../../common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AddRoom = ({ isModalOpen, closeModal }) => {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState();
  const nav = useNavigate();
  const onSubmitChatroom = async (data) => {
    setError();
    let zipcodeRegex = /^([0-9]{5})/;
    let checkzip = zipcodeRegex.test(data.room_zipcode);
    if (!checkzip || data.room_zipcode.length > 5) {
      setError("Please enter a valid zipcode");
    } else {
      const res = await CallAPI(`${API_URL}rooms/createRoom`, "POST", data);
      if (res.rec_id) {
        reset();
        setError();
        closeModal();

        toast.success("Room Added Sucessfully!", Toast);
        nav(`/chatroom/${res.rec_id}`);
      } else if (res.message) {
        reset();
        toast.error(res.message, Toast);
      } else {
        toast.error("Sorry there was a problem adding the room", Toast);
      }
    }
  };

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="800px">
      {/* CHATROOM CREATE */}
      <div className="p-5 bg-white rounded-xl">
        <form
          className="flex flex-col w-1/2 mx-auto gap-y-5"
          onSubmit={handleSubmit(onSubmitChatroom)}
        >
          <TextInput
            register={register}
            label="Chatroom Name"
            name="room_name"
            required
          />

          <TextInput
            register={register}
            label="Description"
            name="room_description"
            required
          />

          <TextInput
            register={register}
            label="Zipcode"
            name="room_zipcode"
            required
          />

          <button
            className="p-2 mx-auto font-bold text-white bg-blue-400 border border-blue-900 w-fit rounded-xl"
            type="submit"
          >
            Submit
          </button>
          {error ? <p>{error}</p> : ""}
        </form>
      </div>
    </Modal>
  );
};
