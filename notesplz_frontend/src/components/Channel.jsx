import React, { useState } from "react";

import {
  AiOutlineFolderAdd,
  AiFillFolderAdd,
  AiFillFileAdd,
  AiOutlineDelete,
  AiOutlineFileAdd,
  AiFillDelete,
} from "react-icons/ai";
import {IoIosArrowDropdown,IoIosArrowDropdownCircle} from 'react-icons/io'
import { client } from "../../../../picstack/picstack_frontend/src/client";

const Channel = ({ f,setfilecreatinginid,fiia,portal,setPortal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {subfields,title,_key} = f

const inputhandler = event =>{
  !fiia(_key) ? setfilecreatinginid(_key) : setfilecreatinginid("");

  event.stopPropagation()

}

const delichandler=(e)=>{
  client.patch(portal?._id).unset([`fields[_key=="${_key}"]`]).commit().then((res)=>(setPortal(res)))
  e.stopPropagation()
}


  return (
    <div className="w-full overflow-x-auto">
      <div onClick={()=>(setIsOpen(!isOpen))} className="flex w-full px-3 justify-between items-center">
        <div className="capitalize break-words">{title}</div>
        <div className="flex gap-0.5 justify-center items-center">
          <div onClick={delichandler}>
            <AiFillDelete color="red" fontSize={20}/>
          </div>
          <div
              onClick={inputhandler}
            >
              {fiia(_key) ? (
                <AiFillFolderAdd fontSize={20} />
              ) : (
                <AiOutlineFolderAdd fontSize={20} />
              )}
            </div>
          <div>
            <AiOutlineFileAdd fontSize={18}/>
          </div>
          <div >
          { !isOpen ? <IoIosArrowDropdown fontSize={20} /> : <IoIosArrowDropdownCircle fontSize={20}/>}
          </div>
        </div>
      </div>
      {fiia(`${_key}`) && (
            <form
              // onSubmit={initailchannelcreater}
              className=" border px-3 py-0.5 m-1 rounded-sm"
            >
              <input
                type="text"
                placeholder="Create Channel ..."
                // onChange={(e) => setInitialchannelname(e.target.value)}
                autoFocus
                className="w-full outline-none border-none"
              />
            </form>
          )}


      { isOpen &&  <div>
        {f?.subfields?.map((sf) => (
          <div>{sf?.title}</div>
        ))}
      </div>}
    </div>
  );
};

export default Channel;
