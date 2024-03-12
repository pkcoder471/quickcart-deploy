import React, { useState, useEffect } from 'react'
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineMinusSquare } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';
import { useRouter } from 'next/router';
import Head from 'next/head';

const checkout = ({ addToCart, cart, removeItemCart, subTotal, clearCart}) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [disabled, setdisabled] = useState(true)
  const router = useRouter();

  useEffect(() => {
    if(!localStorage.getItem('token')){
      router.push('/login');
    }
    else{
      const getUser = async () =>{
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/getUser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 'token':localStorage.getItem('token')})
        })
        const json = await response.json();
        setEmail(json.email);
        setName(json.name);
        setPhone(json.phone);
      }
      getUser();
    }
  }, [])
  
  const PaymentHandler = async () => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ subTotal, cart, name, email, address, phone, city, state, pincode })
    })
    const json = await response.json();
    
    if (json.success) {
      const options = {
        "key": process.env.NEXT_PUBLIC_KEY_ID,
        "amount": json.order.amount,
        "currency": "INR",
        "name": "Quickcart",
        "description": "Test Transaction",
        "image": "https://m.media-amazon.com/images/I/51faXrq-8TL._SX679_.jpg",
        "order_id": json.order.id,
        "callback_url": `http://localhost:3000/api/paymentverification`,
        "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9000090000"
        },
        config: {
          display: {
            blocks: {
              banks: {
                name: 'Most Used Methods',
                instruments: [
                  {
                    method: 'wallet',
                    wallets: ['freecharge']
                  },
                  {
                    method: 'upi'
                  },
                ],
              },
            },
            sequence: ["block.banks"],
            preferences: {
              show_default_blocks: true // Should Checkout show its default blocks?
            }
          }
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        }
      };
      const razor = new Razorpay(options);
      razor.open();
    }
    else {
      if(json.clearCart){
        clearCart();
      }
      toast.error(json.error, {
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

  

  const handleChange = async (e) => {
    e.preventDefault();

    if (e.target.name == 'name') setName(e.target.value);
    if (e.target.name == 'address') setAddress(e.target.value);
    if (e.target.name == 'phone') setPhone(e.target.value);
    if (e.target.name == 'pincode') {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/pincode`);
        const json = await response.json();
        if (Object.keys(json).includes(e.target.value)) {
          setCity(json[e.target.value][0]);
          setState(json[e.target.value][1]);
          toast.success('Hooray, Pincode servicable', {
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
          toast.error('Sorry, Pincode not servicable', {
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
      else {
        setCity('');
        setState('');
      }
    }



    if (name.length > 3 && email.length > 3 && address.length > 3 && phone.length == 10 && pincode.length == 6) {
      setdisabled(false);
    }
    else {
      setdisabled(true);
    }

  }
  return (
    <div className='container flex flex-col min-h-screen items-center md:px-48 px-5'>
      <Head>
        <title>QuickCart - Checkout page</title>
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
      <ToastContainer/>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <h1 className='md:text-3xl text-2xl font-bold mt-10'>Checkout</h1>
      <div className="details w-full">
        <h2 className='md:text-2xl text-xl font-bold items-start my-2'>1. Personal Details</h2>
        <form className='flex flex-row flex-wrap'>
          <div className='flex flex-col  w-1/2 my-2'>
            <label htmlFor="name">Name</label>
            <input type='text' onChange={handleChange} value={name} className='w-[90%] border-2 border-gray-300 focus:outline-none rounded px-2 py-1' id='name' name='name' minLength={3} />
          </div>
          <div className='flex flex-col w-1/2 my-2'>
            <label htmlFor="email">Email</label>
            <input type='email' onChange={handleChange} value={email} className='w-[90%] border-2 border-gray-300 focus:outline-none rounded px-2 py-1' id='email' name='email' readOnly/>
          </div >
          <div className='flex flex-col w-full my-2'>
            <label htmlFor="address">Address</label>
            <textarea type='text' onChange={handleChange} value={address} className='w-[95%] border-2 border-gray-300 focus:outline-none rounded px-2 py-1' rows={3} id='address' name='address' />
          </div>
          <div className='flex flex-col  w-1/2 my-2'>
            <label htmlFor="Phone">Phone</label>
            <input type='tel' onChange={handleChange} value={phone} className='w-[90%] border-2 border-gray-300 focus:outline-none rounded px-2 py-1' id='Phone' name='phone' />
          </div>
          <div className='flex flex-col w-1/2 my-2'>
            <label htmlFor="Pincode">Pincode</label>
            <input type='text' onChange={handleChange} value={pincode} className='w-[90%] border-2 border-gray-300 focus:outline-none rounded px-2 py-1' id='Pincode' name='pincode' />
          </div >
          <div className='flex flex-col w-1/2 my-2'>
            <label htmlFor="City">City</label>
            <input type='text' onChange={handleChange} value={city} className='w-[90%] border-2 border-gray-300 focus:outline-none rounded px-2 py-1' id='City' name='city' readOnly />
          </div >
          <div className='flex flex-col  w-1/2 my-2'>
            <label htmlFor="State">State</label>
            <input type='text' onChange={handleChange} value={state} className='w-[90%] border-2 border-gray-300 focus:outline-none rounded px-2 py-1' id='State' name='state' readOnly />
          </div>
        </form>
      </div>
      <div className="items w-full">
        <h2 className='md:text-2xl text-xl font-bold items-start my-2'>2. Review Cart items</h2>
        <main className='items flex flex-col space-y-5 w-[100%] mt-10 items-start'>
          {Object.keys(cart).length === 0 && <div className='text-md font-semibold'>
            Your Cart is Empty!
          </div>}
          {Object.keys(cart).length != 0 && Object.keys(cart).map((item) => {
            return <div key={item} className='item bg-white h-32 w-[100%] shadow-md rounded-sm flex flex-col'>
              <div className='desc h-[60%] flex flex-row items-center '>
                <div className="image w-[30%] md:p-36 p-5 "><img alt="ecommerce" className="h-[100%] w-[100%] m-auto block" src={cart[item].img} /></div>
                <div className="item-desc md:text-md text-sm w-[50%] p-3">{cart[item].name}({cart[item].size}/{cart[item].color})</div>
                <div className="qty w-[30%] flex space-x-1 items-center">
                  <span className='cursor-pointer' onClick={() => { removeItemCart(item, 1) }} ><AiOutlineMinusSquare /></span>
                  <p>{cart[item].qty}</p>
                  <span className='cursor-pointer' onClick={() => { addToCart(item, 1, cart[item].price, cart[item].color, cart[item].size, cart[item].name) }} ><AiOutlinePlusSquare /></span></div>
              </div>
              <button className="remove h-[40%]  border-gray-200 border-t-2 " onClick={() => { removeItemCart(item, cart[item].qty) }}>Remove</button>
            </div>
          })}
        </main>
        {Object.keys(cart).length !== 0 && <div className='totalSum mt-5'>
          <button type="button" disabled={disabled} onClick={PaymentHandler} className="text-white bg-orange-500 disabled:bg-orange-300 focus:outline-none focus:ring-4font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 ">Pay ₹{subTotal}</button>  </div>}
      </div>
    </div>
  )
}

export default checkout
