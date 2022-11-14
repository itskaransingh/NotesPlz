import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { client } from '../client'
import { portalQuery, userls } from '../utils/sanityqueries'
import vid from '../assets/Pexels Videos 3541.mp4';
import { GiMagicPortal } from 'react-icons/gi';
import { v4 as uuidv4 } from "uuid";


const Addadmin = () => {

const [portal, setportal] = useState(null)
const [isalreadyadmin, setisalreadyadmin] = useState(false)
const navigate = useNavigate()
const user = userls()
const {portalid}= useParams()

    useEffect(() => {
         client.fetch(portalQuery(portalid)).then((res)=>{
            setportal(res[0])
            // console.log(user._id);
            console.log(res[0])
            const data=  res[0].admins.filter((a)=>(a?._ref == user?._id)).length

            if(data == 0){
                setisalreadyadmin(false)
    
            }
            else{
                 setisalreadyadmin(true);
             }
         });
        
    }, [])

//     useEffect(() => {
//        if(portal?.admins?.filter((a)=>(
//            a?._ref == user?._id
//         ))){
//           console.log('true')
//         }
//    }, [])
    

    const handleadmin =() =>{
        client.patch(portalid).setIfMissing({admins:[]}).insert("after", "admins[-1]", [
            {
              _key:uuidv4(),
              _type:'user',
              _ref:user?._id
            },
          ])
          .commit()
          .then((res) => {
            console.log(res)
            setportal(res);
            setisalreadyadmin(true)
  navigate(`/portal/${portalid}`,{replace:true})

          });
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
          <div className=" bg-white flex justify-center items-center box-border gap-2 py-3 flex-col w-3/4">
            <div className='flex justify-center items-center gap-2 text-2xl'>Portal <div><GiMagicPortal /></div> </div>
            <div className='text-xl font-medium flex break-words flex-wrap'>{portal?.pname}</div>
            <div className='text-lg font-normal'>Invites you to become an admin</div>
         {!isalreadyadmin? <div className='bg-blue-800 px-2 py-1
            rounded-sm text-white mb-3 md:cursor-pointer' onClick={()=>{handleadmin()}}>Accept</div>:
            <div className='bg-gray-600 px-2 py-1
            rounded-sm text-white mb-3 md:cursor-pointer' >Accepted</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addadmin