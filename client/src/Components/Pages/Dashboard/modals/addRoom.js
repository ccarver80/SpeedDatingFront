import React from "react";
import { useForm } from "react-hook-form";
import { Modal, TextInput, CallAPI, API_URL, Toast } from "../../../common";

export const AddRoom = ({ isModalOpen, closeModal }) => {
  const { register, handleSubmit } = useForm();

  const onSubmitChatroom = async (data) => {
    console.log(data);
    const res = await CallAPI(`${API_URL}rooms/createRoom`, "POST", data);
  };

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="800px">
      {/* CHATROOM CREATE */}
      <form onSubmit={handleSubmit(onSubmitChatroom)}>
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

        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};
