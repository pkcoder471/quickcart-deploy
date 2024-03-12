import React,{useEffect, useState} from 'react'
import Order from '@/models/Order';
import mongoose from 'mongoose';
import { useRouter } from 'next/router';
import Head from 'next/head';

const order = ({order,clearCart}) => {
  const [date, setDate] = useState()
  const router = useRouter();
  useEffect(() => {
    if(router.query.clearCart==1){
      clearCart();
    }
    const date = new Date(order.createdAt);
    setDate(date);
  }, [])

  
  return (
    <section className="text-gray-600 min-h-screen body-font overflow-hidden">
      <Head>
        <title>QuickCart</title>
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
  <div className="container px-5 md:py-24 py-8 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">QUICKCART.COM</h2>
        <h1 className="text-gray-900 md:text-3xl text-2xl title-font font-medium mb-4">Order Id: #{order.orderId}</h1>
        <p>Your Order has been successfully placed!</p>
        <p>Order Placed on : {date && date.toLocaleDateString("en-US",{year:"numeric",day:"numeric",month:"long"})}</p>
        <p>Payment stauts : <span className='font-semibold'>{order.status}</span></p>
        <div className="flex mb-4">
          <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Item Description</a>
          <a className="flex-grow border-b-2 border-gray-300 text-end py-2 text-lg px-1">Quantity</a>
          <a className="flex-grow border-b-2 border-gray-300 text-end py-2 text-lg px-1">Item Price</a>
        </div>
        {Object.keys(order.products).map((item)=>{
          return <div key={item} className="flex border-b border-gray-200 py-1">
          <span className="text-gray-500">{order.products[item].name}({order.products[item].size}/{order.products[item].color})</span>
          <span className="ml-auto text-gray-500 items-end">{order.products[item].qty}</span>
          <span className="ml-auto text-gray-900 items-end">₹{order.products[item].price}</span>
        </div>})}
        
        <div className="flex mt-2">
          <span className="title-font font-medium text-2xl text-gray-900">Total Amount: ₹{order.amount}</span>
          <button className="flex ml-auto text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">Track Order</button>
        </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/2 lg:h-auto lg:pl-20 lg:pr-36 lg:pb-36 h-80 m-auto rounded" src="https://m.media-amazon.com/images/I/61b4R3TMXoL._SY879_.jpg"/>
    </div>
  </div>
</section>
  )
}

export async function getServerSideProps(context) { 
  const id = context.query.id;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL);
  }

  let order = await Order.findOne({ orderId: id });

  return { 
      props: { order: JSON.parse(JSON.stringify(order)) }, 
  }; 
}

export default order
