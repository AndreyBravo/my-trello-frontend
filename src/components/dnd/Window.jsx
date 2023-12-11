import React from "react";
import Modal from "react-modal";
import { useDeleteTaskByIdMutation } from "../../api/tasks.api";
import "./style.css";

Modal.setAppElement("#root");

export const Window = ({ show, onClose, item }) => {
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
        <h4>Status</h4>
        <div>
          {item.icon}{" "}
          {`${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`}
        </div>
        <h2>Description</h2>
        <p>{item.content}</p>
        <h2>Grade employee</h2>
        <input className="grade-input" type="text" />
        <button className="rm-btn" onClick={() => deleteTask(item.id)}>Удалить</button>
        <hr />
        <h2>Comments</h2>
        <h4>No comments</h4>
      </div>
    </Modal>
  );
};
