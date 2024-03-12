import React from 'react'
import { GiHamburgerMenu, GiLitCandelabra } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineMinusSquare } from "react-icons/ai";
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

const Navbar = ({addToCart, handleLogout, user, cart, removeItemCart, clearCart, subTotal}) => {
  const ref = useRef()
  const reff = useRef()
  const router = useRouter();
  const [dropdown, setDropdown] = useState(false);
  useEffect(() => {
    if(router.pathname=='/checkout'){
      handleCart();
    }
    if(router.pathname=='/hoodies'){
      if(reff.current.classList.contains('translate-x-0')){
        reff.current.classList.add('-translate-x-full');
        reff.current.classList.remove('translate-x-0');
      }
    }
    if(router.pathname=='/tshirts'){
      if(reff.current.classList.contains('translate-x-0')){
        reff.current.classList.add('-translate-x-full');
        reff.current.classList.remove('translate-x-0');
      }
    }
    if(router.pathname=='/mugs'){
      if(reff.current.classList.contains('translate-x-0')){
        reff.current.classList.add('-translate-x-full');
        reff.current.classList.remove('translate-x-0');
      }
    }
    if(router.pathname=='/stickers'){
      if(reff.current.classList.contains('translate-x-0')){
        reff.current.classList.add('-translate-x-full');
        reff.current.classList.remove('translate-x-0');
      }
    }
  }, [router.query]);
  
  const handleCart = () =>{
    if(ref.current.classList.contains('translate-x-full')){
      ref.current.classList.remove('translate-x-full');
      ref.current.classList.add('translate-x-0');
    }
    else{
      ref.current.classList.add('translate-x-full');
      ref.current.classList.remove('translate-x-0');
    }
  }
  const handleNav = () =>{
    if(reff.current.classList.contains('-translate-x-full')){
      reff.current.classList.remove('-translate-x-full');
      reff.current.classList.add('translate-x-0');
    }
    else{
      reff.current.classList.add('-translate-x-full');
      reff.current.classList.remove('translate-x-0');
    }
  }

  return (
    <div className='nav flex bg-white justify-between items-center p-2 alg shadow-md sticky top-0  z-10 '>
      <div onClick={handleNav} className="hamburger-icon md:hidden cursor-pointer">
      <GiHamburgerMenu className='text-xl'/>
      </div>
      <div className="logo flex items-center">
      <Link href={'/'} className='flex items-center'><Image alt='logo' className='cursor-pointer' src="/quickcart_logo.png" width={40} height={40}></Image>
      <h1 className='font-semibold text-xl cursor-pointer'>QuickCart</h1></Link>
      <div className=" list md:flex ml-5 md:static hidden  absolute">
        <ul className='flex  space-x-3'>
          <Link href={'/hoodies'} className='cursor-pointer'><li>Hoodies</li></Link>
          <Link href={'/tshirts'} className='cursor-pointer'><li>Tshirts</li></Link>
          <Link href={'/stickers'} className='cursor-pointer'><li>Stickers</li></Link>
          <Link href={'/mugs'} className='cursor-pointer'><li>Mugs</li></Link>
        </ul>
      </div>
      </div>
      <div className="user flex space-x-2 items-center">
      <div className="profile">
        {user.value===null?<Link href={'/login'}><button type="button"  className="text-white bg-orange-500 hover:bg-orange-800 font-medium rounded-md text-sm px-2 py-1  dark:bg-orange-600 dark:hover:bg-orange-700">Login</button></Link> :
        <IoPersonCircleSharp className='text-2xl md:text-3xl cursor-pointer' onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} />}
        {dropdown && <div className="profile-dropdown  absolute right-8 top-9  bg-white px-4 rounded-md shadow-lg border-gray-200 border-2" onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} onClick={()=>{setDropdown(false)}} >
        <ul>
          <Link href={'/Account'} ><li className='hover:text-orange-500 py-1'>Your Account</li></Link>
          <Link href={'/orders'} ><li className='hover:text-orange-500 py-1'>Orders</li></Link>
          <li className='cursor-pointer hover:text-orange-500 py-1' onClick={handleLogout}>Logout</li>
        </ul>
      </div>}
        </div>
        <div className="Cart " onClick={handleCart}>
          <FaShoppingCart className='text-xl md:text-2xl cursor-pointer'/>
        </div>
      </div>
      {/* sidebar  */}
      <div ref={ref} className="sidebar bg-orange-300 w-72 h-screen absolute top-0 right-0 translate-x-full transform transition-transform">
        <div className="header px-6  py-8 flex justify-center bg-orange-300 sticky top-0 ">
        <h1 className='text-xl font-semibold'>Shopping Cart</h1>
        <span className='absolute top-0 right-0 p-5 cursor-pointer text-xl'><IoCloseCircle onClick={handleCart}/></span>
        </div>
        <main className='items flex flex-col space-y-5 w-[100%] max-h-[72vh]  overflow-y-scroll items-center'>
          {Object.keys(cart).length===0 && <div className='text-md font-semibold'>
            Your Cart is Empty!
          </div> }
          {Object.keys(cart).length!=0 && Object.keys(cart).map((item)=>{
          return <div key={item} className='item bg-white h-32 w-[80%] shadow-md rounded-sm flex flex-col'>
            <div className='desc h-[60%] flex flex-row items-center '>
               <div className="image w-[30%] p-3 "><img alt="ecommerce"  className="h-[100%] w-[100%] m-auto block" src={cart[item].img}/></div>
               <div className="item-desc text-xs w-[50%] p-3">{cart[item].name}({cart[item].size}/{cart[item].color})</div>
               <div className="qty w-[30%] flex space-x-1 items-center">
                <span className='cursor-pointer' onClick={()=>{removeItemCart(item,1)}} ><AiOutlineMinusSquare/></span>
                <p>{cart[item].qty}</p>
                <span className='cursor-pointer' onClick={()=>{addToCart(item,1,cart[item].price,cart[item].color,cart[item].size,cart[item].name)}} ><AiOutlinePlusSquare /></span></div>
              </div>
            <button className="remove h-[40%]  border-gray-200 border-t-2 " onClick={()=>{removeItemCart(item,cart[item].qty)}}>Remove</button>
          </div>
          })}
        </main>
        {Object.keys(cart).length!==0 && <footer className='totalSum flex items-center flex-col space-y-2 p-3'>
          <p className='font-semibold'>Total Amount: ₹{subTotal}</p>
          <div>
          <Link href={'/checkout'}><button type="button" className="text-white bg-orange-700 hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">CheckOut</button></Link>
          <button type="button" onClick={()=>{clearCart()}} className="text-white bg-orange-700 hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Clear Cart</button>        
          </div>
        </footer>}
      </div>
      {/* sidemenu  */}
      <div ref={reff} className="sidebar md:hidden bg-orange-300 w-72 h-screen absolute top-0 left-0 -translate-x-full transform transition-transform">
        <div className="header px-6  py-8 flex justify-center bg-orange-300 sticky top-0 ">
        <h1 className='text-xl font-semibold'>MENU</h1>
        <span className='absolute top-0 right-0 p-5 cursor-pointer text-xl'><IoCloseCircle onClick={handleNav} /></span>
        </div>
        <main className='items flex flex-col space-y-5 w-[100%] items-center'>
          <ul className='w-[80%]'>
            <Link href={'/hoodies'}><li className='text-xl cursor-pointer  border-t-2 py-1 border-orange-700 w-full'>HOODIES</li></Link>
            <Link href={'/tshirts'}><li className='text-xl cursor-pointer  border-t-2  py-1 border-orange-700 w-full'>TSHIRTS</li></Link>
            <Link href={'/stickers'}><li className='text-xl cursor-pointer  border-t-2  py-1 border-orange-700 w-full'>STICKERS</li></Link>
            <Link href={'/mugs'}><li className='text-xl cursor-pointer  border-t-2 border-b-2  py-1 border-orange-700 w-full'>MUGS</li></Link>
          </ul>
        </main>
      </div>
      
    </div>
    
  )
}

export default Navbar
