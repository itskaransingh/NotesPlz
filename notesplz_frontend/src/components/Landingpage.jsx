import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../client'
import bg from '../assets/download.png';
import { landingQuery } from '../utils/sanityqueries';
import Contentcard from './Contentcard';
import Loader from './Loader';

const Landingpage = ({controlsauth}) => {

const [newlyadded, setNewlyadded] = useState(null)
const [loading, setLoading] = useState(false)
const {portalid} = useParams()

useEffect(() => {
  setLoading(true)
client.fetch(landingQuery(portalid)).then((res)=>{
  console.log(res)
  setNewlyadded(res)
  setLoading(false)
})
}, [])
 


  return (
    <div className=" h-[84.6vh] relative overflow-y-hidden">
      <div className="h-full bg-gray-700">
        <img className="h-full  object-cover" src={bg} alt="" />
      </div>
      <div className="absolute bottom-0 right-0 left-0 top-0 flex flex-col  ">
        <div className='text-3xl text-white text-center py-4'>Recently Uploaded</div>
        <div className="h-[100%] overflow-y-auto">
          <div className="flex justify-start pt-5 gap-7 overflow-y-auto items-center md:justify-end min-h-full w-full flex-col">
           {loading && <div className='text-4xl text-white'>
            <Loader beat white />
            </div>}
            {newlyadded?.length != 0 &&
              newlyadded?.map((d) => (
              <Contentcard d={d} controlsauth={controlsauth}/>
              ))}
          </div>
        </div>
       
      </div>
    </div>
  )
}

export default Landingpage