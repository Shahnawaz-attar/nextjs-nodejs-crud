'use client';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
interface Posts {
  productName: String;
  color: string;
  price: number;
  _id: string;
}

const DashboardPage = () => {
  const router = useRouter();

  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [posts, setPosts] = useState<Posts[]>([]);

  const handleAddPost = () => {
    router.push('/addpost');
  };

  const getAllPost = async () => {
    try {
      const { data } = await axios.get('/api/post/getpost');
      if (data.status) {
        setPosts(data.getPost);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { data } = await axios.post('/api/post/deletepost', { id });
      if (data.status) {
        toast.success('Post deleted');
        getAllPost();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const handleLogout = async () => {
    const { data } = await axios.get('/api/user/logout');
    if (data.status) {
      router.push('/login');
    }
  };

  const handleEditPost = async (id: string) => {
    router.push(`/addpost/${id}`);
  };

  const postsList = posts.map(({ productName, color, price, _id }, ind) => {
    return (
      <tr
        key={ind}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {productName}
        </th>
        <td className="px-6 py-4">{color}</td>
        <td className="px-6 py-4">{price}</td>
        <td className="px-6 py-4">
          <button
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 mr-2"
            onClick={() => handleEditPost(_id)}
          >
            <FaPencilAlt />
          </button>
          <button
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 "
            onClick={() => handleDelete(_id)}
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <button
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 my-5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 float-right"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-4xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Toaster position="bottom-center" reverseOrder={false} />

            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={handleAddPost}
            >
              Add Post
            </button>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Color
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody>{postsList}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
