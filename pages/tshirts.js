import React from 'react'
import Link from 'next/link'
import Head from 'next/head';

const Tshirts = ({products}) => {
  
  return (
    <section className="text-gray-600 min-h-screen body-font">
      <Head>
        <title>QuickCart - Tshirts page</title>
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
          {Object.keys(products).length===0 && <div className="msg">item out of Stock</div> }
          {Object.keys(products).length!==0 && Object.keys(products).map((item)=>{
            return <Link key={products[item].itemCode} href={`/product/${products[item].itemCode}`} className="lg:w-1/4 md:w-1/2 md:p-4 w-full shadow-sm cursor-pointer "><div>
            <a className="  relative h-80 m-auto rounded overflow-hidden">
              <img alt="ecommerce"  className="h-80 m-auto block" src={products[item].img}/>
            </a>
            <div className="mt-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
              <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].name}</h2>
              <p className="mt-1">₹{products[item].price}</p>
            </div>
            <div className="sizes mt-1">
              {products[item].size.includes('S') && <span className="sz border border-gray-500 px-1">S</span>}
              {products[item].size.includes('M') && <span className="sz border border-gray-500 px-1">M</span>}
              {products[item].size.includes('L') && <span className="sz border border-gray-500 px-1">L</span>}
              {products[item].size.includes('XL') && <span className="sz border border-gray-500 px-1">XL</span>}
              {products[item].size.includes('XXL') && <span className="sz border border-gray-500 px-1">XXL</span>}
            </div>
            <div className="colors mt-1">
              {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
              {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
              {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
              {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
              {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
              {products[item].color.includes('pink') && <button className="border-2 border-gray-300 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none"></button>}
            </div>
          </div></Link>})}
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps() { 
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/getTshirts`, {
    method: "GET",
  });
  const json = await response.json();
  return { 
      props: { products: json }, 
  }; 
}

export default Tshirts