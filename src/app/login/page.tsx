'use client';
import { delay } from '@/helpers/helpers';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { use, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
// Define the interface for the user object to specify its shape
interface User {
  email: string;
  password: string;
}

const userInitialVal: User = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>(userInitialVal);

  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const hadleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!user.email || !user.password) {
        toast.error('Please fill the inputs');
      } else {
        const { data } = await axios.post('/api/user/login', user);
        if (!data.status) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
          setUser(userInitialVal);
          await delay(1000);
          router.push('/dashboard');
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Login
            </h1>
            <Toaster position="bottom-center" reverseOrder={false} />

            <h5 className="text-center text-red-500"></h5>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUser({ ...user, email: e.target.value })
                  }
                  value={user.email}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  value={user.password}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={hadleSubmit}
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Create new account?
                <Link
                  href="/signup"
                  className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                >
                  SignUp here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
