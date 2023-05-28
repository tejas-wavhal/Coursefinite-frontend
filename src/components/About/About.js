import React from 'react'
import { AiFillInstagram, AiFillTwitterCircle, AiFillFacebook, AiFillGithub } from 'react-icons/ai'


const About = () => {
  return (
    <div className='h-[80vh] mx-5 md:mx-32 lg:mx-72'>
      <h2 className='text-center my-3 font-semibold text-3xl mt-24'>About</h2>
      <div className="ml-3 text-4xl font-concert text-center mt-16 text-yellow-400">COURSEFINITE</div>
      <div className='md:flex md:items-center my-10 '>
        <img className="w-32 h-w-32 rounded-full mx-auto" src="https://i.postimg.cc/G2BXVQkP/Profile.jpg" alt="image_description" />
        <p className='my-3 text-center text-gray-700 md:mx-24 md:text-start'>I am Tejas Wavhal from Pune. I code React js beautifully simple, and i love what i do.</p>
      </div>
      <div className="flex text-3xl space-x-9 justify-center mt-12 ">
        <a href=" https://www.instagram.com/tejas_7514/?__coig_restricted=1" target="_blank" rel="noreferrer">< AiFillInstagram className='hover:text-blue-900 text-gray-500' /></a>
        <a href="https://twitter.com/WavhalTejas" target="_blank" rel="noreferrer">< AiFillTwitterCircle className='hover:text-blue-900 text-gray-500' /></a>
        <a href="https://www.facebook.com/tejas.wavhal.9" target="_blank" rel="noreferrer">< AiFillFacebook className='hover:text-blue-900 text-gray-500' /></a>
        <a href="https://github.com/tejas-wavhal" target="_blank" rel="noreferrer">< AiFillGithub className='hover:text-blue-900 text-gray-500' /></a>
      </div>
    </div>
  )
}

export default About