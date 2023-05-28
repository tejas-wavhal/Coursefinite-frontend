import React from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { Link, useSearchParams } from 'react-router-dom'
const PaymentSuccess = () => {
  const reference = useSearchParams()[0].get('reference');
  return (
    <>
      <div className='mx-auto w-80 my-14'>
        <div class=" p-4 xl:w-1/4 md:w-1/2 w-full"></div>
        <div className="h-full p-6 rounded-lg border-2 border-yellow-400 flex flex-col relative overflow-hidden">
          <h1 className="text-lg tracking-widest title-font mb-1 font-semibold">PAYMENT SUCCESS OF</h1>
          <h2 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
            <span>&#8377;299</span>
          </h2>
          <div className='mx-auto text-yellow-400'>
            <AiFillCheckCircle className='mx-auto h-24 w-24' />
            <h1 className='text-yellow-400 font-bold text-center'>Congratulation now you are a Pro Member of Coursefinite</h1>
            <p className="flex items-center text-gray-600 my-2">
              <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-yellow-400 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>You have Access to Premium Contents
            </p>
          </div>
          <Link to='/profile'>
            <button className=" flex items-center my-4 text-white bg-yellow-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-yellow-500 rounded">Go to Profile
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
          <p className="text-xs text-gray-500 mt-3">Refrence : {reference}</p>
        </div>
      </div>
    </>
  )
}

export default PaymentSuccess