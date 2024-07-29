import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPosts } from '../../store/postsSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreatePost() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isUpdated = useSelector((state) => state.posts.updatedStatus);

  // const isUpdated= selectedId.updateStatus;
  console.log(isUpdated)
  // Ensuring user is available before accessing its properties
  const userId = user ? user._id : '';
  console.log(userId);

const token=useSelector((state=> state.auth.token))

const config = {
    headers: { Authorization: `Bearer ${token}` }
};
  const [posts, setPosts] = useState({
    title: '',
    description: '',
    user: userId,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('user signup handle inputs', name, value);
    setPosts((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePosts = (e) => {
    e.preventDefault();
    dispatch(createPosts({ payload: posts, config }));
    setPosts({title:'', description:''})
  };



  return (
    <div>
      <div>
        <div>
          <h1 className="text-xl font-bold">Please create and Publish your posts</h1>
        </div>
        <form  className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 mt-10">
            <label htmlFor="title" className="font-medium">Post Name</label>
            <input
              type="text"
              placeholder="Summer vibes"
              name="title"
              value={posts.title}
              onChange={handleChange}
              className="border p-2 rounded"
              id="title"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-medium">Post Description</label>
            <input
              type="text"
              placeholder="Describe your post"
              name="description"
              value={posts.description}
              onChange={handleChange}
              className="border p-2 rounded"
              id="description"
            />
          </div>
          {
            isUpdated?
             <>
          <button onClick={handlePosts} className="bg-blue-700 p-2 rounded font-bold text-white">update Post</button>

            </>
            :
            <>
          <button onClick={handlePosts} className="bg-blue-700 p-2 rounded font-bold text-white">Add Post</button>
            
            </>
          }
        </form>
        <ToastContainer/>
      </div>
    </div>
  );
}
