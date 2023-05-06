import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import dynamic from 'next/dynamic'
import logo from '../public/noun-owl-759873.svg';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState } from 'react';

export default function NewWallet() {

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const session = useSession()
  const supabase = useSupabaseClient()
  if (!session) {
    return (
      <div className="main flex flex-col items-center p-6 sm:p-24 min-h-screen">
        <h1 className="text-3xl font-bold text-slate-800 mb-8 dark:text-slate-200">Create an Account to Start Earning ##APY</h1>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-48">
          <Link href="/profile#auth-sign-up" className="bg-slate-800 dark:bg-slate-500 hover:bg-slate-700 text-slate-100 font-bold py-2 px-4 rounded">Create Account / Log In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="main flex flex-col justify-between items-center p-6 sm:p-24 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 dark:text-slate-200">Staking Details</h1>
      <div className="space-y-12 py-8 text-base leading-7 text-slate-600">
        <h3 className="font-bold text-slate-800 dark:text-slate-200">Tao Staked: ##</h3>
        <h3 className="font-bold text-slate-800 dark:text-slate-200">APY: ##</h3>
        <h3 className="font-bold text-slate-800 dark:text-slate-200">Value: ##</h3>
        <h3 className="font-bold text-slate-800 dark:text-slate-200">Daily Return: ##</h3>
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-48">
          <button className="w-full sm:w-auto px-4 py-2 hover:bg-slate-600 bg-slate-800 text-white rounded-lg mb-2 sm:mb-0">Stake</button>
        </div>
        <hr className="my-4"/>
        <div className="flex justify-between items-center space-x-4">
          <h3 className="font-bold text-slate-800 dark:text-slate-200">Amount:</h3>
          <input className="border border-slate-400 p-2 rounded-lg w-24 sm:w-36" type="text" placeholder="Enter Amount here" />
          <button className="px-4 py-2 hover:bg-slate-600 bg-slate-900 text-white rounded-lg">All</button>
        </div>
        <div className="flex justify-end space-x-4">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-600 text-white rounded-lg">Confirm Stake</button>
          <button className="w-full sm:w-auto px-4 py-2 hover:bg-slate-600 bg-slate-800 text-white rounded-lg mb-2 sm:mb-0">Un-Stake</button>
        </div>
      </div>
    </div>
  )
}
