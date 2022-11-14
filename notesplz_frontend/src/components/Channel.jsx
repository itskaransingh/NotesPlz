import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  AiOutlineFolderAdd,
  AiFillFolderAdd,
  AiFillFileAdd,
  AiOutlineDelete,
  AiOutlineFileAdd,
  AiFillDelete,
} from "react-icons/ai";
import { IoIosArrowDropdown, IoIosArrowDropdownCircle } from "react-icons/io";
import { client } from "../client";
import Fieldpart from "./Fieldpart";
import Loader from "./Loader";

const Channel = ({
  f,
  setfilecreatinginid,
  parentidff,
  setparentidff,
  fiia,
  portal,
  setPortal,
  setContenttoggle,
  setCct,
  settoggle,
  controlsauth
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [cff, setCff] = useState(false);
  const [fieldname, setFieldname] = useState("");
  const [loading, setLoading] = useState(false);
  const { title, _key, pid, _id } = f;

  const inputhandler = (e, id) => {
    !cffhandler(id)
      ? !fiia(id)
        ? setfilecreatinginid(id)
        : setfilecreatinginid("")
      : !fiia(id)
      ? setfilecreatinginid(id)
      : setfilecreatinginid("");

    e.stopPropagation();
  };

  const delichandler = (e) => {
    client
      .patch(portal?._id)
      .unset([`fields[_id=="${_id}" ]`])
      .commit()
      .then((res) => {
        client
          .patch(portal?._id)
          .unset([`fields[pid=="${_id}" ]`])
          .commit()
          .then((resp) => {
            setPortal(resp);
          });
      });
    e.stopPropagation();
  };

  const fieldmaker = (e, p_id) => {
    e.preventDefault();
    setLoading(true);
    setfilecreatinginid("");
    client
      .patch(portal?._id)
      .setIfMissing({ fields: [] })
      .insert("after", "fields[-1]", [
        {
          _id: uuidv4(),
          _key: uuidv4(),
          pid: `${p_id}`,
          title: fieldname,
          ffield: cff,
        },
      ])
      .commit()
      .then((res) => {
        setPortal(res);
        setparentidff("");
        setCff(false);
        setLoading(false);
      });
    console.log(portal);
  };

  const cffhandler = (id) => (cff && parentidff == id ? true : false);

  // console.log(portal)
  // ! Initial field
  // ! Initial field
  // ! Initial field
  // ! Initial field
  // ! Initial field

  //todo: deleting main field should also delete all the child fields

  return (
    <div className="w-full h-full     overflow-y-auto" key={_key}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full dark:bg-[#212121]  px-3 py-2 border-gray-500  border-b-2   justify-between items-center"
      >
        <div className="capitalize break-words font-semibold ">{title}</div>
        <div className="flex gap-1.5 justify-center items-center">
         { controlsauth && <div onClick={delichandler}>
            <AiFillDelete color="red" fontSize={20} />
          </div>}
          {controlsauth && <div
            onClick={(e) => {
              setparentidff(""), setCff(false), inputhandler(e, _id);
            }}
          >
            {fiia(_id) && !cff ? (
              <AiFillFolderAdd fontSize={20} />
            ) : (
              <AiOutlineFolderAdd fontSize={20} />
            )}
          </div>}
          {controlsauth ? parentidff !== _id ? (
            <div
              onClick={(e) => {
                setCff(true);
                inputhandler(e, _id);
                setparentidff(_id);
              }}
            >
              <AiOutlineFileAdd fontSize={18} />
            </div>
          ) : (
            <div
              onClick={(e) => {
                setCff(false);
                inputhandler(e, _id);
                setparentidff("");
              }}
            >
              <AiFillFileAdd fontSize={18} />
            </div>
          ):null}
          <div>
            {!isOpen ? (
              <IoIosArrowDropdown fontSize={20} />
            ) : (
              <IoIosArrowDropdownCircle fontSize={20} />
            )}
          </div>
        </div>
      </div>
      {fiia(_id) || cffhandler(_id) ? (
        <form
          onSubmit={(e) => fieldmaker(e, _id)}
          className=" border dark:bg-[#000000]  dark:border-none   px-3 py-0.5 m-1 rounded-sm"
        >
          <input
            type="text"
            placeholder="Create Channel ..."
            onChange={(e) => setFieldname(e.target.value)}
            autoFocus
            className="w-full dark:bg-[#000000]   outline-none border-none"
          />
        </form>
      ) : null}
      {/* 
// ! sub field 
// ! sub field 
// ! sub field 
// ! sub field 
// ! sub field 
// ! sub field  */}

      {isOpen &&
        portal?.fields
          ?.filter((sf) => sf?.pid === _id)
          .map((ff, i) => {
            return (
              <div className="w-full h-full overflow-auto" key={ff._key}>
                <Fieldpart
                 controlsauth = {controlsauth}
                  ff={ff}
                  fiia={fiia}
                  portal={portal}
                  setfilecreatinginid={setfilecreatinginid}
                  setPortal={setPortal}
                  key={i}
                  parentidff={parentidff}
                  setparentidff={setparentidff}
                  setContenttoggle={setContenttoggle}
                  setCct={setCct}
                  settoggle={settoggle}
                />
              </div>
            );
          })}
      {loading && (
        <div className="flex w-full px-3 py-4 border-b-2   justify-center items-center">
          <Loader bar />
        </div>
      )}
    </div>
  );
};

export default Channel;
