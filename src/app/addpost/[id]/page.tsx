'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';

interface Post {
  productName: string;
  color: string;
  price: number;
}

const initialvalue: Post = {
  productName: '',
  color: '',
  price: 0,
};

const EditPostPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [post, setPost] = useState<Post>(initialvalue);

  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.put('/api/post/editedpost', { post, id });
      if (data.status) {
        toast.success(data.message);
        router.push('/dashboard');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Fetch post by id
  const getPostById = async () => {
    try {
      const { data } = await axios.post('/api/post/getOnePost', { id });
      if (data.status) {
        setPost(data.getPost);
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    if (id) {
      getPostById();
    }
  }, [id]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Edit product Details
            </h1>
            <Toaster position="bottom-center" reverseOrder={false} />

            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="productName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Product Name"
                  value={post.productName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPost({ ...post, productName: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="color"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  id="color"
                  placeholder="red"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={post.color}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPost({ ...post, color: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="1211"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={post.price}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPost({ ...post, price: +e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleSubmit}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditPostPage;
