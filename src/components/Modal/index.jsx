import React from "react";
import Modal from "react-modal";
import { useDeleteTaskByIdMutation } from "../../api/tasks.api";

Modal.setAppElement("#root");

export const MModal = ({ show, onClose, item }) => {
  const [deleteTask] = useDeleteTaskByIdMutation();
  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className={"modal"}
      overlayClassName={"overlay"}
    >
      <div className={"close-btn-ctn"}>
        <h1 style={{ flex: "1 90%" }}>{item.title}</h1>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
      <div>
        <h5>Status</h5>
        <p>
          {item.icon}{" "}
          {`${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`}
        </p>
        <h2>Description</h2>
        <p>{item.content}</p>

        <button onClick={() => deleteTask(item.id)}>Удалить</button>
      </div>
    </Modal>
  );
};
