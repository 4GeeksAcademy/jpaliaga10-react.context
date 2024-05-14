import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const [contactData, setContactData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        actions.saveContact(contactData);
        alert("Contact successfully created.");
        navigate("/");
    };

    return (
        <div className="container d-grid gap-2">
            <form>
                <h1 className="d-flex justify-content-center">Agrega un contacto</h1>
                <div className="form-row">
                    <div className="form-group bg-">
                        <label htmlFor="inputName4">Full Name</label>
                        <input type="text" name="name" className="form-control mt-2" id="inputName4" placeholder="Nombre Completo" value={contactData.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputEmail4">Email</label>
                        <input type="text" name="email" className="form-control mt-2" id="inputEmail4" placeholder="Correo" value={contactData.email} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPhone">Phone</label>
                    <input type="text" name="phone" className="form-control mt-2" id="inputPhone" placeholder="Telefono" value={contactData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Dirección</label>
                    <input type="text" name="address" className="form-control mt-2" id="inputAddress" placeholder="Enter Address" value={contactData.address} onChange={handleChange} />
                </div>
                <div className=" d-flex justify-content-center">
                    <button type="button" className="bg-primary mt-3" onClick={handleSave}>Save</button>
                </div>
            </form>
            <Link to="/">
                <button className="btn btn-secondary mt-3">Back home</button>
            </Link>
        </div>
    );
};
