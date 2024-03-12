import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import Head from 'next/head';

const orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () =>{
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/fetchOrders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "token":localStorage.getItem('token')})
      })
      const res = await response.json();
      setOrders(res.orders);
    }
    if(localStorage.getItem('token')){
      fetchOrders();
    }else{
      router.push('/');
    }

  }, [])
  
  return (
    <div className="bg-white p-8 min-h-screen rounded-md w-full">
      <Head>
        <title>QuickCart - Orders page</title>
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
      <div className=" flex items-center justify-between pb-6">
        <div>
          <h2 className="text-gray-600 font-semibold">Products Oder</h2>
          <span className="text-xs">All products item</span>
        </div>
        {/* <div className="flex items-center justify-between">
          <div className="flex bg-gray-50 items-center p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
              fill="currentColor">
              <path fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd" />
            </svg>
            <input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..."/>
          </div>
          <div className="lg:ml-40 ml-10 space-x-8">
            <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">New Report</button>
            <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button>
          </div>
        </div> */}
      </div>
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Items
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ordered at
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.length===0 && <p className='font-semibold'>You Don't have any orders!</p>}
                {orders.length!==0 && orders.map((item)=>{
                  return <tr key={item._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div>
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <Link href={`/order?id=${item.orderId}`} ><td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">click here to see details.</p>
                  </td></Link>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                    {new Date(item.createdAt).toLocaleDateString("en-US",{year:"numeric",day:"numeric",month:"long"})}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span aria-hidden
                        className={`absolute inset-0 bg-${item.status==="PAID"?'green':'yellow'}-200 opacity-50 rounded-full`}></span>
                      <span className="relative">{item.status}</span>
                    </span>
                  </td>
                </tr>})}
               
              </tbody>
            </table>
            {/* <div
              className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing 1 to 4 of 50 Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                  Prev
                </button>
                &nbsp; &nbsp;
                <button
                  className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                  Next
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default orders
