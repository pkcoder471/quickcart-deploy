import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

const SignUp = () => {
  let router = useRouter();

  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.cpassword !== credentials.password) {
      toast.error('password should be matched with confirm password', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/SignUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
      })
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.authToken);
        toast.success('Successfully logged in', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          router.push('/')
        }, 1000)
      }
      else {
        toast.error('Internal Server error', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <Head>
        <title>QuickCart - SignUp page</title>
        <meta charset="UTF-8" />
        <meta name="description"
          content="NextJS Head component" />
        <meta name="keywords"
          content="HTML, CSS, JavaScript, NextJS" />
        <meta name="author"
          content="Prateek Kashyap" />
        <meta name="viewport"
          content="width=device-width, initial-scale=1.0" />
      </Head>
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="/quickcart_logo.png" alt="Your Company" />
        <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for an account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form method="POST" onSubmit={handleSubmit} >
          <div className="mt-2">
            <input id="name" name="name" type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  rounded-b-none sm:text-sm sm:leading-6 px-2" placeholder='Full Name' onChange={onChange} minLength={3} />
          </div>
          <div >
            <input id="email" name="email" type="email" autoComplete="email" required className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 px-2" placeholder='Email address' onChange={onChange} />
          </div>

          <div >
            <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 px-2" placeholder='Password' onChange={onChange} minLength={5} />
          </div>
          <div >
            <input id="cpassword" name="cpassword" type="password" autoComplete="confirm-password" required className="block w-full rounded-md rounded-t-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 px-2" placeholder='Confirm Password' onChange={onChange} minLength={5} />
          </div>

          <div className='mt-8'>
            <button type="submit" className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Sign up</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?
          <Link href={'/login'} className="font-semibold leading-6 text-orange-600 hover:text-orange-500 ml-1">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
