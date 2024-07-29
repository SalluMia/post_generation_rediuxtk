import React from "react";
import Post from "../components/posts/Post";
import { Outlet } from "react-router-dom";
import Create from "../components/posts/Create";
import CreatePost from "../components/posts/Create";
import Navigation from "../components/Navigation";

export default function HomePage() {
  return (
   <>
     <Navigation/>
    <div className="p-5">
      <div className="flex gap-4 justify-around mt-4 ">
        <div className="border shadow-md p-5 rounded-md w-3/4">
          <Post />
        </div>
        <div className="border shadow-md p-5 rounded-md">
          <CreatePost />
        </div>
      </div>
    </div>
   </>
  );
}
