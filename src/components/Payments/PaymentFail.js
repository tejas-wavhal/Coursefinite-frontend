import React from 'react'
import { BsFillExclamationCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const PaymentFail = () => {
  return (
    <>
      <div className='mx-auto w-80 my-14'>
        <div class=" p-4 xl:w-1/4 md:w-1/2 w-full"></div>
        <div className="h-full p-6 rounded-lg border-2 border-red-500 flex flex-col relative overflow-hidden">
          <h1 className="tracking-widest title-font mb-1 text-lg font-semibold">PAYMENT FAIL OF</h1>
          <h2 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
            <span>&#8377;49</span>
          </h2>
          <div className='mx-auto text-red-500'>
            <BsFillExclamationCircleFill className='mx-auto h-24 w-24' />
            <h1 className='text-red-500 font-bold text-center mt-2'>Opp's Payment fail of &#8377;49</h1>
            <p className="flex items-center text-gray-600 my-2">
              <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span><s>You have Access to Premium Contents</s>
            </p>
          </div>
          <Link to='/subscribe'>
            <button className=" flex items-center my-4 text-white bg-red-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-red-600 rounded">Try Payment Again
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default PaymentFail