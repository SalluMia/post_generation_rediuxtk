import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAuth } from "../../store/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [input, setinputs] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    console.log(e.target.value);
    setinputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginAuth(input)).unwrap();
      if (resultAction.token) {
        navigate('/');
      }
    } catch (err) {
      console.error('Failed to log in: ', err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label htmlFor="name">Email</label>
          <input
            type="email"
            className="border p-2"
            name="email"
            value={input.email}
            onChange={handleInputs}
            placeholder="enter email"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="name">Password</label>
          <input
            type="password"
            className="border p-2"
            name="password"
            value={input.password}
            onChange={handleInputs}
            placeholder="enter password"
          />
        </div>
        <div className="text-sm flex justify-end text-blue-700">
          <Link to={"/signup"}>Dont have an account? Signup</Link>
        </div>
        <button
          type="sumbit"
          className="bg-blue-700 p-2 rounded font-bold text-white hover:bg-blue-800"
        >
          Login
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
}
