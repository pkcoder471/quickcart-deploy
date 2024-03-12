import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingBar from 'react-top-loading-bar'
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setsubTotal] = useState(0)
  const [user, setUser] = useState({value:null})
  const [progress, setProgress] = useState(0)
  const router = useRouter();
  
  useEffect(() => {
    router.events.on('routeChangeStart', ()=>{
      setProgress(50);
    })
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100);
    })
    try {
      if(localStorage.getItem('token')){
        setUser({value:localStorage.getItem('token')})
      }
    } catch (err) {
      console.log(err);
    }
  }, [router.query]);
  
  useEffect(() => {
    try {
      if(localStorage.getItem('cart')){
        setCart(JSON.parse(localStorage.getItem('cart')));
        saveCart(JSON.parse(localStorage.getItem('cart')));
      }
    } catch (err) {
      console.log(err);
      localStorage.clear();
    }
  }, [])
  
  const handleLogout = () =>{
    localStorage.removeItem('token');
    setUser({value:null});
    
  }
  const saveCart = (myCart) =>{
    localStorage.setItem("cart",JSON.stringify(myCart));
    const allItemCodes = Object.keys(myCart);
    let Amount=0;
    for(let i=0;i<allItemCodes.length;i++){
      Amount+=(myCart[allItemCodes[i]].price*myCart[allItemCodes[i]].qty);
    }
    setsubTotal(Amount);
  }

  const addToCart = (itemCode, qty, price, color, size, name, img) =>{
    let myCart = cart;

    const allItemCodes = Object.keys(myCart);

    if(allItemCodes.includes(itemCode)){
      myCart[itemCode].qty = cart[itemCode].qty+qty;
      
    }
    else{
      myCart[itemCode]={qty, price, color, size, name, img};
    }
    setCart(myCart);
    saveCart(myCart);
  }

  const buyNow = (itemCode, qty, price, color, size, name, img) =>{
    clearCart();
    let myCart={};
    myCart[itemCode]={qty, price, color, size, name, img};
    setCart(myCart);
    saveCart(myCart);
    router.push('/checkout');
  }

  const removeItemCart = (itemCode, qty) =>{
    let myCart = cart;
    const allItemCodes = Object.keys(myCart);

    if(allItemCodes.includes(itemCode)){
      myCart[itemCode].qty=cart[itemCode].qty-qty;
      if(myCart[itemCode].qty<=0){
        delete myCart[itemCode];
      }
    }
    setCart(myCart);
    saveCart(myCart);
  }

  const clearCart = () =>{
    setCart({});
    saveCart({});
  }

  return <>
  
  <Head>
        <title>QuickCart - Home page</title>
        <meta charset="UTF-8" />
        <link rel="icon" href="/favicon.png" />
        <meta name="description"
          content="NextJS Head component" />
        <meta name="keywords"
          content="HTML, CSS, JavaScript, NextJS" />
        <meta name="author"
          content="Prateek Kashyap" />
        <meta name="viewport"
          content="width=device-width, initial-scale=1.0" />
  </Head>
  <LoadingBar
        color='#f97316'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waitingTime={1000}
  />
  <Navbar buyNow={buyNow} handleLogout={handleLogout} user={user} cart={cart} addToCart={addToCart} removeItemCart={removeItemCart} clearCart={clearCart} subTotal={subTotal} />
  <Component buyNow={buyNow} user={user} cart={cart} addToCart={addToCart} removeItemCart={removeItemCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
  <Footer/>
  </>
}
