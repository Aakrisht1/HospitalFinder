"use client";
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import { UserAuth } from '../context/AuthContext'
import styles from './navbar.module.css'
import Image from 'next/image'
import logo from './Logo.png'

const Navbar = () => {

    const { user, googleSignIn, logOut } = UserAuth();
    const [loading, setLoading] = useState(true);

    const handleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    }

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {   
            console.log(error);
        }
    }

    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 400));
            setLoading(false);
        }
        checkAuthentication();
    }, [user])

  return (
    <div className='h-20 w-full flex items-center justify-between py-2 px-4'>
      {loading ? null : 
      <Link className='flex items-center justify-center cursor-pointer' href='/'>
        <h1 className={styles.logo}>HospitalFinder</h1>
      </Link>}
      {loading ? null : !user ? (
        <ul className='flex'>
        <li onClick={handleSignIn} className='p-2 cursor-pointer'>
            <div className='bg-slate-200 flex items-center justify-center rounded-full'>
                <h1 className='text-black font-semibold px-5 py-2'>Login</h1>
            </div>
        </li>
        <li onClick={handleSignIn} className='p-2 cursor-pointer'>
            <div className='bg-slate-200 flex items-center justify-center rounded-full'>
                <h1 className='text-black font-semibold px-5 py-2'>Sign Up</h1>
            </div>
        </li>
      </ul>
      ) : (
        <div className='flex'>
            <div onClick={handleSignOut} className='bg-red-600 flex items-center justify-center rounded-full cursor-pointer'>
                <h1 className='text-white font-semibold px-5 py-2'>Sign Out</h1>
            </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
