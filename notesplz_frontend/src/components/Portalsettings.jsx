import React, { useEffect, useState } from "react";
import {
  AiFillCopy,
  AiFillEdit,
  AiOutlineCopy,
  AiTwotoneDelete,
} from "react-icons/ai";
import {IoRemoveCircleSharp} from 'react-icons/io5';
import { RiAdminFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../client";
import { adminQuery } from "../utils/sanityqueries";

const Portalsettings = ({ portal, setPortal,setAdmindata,admindata }) => {
  const [adminlink, setAdminlink] = useState(false);
  // const [nameedit, setNameedit] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [newname, setNewname] = useState('')
  const { portalid } = useParams();
const navigate = useNavigate()
  const adminarray = [];

useEffect(()=>{
  
  portal?.admins?.map((d)=>(
    client.fetch(adminQuery(d?._ref)).then((res)=>{
      console.log('done')
      adminarray.push(res[0])
      setAdmindata(adminarray)
    })
    ))
    

  console.log('shss')
 
},[])

  // const nedit=()=>{
  //   if(newname != ''){
  //     client.mutate()
  //   }
  //   else{
  //     alert('Name Cannot Be Empty')
  //   }
  // }

  const removeadmin = (id) =>{

    const confirmation = confirm('Are You Sure You Want To Remove This User As Admin')

    confirmation && client
    .patch(portalid)
    .unset([`admins[_ref=="${id}" ]`])
    .commit()
    .then((res) => {
          setPortal(res)
          alert('The Admin Will Be Removed Soon')
    });
  }


  function CopyToClipboard(id) {
    // var r = document.createRange();
    // r.selectNode(document.getElementById(id));
    // window.getSelection().removeAllRanges();
    // window.getSelection().addRange(r);
    return navigator.clipboard.writeText(id);
    // window.getSelection().removeAllRanges();
    // console.log(id);
  }

  const deleteportal = () => {
    const response = confirm("Are You Sure You Want To Delete This Portal");
    if (response) {
      client.delete(portalid).then(()=>{
         navigate('/',{replace:true})
      })
    }
  };

  return (
    <div className="dark:bg-[#181818] dark:text-[#ffffff]  min-h-screen">
      <div className="flex flex-col justify-center  items-center">
        <div className="flex jusstify-center gap-2 mt-3 items-center">
          <div className="text-xl ">Portal Name</div>
          {/* <div onClick={() => setNameedit(!nameedit)}>
            <AiFillEdit fontSize={20} />
          </div> */}
        </div>
        <div className="border-b-2 w-full justify-center items-center flex h-24">
          {/* {!nameedit ? ( */}
            <div className="text-4xl py-3">{portal?.pname}</div>
          {/* ) : (
            <form className="py-3" onSubmit={()=>nedit()}>
              <input
                type="text"
                placeholder="Enter New Name "
                onChange={(e)=>setNewname(e.target.value)}
                value={newname}
                autoFocus
                className="border-none  outline-none text-2xl"
              />
            </form>
          )} */}
        </div>

        <div className="w-full h-24 px-3 flex-col border-b-2 flex justify-center">
          <div className="text-lg">Creator</div>
          <div className="text-2xl">{admindata[0].username }</div>
        </div>

        <div className="w-full h-fit flex-col gap-1 px-3 border-b-2 flex justify-center py-3">
          <div className="text-lg">Admins</div>
          <div>
            {loading &&
              admindata?.slice(1)?.map((d) => {
                console.log(d);
                return (
                  <div className="flex  justify-between items-center pr-1 ">
                  <div className="text-xl py-1">{`${d?.username}(${
                    d?.fname + " " + d?.lname
                  })`}</div>
                  <div className="text-red-500" onClick={()=>removeadmin(d?._id)}><IoRemoveCircleSharp fontSize={20} /></div>
                  </div>
                );
              })}
          </div>
          <div
            onClick={() => {
              setAdminlink(!adminlink);
            }}
            className="flex  justify-start gap-2 w-fit p-2 font-medium rounded-[4px] border active:bg-slate-600 active:shadow-lg shadow-2xl bg-slate-500 items-center"
          >
            <div>Add Admin</div>
            <div>
              <RiAdminFill />
            </div>
          </div>
          {adminlink && (
            <div className="flex justify-around items-center  rounded-[4px] bg-gray-800  py-2  w-[90%]">
              <div className=" w-5/6 overflow-x-auto">
                <pre
                  id="path"
                  className="text-white px-2"
                >{`notesplz.netlify.app/#i3jdsdu83rhega${portalid}`}</pre>
              </div>
              <div
                className=" text-white  "
                onClick={(e) => {
                  CopyToClipboard(document.getElementById("path").innerText);
                }}
              >
                <AiOutlineCopy fontSize={20} />
              </div>
            </div>
          )}
        </div>
        <div
          className="w-full flex justify-between items-center bg-red-100  p-4 text-xl text-red-400"
          onClick={() => deleteportal()}
        >
          Delete Portal <AiTwotoneDelete />
        </div>
      </div>
    </div>
  );
};

export default Portalsettings;
