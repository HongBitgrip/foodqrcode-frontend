import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const MyModal = ({ show, onDismiss, onSubmit, title, children, ...rest }) => {
  return (
    <Modal show={show} onHide={onDismiss} {...rest}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onDismiss}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
