import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, selectAuth } from "../store/authSlice";

export default function Navigation() {
  const dispatch = useDispatch();
  const {isAuthenticated} =useSelector(selectAuth)

  const handlelogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <div>
        <nav className="bg-orange-600 p-5 flex  justify-around items-center">
          <div>
            <span>Website brand</span>
          </div>
          <ul className="flex items-center  gap-2">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              {isAuthenticated ? <Link to={"/posts"}>Posts</Link> : <></>}
            </li>
            <li>
              {isAuthenticated ? (
                <>
                  <button
                    onClick={handlelogout}
                    className="bg-orange-900 p-2 font-bold rounded-md text-white"
                  >
                    logout
                  </button>
                </>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
