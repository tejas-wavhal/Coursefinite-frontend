import React, { useEffect, useState } from 'react'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { buySubscription } from '../../redux/actions/userAction';
import toast from 'react-hot-toast'
import { server } from '../../redux/store';
import axios from 'axios';
import logo from '../../assets/images/Profile.jpg'

const Subscribe = ({ user }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState('');

  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription
  );
  const { error: courseError } = useSelector(state => state.course);

  const subscribeHandler = async () => {
    const {
      data: { key },
    } = await axios.get(`${server}/razorpaykey`);

    setKey(key);
    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: 'CourseFinite',
          description: 'Get access to all premium content',
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: 'Tejas Wavhal Head Office',
          },
          theme: {
            color: '#FFC800',
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [
    dispatch,
    error,
    courseError,
    user.name,
    user.email,
    key,
    subscriptionId,
  ]);
  return (
    <div className='mx-auto w-80 my-14'>
      <div className=" p-4 xl:w-1/4 md:w-1/2 w-full"></div>
      <div className="h-full p-6 rounded-lg border-2 border-yellow-400 flex flex-col relative overflow-hidden">
        <span className="bg-yellow-400 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">PREMIUM</span>
        <h1 className="text-sm font-semibold tracking-widest title-font mt-1">PREMIUM MEMBERSHIP AT JUST</h1>
        <h2 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
          <span>&#8377;299</span>
          <span className="text-lg ml-1 font-normal text-gray-500">/year</span>
        </h2>
        <p className="flex items-center text-gray-600 my-10">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </span>Get Access to Premium Content
        </p>
        <button onClick={subscribeHandler} disabled={loading ? true : false} className="flex items-center mt-auto text-white bg-yellow-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-yellow-500 rounded">
          {loading ? (<>
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>
            Loading...
          </>) : (
            <>
              Buy Now
            </>
          )}
          <HiOutlineShoppingCart className='w-4 h-4 ml-auto' />
        </button>
        <p className='text-xs text-gray-500 mt-3'>100% REFUND AT CANCELLATION</p>
        <p className='text-xs text-gray-500 mt-1'>*Terms & Conditions Apply</p>
      </div>
    </div>
  )
}

export default Subscribe