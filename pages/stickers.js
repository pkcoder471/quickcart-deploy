import React from 'react'
import Link from 'next/link'
import Head from 'next/head';
import Product from '@/models/Product';
import mongoose from 'mongoose';

const stickers = ({products}) => {
  return (
    <section className="text-gray-600 body-font min-h-screen">
      <Head>
        <title>QuickCart - Stickers page</title>
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
    <div className="container px-16 py-16 mx-auto">
      <div className="flex flex-wrap -m-4">
        {products.length===0 && <div className="msg text-center text-3xl font-semibold">Sorry, Item out of Stock</div> }
        {products.length!==0 && products.map((item)=>{
          return <Link key={item.itemCode} href={`/product/${item.itemCode}`} className="lg:w-1/4 md:w-1/2 md:p-4 w-full shadow-sm cursor-pointer "><div>
          <a className="  relative h-80 m-auto rounded overflow-hidden">
            <img alt="ecommerce"  className="h-80 m-auto block" src={item.img}/>
          </a>
          <div className="mt-4">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category}</h3>
            <h2 className="text-gray-900 title-font text-lg font-medium">{item.name}</h2>
            <p className="mt-1">₹{item.price}</p>
          </div>
          {item.size.length>0 && <div className="sizes mt-1">
            {item.size.includes('S') && <span className="sz border border-gray-500 px-1">S</span>}
            {item.size.includes('M') && <span className="sz border border-gray-500 px-1">M</span>}
            {item.size.includes('L') && <span className="sz border border-gray-500 px-1">L</span>}
            {item.size.includes('XL') && <span className="sz border border-gray-500 px-1">XL</span>}
            {item.size.includes('XXL') && <span className="sz border border-gray-500 px-1">XXL</span>}
          </div>}
          {item.color.length>0 && <div className="colors mt-1">
            {item.color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
            {item.color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
            {item.color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
            {item.color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
            {item.color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
            {item.color.includes('pink') && <button className="border-2 border-gray-300 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none"></button>}
          </div>}
        </div></Link>})}
      </div>
    </div>
  </section>
  )
}

export async function getServerSideProps() { 
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL);
  }
  let products = await Product.find({"category":"Stickers"});
  return { 
      props: { products: JSON.parse(JSON.stringify(products)) }, 
  }; 
}

export default stickers
