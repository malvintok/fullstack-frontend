import axios from "../axios-instance";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [user, setuser] = useState({
    name: "",
    username: "",
    email: "",
  });
  const { name, username, email } = user;

  const onInputChange = (event) => {
    setuser({ ...user, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`user/${id}`, user);
    navigate("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`user/${id}`);
    setuser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>
          <form onSubmit={(event) => onSubmit(event)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Full Name"
                name="name"
                value={name}
                onChange={(event) => onInputChange(event)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Username"
                name="username"
                value={username}
                onChange={(event) => onInputChange(event)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Email Address"
                name="email"
                value={email}
                onChange={(event) => onInputChange(event)}
              ></input>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
