import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { client } from "../client";
import vid from "../assets/Pexels Videos 3541.mp4";
import { userls } from "../utils/sanityqueries";
import { v4 as uuidv4 } from "uuid";

const Createportal = () => {
const [pname, setPname] = useState('')
const [isallfields, setIsallfields] = useState(true);
const navigate = useNavigate()

const user = userls()

const aftercphandler = (cp)=> {
  setIsallfields(true)
  setPname('')
  navigate(`/portal/${cp._id}`)
}

const createportalhandler = () => {
  // console.log(user)
  if (pname != '' ) {
     const doc ={
      _type:'portals',
      pname,
      createdby:{
        _type:'createdby',
        _ref:user?._id
      },
      admins:[{
        _key:uuidv4(),
        _type:'user',
        _ref:user?._id
      },]
     }
     client.create(doc).then((res)=>(aftercphandler(res)))
  } else {
    console.log('eeee')
    setIsallfields(false);
    setInterval(()=>(setIsallfields(true)),3000)
  }
  // console.log(JSON.parse(localStorage.getItem('user')))
};

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

            <div className=" flex justify-center items-center box-border gap-2 flex-col w-3/4">
              <div className="text-yellow-300 font-bold text-4xl pb-5">
                NotesPlz
              </div>
            
              <div className="flex flex-col w-full">
                <label
                  htmlFor="portalname"
                  className="text-base text-white font-semibold"
                >
                 Create Portal Name
                </label>
                <input
                  type="text"
                  name=""
                  id="portalname"
                  required
                  value={pname}
                  onChange={(e)=>(setPname(e.target.value))}
                  className="border-none outline-none px-1  py-0.5 rounded-sm text-lg"
                />
              </div>
              
             
              <button onClick={()=>createportalhandler()} className="bg-blue-800 w-full py-2 text-white font-bold rounded-md">
                Create Portal
              </button>
              <div className="text-white">
                Already Have Account?{" "}
                <Link to={'/'} className="text-blue-500 underline font-semibold">
                  Login
                </Link>
              </div>
            </div>
          
        </div>
      </div>
    </div>
  )
}

export default Createportal