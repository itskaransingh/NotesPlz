import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { client } from '../client'
import vid from "../assets/Pexels Videos 3541.mp4";
import { useParams } from 'react-router-dom'
import {GiMagicPortal} from 'react-icons/gi'
import { pawQuery } from "../utils/sanityqueries";

const Userpaw = ({setIsbacktologin,isbacktologin}) => {
    const {userid}= useParams()
const navigate = useNavigate()

const [paw, setPaw] = useState([])

    useEffect(()=>{
        if(userid){
          client.fetch(pawQuery(userid)).then((res)=>{setPaw(res); console.log(res);})
        }
        scrollTo(0,100)
    },[userid])

const portalredirect = () =>{
  setIsbacktologin(true)
  navigate('/')
}
  return (
    <div className="relative">
    <div className="w-screen h-screen relative">
      <video
        src={vid}
        className="w-full h-full object-cover"
        autoPlay
        loop
        controls={false}
      />
      <div className="absolute bg-blackOverlay flex flex-col justify-center  box-border items-center top-0 bottom-0 right-0 left-0">
        <div className=" flex justify-center items-center box-border py-5 h-full  gap-2 flex-col w-3/4">
          <div className="text-yellow-300 font-bold text-4xl pb-3">
            NotesPlz
          </div>
          <div className="text-white text-2xl font-semibold">Choose A Portal</div>
          <div className="w-full border-b-2 pb-5  gap-1 max-h-[60%] overflow-y-auto flex flex-col">
              {paw?.map((p)=>(
                <Link to={`/portal/${p?._id}`} className="flex  rounded-md justify-between md:cursor-pointer active:bg-slate-400 bg-slate-300  px-4 py-4 items-center w-full">
                  <div className="text-lg font-bold">{p?.pname}</div>
                  <div className="text-2xl"><GiMagicPortal /></div>
                </Link>
              ))} 
          </div>
          <Link to={`/createportal`} className="flex   justify-between mt-4 mb-5 opacity-60 rounded-md md:cursor-pointer active:bg-slate-400 bg-slate-300  px-4 py-4 items-center w-full">
                  <div className="text-lg font-bold">Create Portal</div>
                  <div className="text-2xl"><GiMagicPortal /></div>
                </Link>
          <div className="text-lg text-blue-600 font-semibold border-t-2 pt-5  underline text-center" onClick={()=>{portalredirect()}}>Login In With A Different Account</div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Userpaw