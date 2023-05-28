import React from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineHome} from 'react-icons/ai'

const NotFound = () => {
  return (
    <>
      <section className="flex items-center h-[80vh] p-16 text-gray-900">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
            <p className="mt-4 mb-8 text-gray-600">But dont worry, you can find plenty of other things on our homepage.</p>
            <Link to='/'>
              <button className="flex items-center mt-auto text-white bg-yellow-400 border-0 py-2 px-4 w-48 mx-auto focus:outline-none hover:bg-yellow-500 rounded">Home
                <AiOutlineHome className='w-4 h-4 ml-auto' />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default NotFound