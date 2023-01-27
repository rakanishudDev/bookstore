import React from 'react'
import { AiFillInstagram, AiOutlineTwitter, AiFillFacebook, AiFillGithub} from 'react-icons/ai';
import Link from 'next/link';
const Footer = () => {
    const backToTop = () => {
        window.scrollTo("top", 0)
    }
  return (
    <footer className="text-white">
        <div className=" flex justify-center bg-slate-800 text-white w-full py-2 font-semibold border-b border-black">
            <button type="button" onClick={() => backToTop()}>Back to top</button>
        </div>
        <div className="flex justify-center gap-6 bg-slate-900 w-full pt-4 font-semibold">
            <Link href="/account/cart" className="">View Cart</Link>
            <Link href="/books" className="">Browse</Link>
            <Link href="/" className="">Account</Link>
            <Link href="/" className="">Settings</Link>
            <Link href="/" className="">Help</Link>
        </div>
        <div className="flex justify-center gap-6 bg-slate-900 w-full p-4 ">
            <AiFillInstagram className="w-8 h-8" />
            <AiOutlineTwitter className="w-8 h-8" />
            <AiFillFacebook className="w-8 h-8" />
            <AiFillGithub className="w-8 h-8" />
        </div>
        <div className="flex justify-center text-sm bg-slate-900 w-full pb-1">
            <p >© 2023 Bookstore All rights reserved </p>
        </div>
    </footer> 
        
  )
}

export default Footer