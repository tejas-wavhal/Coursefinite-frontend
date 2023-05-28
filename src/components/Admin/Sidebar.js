import React from 'react'
import { MdSpaceDashboard, MdVideocam, MdAddCircle } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
      <aside className='sm:w-full lg:w-fit shadow-2xl'>
        <div className='flex lg:flex-col justify-center items-center p-2 space-x-1 space-y-1   lg:space-y-10 lg:p-5 flex-wrap '>
          <LinkButton text='Dashboard' url={'dashboard'} Icon={MdSpaceDashboard} active={window.location.pathname === '/admin/dashboard'} />
          <LinkButton text='Create Course' url={'createcourse'} Icon={MdAddCircle} active={window.location.pathname === '/admin/createcourse'} />
          <LinkButton text='Courses' url={'courses'} Icon={MdVideocam} active={window.location.pathname === '/admin/courses'} />
          <LinkButton text='Users' url={'users'} Icon={FaUserCircle} active={window.location.pathname === '/admin/users'} />
        </div>
      </aside>
    </>
  )
}
export default Sidebar

function LinkButton({ url, Icon, text, active }) {
  return (
    <Link to={`/admin/${url}`} className='w-fit'>
      <button className={`flex text-lg bg-gray-300 rounded-md p-1 hover:bg-gray-600 px-3 hover:text-gray-100 transition-all ease-in-out `} style={{ backgroundColor: `${active ? '#c27803' : null}` }} >
        <Icon className='relative top-1 text-2xl mr-2' />
        {text}
      </button>
    </Link>
  )
}