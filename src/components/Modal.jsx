import React from 'react'
import "./model.css"
const Modal = (props) => {
  return (
    <>
      <div className="modalContainer" onClick={props.onClose}>
        <div className="modal">
          <h2>{props.title}</h2>
          <p>{props.msg}: {props.password}</p>
          <button onClick={props.onClose}>Close</button>
        </div>
      </div>
    </>
  );
}

export default Modal