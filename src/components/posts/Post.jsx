import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePosts, fetchPosts, updatePostStatus } from '../../store/postsSlice';

export default function Post() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status=useSelector((state)=> state.posts.status)
  console.log(posts)
  useEffect(() => {
        dispatch(fetchPosts());
  },[]);

  const handledelete=(id)=>{
      dispatch(deletePosts(id))
  }
  const handleupdate=(id)=>{
     dispatch(updatePostStatus(id))
}
  return (
    <div>
      <h1>All Posts</h1>
      <table className="min-w-full divide-y text-start divide-gray-200 border" >
        <thead className='p-3'>
          <tr>
            <th className='p-3 text-start'>Title</th>
            <th className='text-start'>Description</th>
            <th className='text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts && posts?.map((post) => (
            <tr key={post._id} className='border'>
              <td className='p-2'>{post.title}</td>
              <td className='p-2'>{post.description}</td>
              <td className='p-2 flex gap-2 justify-center'>
                <button onClick={()=>handledelete(post._id)} className='px-8 py-2 bg-red-800 rounded text-xs text-white'>delete</button>
                <button onClick={()=>handleupdate(post._id)} className='px-8 py-2 bg-blue-800 rounded text-xs text-white'>update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

