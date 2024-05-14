import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Button, Card, Modal } from "react-bootstrap";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedContact, setEditedContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  useEffect(() => {
    actions.getUser("jpaliaga10");
    actions.getContacts("jpaliaga10");
  }, []);

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setEditedContact(contact);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContact(null);
    setEditedContact({
      name: "",
      phone: "",
      email: "",
      address: ""
    });
  };

  const handleSaveChanges = () => {
    if (!showModal) return; 
    console.log("Save changes button clicked");
    const userId = store.user;
    const { id: contactId } = selectedContact;
    actions.editContact(userId, contactId, editedContact)
      .then(() => {
        actions.getContacts("jpaliaga10");
        alert("Contact successfully edited.");
        handleCloseModal();
      })
      .catch(error => {
        console.error("Error editing contact:", error);
        alert("Error editing contact. Please try again.");
      });
  };

  const handleDeleteContact = (contactId) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      actions.deleteContact(contactId);
      actions.getContacts("jpaliaga10");
      alert("Contact successfully deleted.");
    }
  };

  if (!(store.contacts && store.contacts.contacts)) return null;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">⬅️Crea tu nuevo contacto</h1>
      {store.contacts.contacts.map((item) => (
        <Card key={item.id} className="mb-3">
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>{item.address}</Card.Text>
            <Card.Text>{item.phone}</Card.Text>
            <Card.Text>
              <small className="text-muted">{item.email}</small>
            </Card.Text>
            <Button variant="lightprimary" className="me-2" onClick={() => handleEditContact(item)}>Edit</Button>
            <Button variant="warning" onClick={() => handleDeleteContact(item.id)}>Delete</Button>
          </Card.Body>
        </Card>
      ))}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" className="form-control" id="name" value={editedContact.name} onChange={(e) => setEditedContact({ ...editedContact, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input type="text" className="form-control" id="phone" value={editedContact.phone} onChange={(e) => setEditedContact({ ...editedContact, phone: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" id="email" value={editedContact.email} onChange={(e) => setEditedContact({ ...editedContact, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input type="text" className="form-control" id="address" value={editedContact.address} onChange={(e) => setEditedContact({ ...editedContact, address: e.target.value })} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveChanges}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;

