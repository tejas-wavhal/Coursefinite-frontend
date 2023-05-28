import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardStats } from '../../../redux/actions/adminAction'
import Sidebar from '../Sidebar'

const Databox = ({ title, qty }) => (
  <div className='shadow-xl rounded-lg py-7 mx-5 px-14 bg-slate-200 w-fit hover:shadow-xl hover:shadow-yellow-400 transition-all ease-linear'>
    <h1>{title}</h1>
    <h2 className='text-2xl foni-semibold'>{qty}</h2>
    <p className='text-gray-500'>{`Total ${title}`}</p>
  </div>
)

const Dashboard = () => {

  const { totalUsers, totalCourses, totalViews, totalLectures } = useSelector(state => state.admin)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDashboardStats())
  }, [dispatch, totalUsers, totalCourses, totalViews, totalLectures])


  return (
    <>
      <div className='lg:min-h-[80vh] flex flex-col-reverse lg:flex-row'>
        <div className='mx-auto my-10'>
          <div className='text-gray-500 text-center'>{`Latest Data of ${String(new Date()).split('G')[0]}`}</div>
          <h1 className='text-2xl font-semibold my-10 text-center' >Dashboard</h1>
          <div className='flex flex-row flex-wrap justify-center gap-y-14 mb-20'>
            <Databox title="Users" qty={totalUsers} />
            <Databox title="Views" qty={totalViews} />
            <Databox title="courses" qty={totalCourses} />
            <Databox title="Lectures" qty={totalLectures} />
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default Dashboard