import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';


const Account = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");

  const [password, setPassword] = useState("");
  const [npassword, setNpassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [display, setDisplay] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
    }
    else {
      const getUser = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/getUser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 'token': localStorage.getItem('token') })
        })
        const json = await response.json();

        setEmail(json.email);
        setName(json.name);
        setAddress(json.address);
        setPhone(json.phone);
        setPincode(json.pincode);
      }
      getUser();
    }
  }, [])

  const handleChange = async (e) => {
    e.preventDefault();

    if (e.target.name == 'name') setName(e.target.value);
    if (e.target.name == 'address') setAddress(e.target.value);
    if (e.target.name == 'phone') setPhone(e.target.value);
    if (e.target.name == 'email') setEmail(e.target.value);
    if (e.target.name == 'pincode') setPincode(e.target.value);
    if (e.target.name == 'password') setPassword(e.target.value);
    if (e.target.name == 'npassword') setNpassword(e.target.value);
    if (e.target.name == 'cpassword'){
      setCpassword(e.target.value);
      if(npassword===e.target.value) setDisplay(true)
      else setDisplay(false)
    }
  }
  const handleResestAccount = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/updateAccount`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, address, phone, email, pincode })
    })
    const json = await response.json();
    if (json.success) {
      toast.success('Account Updated Successfully!', {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      toast.error('Some Error Occurred!', {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const handleResestPassword = async (e) => {
    e.preventDefault();
    if (npassword === cpassword) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/updatePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'token': localStorage.getItem('token'), password, npassword, cpassword })
      })
      const json = await response.json();
      if (json.success) {
        toast.success('Password Updated Successfully!', {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else {
        toast.error('Some Error Occurred!', {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }
  return (
    <div className='container flex flex-col min-h-screen items-center md:px-48 px-5'>
      <Head>
        <title>QuickCart - Account page</title>
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
      <div className="account w-full">
        <h2 className='md:text-3xl text-2xl font-bold my-5 text-center'>Update your account</h2>
        <form className='flex flex-row flex-wrap' >
          <div className='flex flex-col  w-1/2 my-2'>
            <label htmlFor="name" className='md:text-sm text-xs'>Name</label>
            <input type='text' onChange={handleChange} value={name} className='w-[90%] border-2 border-gray-300 focus:outline-none rounded px-2 py-1' id='name' name='name' minLength={3} />
          </div>
          <div className='flex flex-col w-1/2 my-2'>
            <label htmlFor="email" className='md:text-sm text-xs'>Email<span className='text-xs'> (Cannot be changed)</span></label>
            <input type='email' onChange={handleChange} value={email} className='w-[90%] border-2 border-gray-300 focus:outline-none rounded px-2 py-1' id='email' name='email' readOnly />
          </div >
          <div className='flex flex-col w-full my-2'>
            <label htmlFor="address" className='md:text-sm text-xs'>Address</label>
            <textarea type='text' onChange={handleChange} value={address} className='w-[95%] border-2 border-gray-300 focus:outline-none rounded px-2 py-1' rows={3} id='address' name='address' />
          </div>
          <div className='flex flex-col  w-1/2 my-2'>
            <label htmlFor="Phone" className='md:text-sm text-xs'>Phone</label>
            <input type='tel' onChange={handleChange} value={phone} className='w-[90%] border-2 border-gray-300 focus:outline-none rounded px-2 py-1' id='Phone' name='phone' />
          </div>
          <div className='flex flex-col w-1/2 my-2'>
            <label htmlFor="Pincode" className='md:text-sm text-xs'>Pincode</label>
            <input type='text' onChange={handleChange} value={pincode} className='w-[90%] border-2 border-gray-300 focus:outline-none rounded px-2 py-1' id='Pincode' name='pincode' />
          </div >
          <button type="button" onClick={handleResestAccount} className="text-white bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-4font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 my-2 mb-2 ">Submit</button>
        </form>
      </div>
      <div className="account w-full">
        <h2 className='md:text-xl text-xl font-bold my-5 text-center'>Update your Password</h2>
        <form className='flex flex-row flex-wrap'>
          <div className='flex flex-col  w-1/3 my-2'>
            <label htmlFor="password" className='md:text-sm text-xs'>Old Password</label>
            <input type='Password' onChange={handleChange} value={password} className='w-[90%] border-2 border-gray-300 focus:outline-none rounded px-2 py-1' id='password' name='password' minLength={3} />
          </div>
          <div className='flex flex-col w-1/3 my-2'>
            <label htmlFor="npassword" className='md:text-sm text-xs'>New Password</label>
            <input type='Password' onChange={handleChange} value={npassword} className='w-[90%] border-2 border-gray-300 focus:outline-none rounded px-2 py-1' id='npassword' name='npassword'/>
          </div >
          <div className='flex flex-col md:mt-2 -mt-2  w-1/3 my-2'>
            <label htmlFor="cpassword" className='md:text-sm text-xs'>Confirm new Password</label>
            <input type='Password' onChange={handleChange} value={cpassword} className='w-[90%] border-2 border-gray-300 focus:outline-none rounded px-2 py-1' id='cpassword' name='cpassword' />
            {npassword.length!=0 && display!=null && display && <p className='text-green-500'>passwords matched</p>}
            {npassword.length!=0 && display!=null && !display && <p className='text-red-500'>passwords not matched</p>}
          </div>
          
          <button type="button" className="text-white bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-4font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 my-2 mb-2 " onClick={handleResestPassword} >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Account
