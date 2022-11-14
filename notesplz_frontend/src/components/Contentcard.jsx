import React from 'react'
import { AiFillFilePdf } from 'react-icons/ai';
import { MdDelete } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { client } from '../client';


const Contentcard = ({d,controlsauth}) => {
    const {portalid} = useParams()

    const handledel= (id,docid) =>{
        const confirmation = confirm('Are You Sure You Want Delete This Document')
        if(confirmation){
         client
         .patch(portalid)
         .unset([`docs[_ref=="${id}" ]`])
         .commit()
         .then((res) => {
           alert('Your Doc Will Be Deleted Soon')
            client.delete(id).then(()=>{
             client.delete(docid).then(()=>{
               window.location.reload()
             })
            })
         });
        }
   }

  return (
    <>
      <div
               
               className="h-[60vh] lg:cursor-pointer cursor-default flex flex-col rounded-xl  overflow-hidden  w-[80%] shadow-2xl"
             >
               <a    href={d?.image?.asset?.url ?? d?.file?.asset?.url}
               target="_blank"
               className="h-[70%]">
               {d?.file != null ? (
                 <div className=" h-full w-full overflow-hidden">
                   <div className="bg-gray-600 h-full flex justify-center items-center w-full">
                     <AiFillFilePdf fontSize={150} />
                   </div>
                 </div>
               ) : (
                 <div className=" h-full w-full  overflow-hidden">
                   <div className="bg-gray-600 h-full flex justify-center items-center w-full">
                     <img
                       src={d?.image?.asset?.url}
                       alt="img"
                       className="w-full h-full object-cover"
                     />
                   </div>
                 </div>
               )}
               </a>
               <div className="text-white bg-slate-800 justify-between items-center flex px-4 py-2 rounded-b-xl  font-semibold">
                 <div>
                   <div className="text-2xl ">{d?.title}</div>
                   <div className="text-lg text-gray-300">{d?.caption}</div>
                 </div>
                 {controlsauth && <div onClick={()=>{handledel(d?._id,d?.image?.asset?._id ?? d?.file?.asset?._id)}} className="text-red-500 z-40 active:text-red-700">
                   <MdDelete  fontSize={35}/>
                   </div>}
               </div>
             </div>
    </>
  )
}

export default Contentcard