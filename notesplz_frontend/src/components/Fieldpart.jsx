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
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";

const Fieldpart = ({
  ff,
  setContenttoggle,
  setCct,
  setfilecreatinginid,
  parentidff,
  setparentidff,
  fiia,
  portal,
  setPortal,
  settoggle,
  controlsauth 
}) => {
  const { portalid } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [cff, setCff] = useState(false);
  const [key, setkey] = useState("");
  const [fieldname, setFieldname] = useState("");
  const [loading, setLoading] = useState('')
  const { title, _key, _id, pid, ffield } = ff;

  const navigate = useNavigate();

  const inputhandler = (event, ikey) => {
    !cff
      ? !fiia(ikey)
        ? setfilecreatinginid(ikey)
        : setfilecreatinginid("")
      : !fiia(ikey)
      ? setfilecreatinginid(ikey)
      : setfilecreatinginid("");
    event.stopPropagation();
  };

  const delichandler = (e, dkey) => {
    client
      .patch(portal?._id)
      .unset([`fields[_id=="${dkey}" ]`])
      .commit()
      .then((res) => {
        client
          .patch(portal?._id)
          .unset([`fields[pid=="${dkey}" ]`])
          .commit()
          .then((resp) => {
            setPortal(resp);
          });
      });
    e.stopPropagation();
  };
  
  const fieldmaker = (e, p_id) => {
    setLoading(_id)
    setparentidff("");
    e.preventDefault();
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
        console.log(res);
        setPortal(res);
        setCff(false);
    setLoading('')
      });
    console.log(portal);
  };

  const cffhandler = (id) => (cff && parentidff == id ? true : false);

  return (
    <div key={_key}>
      <div
        onClick={() => {
          setIsOpen(!isOpen),
            ffield
              ? (setparentidff(_id),
                settoggle(false),
                navigate(`docs/${_id}`))
              : null;
        }}
        className="flex w-full px-3 pl-4 dark:bg-[#222831] bg-slate-100 border-b border-slate-600 py-2 justify-between items-center"
      >
        <div className="capitalize break-words font-normal">{title}</div>
        <div className="flex gap-1.5 justify-center items-center">
{ controlsauth &&   <div onClick={(e) => delichandler(e, _id)}>
            <AiFillDelete color="red" fontSize={20} />
          </div>}
          {!ffield && controlsauth && (
            <div
              onClick={(e) => {
                setparentidff(""), setCff(false), inputhandler(e, _id);
              }}
            >
              {fiia(_id) && !cff ? (
                <AiFillFolderAdd fontSize={20} />
              ) : (
                <AiOutlineFolderAdd fontSize={20} />
              )}
            </div>
          )}
          {!ffield && controlsauth  ? (
            parentidff !== _id ? (
              <div
                onClick={(e) => {
                  setCff(true);
                  setparentidff(_id);
                  inputhandler(e, _id);
                }}
              >
                <AiOutlineFileAdd fontSize={18} />
              </div>
            ) : (
              <div
                onClick={(e) => {
                  setCff(false);
                  setparentidff("");
                  inputhandler(e, _id);
                }}
              >
                <AiFillFileAdd fontSize={18} />
              </div>
            )
          ) : null}

          {!ffield && (
            <div>
              {!isOpen ? (
                <IoIosArrowDropdown fontSize={20} />
              ) : (
                <IoIosArrowDropdownCircle fontSize={20} />
              )}
            </div>
          )}
        </div>
      </div>
      {fiia(_id) || cffhandler(_id) ? (
        <form
          onSubmit={(e) => fieldmaker(e, _id)}
          className=" border dark:bg-[#000000]  dark:border-none px-3 py-0.5 m-1 rounded-sm"
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

      {/* // ! sub field 
// ! sub field 
// ! sub field 
// ! sub field 
// ! sub field  */}

      {isOpen &&
        portal?.fields
          ?.filter((sf) => sf?.pid === ff._id)
          .map((ssf) => {
            const { title, _key, _id, pid, ffield: ff2 } = ssf;
            
            const ddchecker = (ddkey) => key == ddkey;
            const ddhandler = (sddkey) => {
              ddchecker(sddkey) ? setkey("") : setkey(sddkey);
              ff2
              ? (
                setparentidff(_id),
                navigate(`docs/${_id}`),
                settoggle(false))
                : null;
              };
              
              return (
                <>
                <div
                  key={_key}
                  onClick={() => ddhandler(_id)}
                  className="flex w-full px-3 dark:bg-[#252A34] dark:border-gray-800 border-b-2 py-1 pl-6 bg-slate-200 justify-between items-center"
                  >
                  <div className="capitalize break-words">{title}</div>
                  <div className="flex gap-1.5 justify-center items-center">
                    {controlsauth &&<div onClick={(e) => delichandler(e, _id)}>
                      <AiFillDelete color="red" fontSize={20} />
                    </div>}
                    {/* <div
                      onClick={(e) => {
                        setparentidff(""), setCff(false), inputhandler(e, _key);
                      }}
                    >
                      {fiia(_key) && !cff ? (
                        <AiFillFolderAdd fontSize={20} />
                      ) : (
                        <AiOutlineFolderAdd fontSize={20} />
                        )}
                      </div> */}
                    {controlsauth && !ff2 ? (
                      parentidff !== _id ? (
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
                      )
                    ) : null}
                    {!ff2 && (
                      <div>
                        {!ddchecker(_id) ? (
                          <IoIosArrowDropdown fontSize={20} />
                          ) : (
                            <IoIosArrowDropdownCircle fontSize={20} />
                            )}
                      </div>
                    )}
                  </div>
                </div>
                {fiia(_id) || cffhandler(_id) ? (
                  <form
                  onSubmit={(e) => fieldmaker(e, _id)}
                  className=" border dark:bg-[#000000]  dark:border-none px-3 py-2 m-1 rounded-sm"
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
                {loading == _id && (
                <div className="flex w-full px-3 py-4 border-b-2   justify-center items-center">
                  <Loader bar />
                </div>
                )}

                {/* // ! sub sub field 
// ! sub  sub field 
// ! sub sub field 
// ! sub sub field 
// ! sub sub field  */}

                {ddchecker(_id) &&
                  portal?.fields
                    ?.filter((sf) => sf?.pid === ssf._id)
                    .map((sssf) => {
                      const { title, _id:sffkey, pid, ffield: ff3 } = sssf;
                      
                      return (
                        <>
                          <div
                            key={sffkey}
                            className="flex w-full dark:bg-gray-800 dark:border-gray-700 border-b  px-3 py-1 pl-8 bg-slate-300 justify-between items-center"
                            onClick={() => {
                              ff3
                                ? (setparentidff(sffkey),
                                  settoggle(false),
                                  navigate(`docs/${sffkey}`))
                                : null;
                            }}
                          >
                            <div className="capitalize break-words">
                              {title}
                            </div>
                            <div className="flex gap-1.5 justify-center items-center">
                             {controlsauth && <div onClick={(e) => delichandler(e, sffkey)}>
                                <AiFillDelete color="red" fontSize={20} />
                              </div>}
                              {/* {parentidff !== sffkey ? (
                                <div
                                  onClick={(e) => {
                                    setparentidff(sffkey);
                                    setCff(true);
                                    inputhandler(e, sffkey);
                                    e.stopPropagation();
                                  }}
                                >
                                  <AiOutlineFileAdd fontSize={18} />
                                </div>
                                ) : (
                                <div
                                  onClick={(e) => {
                                    setparentidff("");
                                    e.stopPropagation();
                                  }}
                                  >
                                  <AiFillFileAdd fontSize={18} />
                                </div>
                              )} */}
                            </div>
                          </div>
                          {/* {fiia(_key) || cffhandler(sffkey) ? (
                  <form
                  onSubmit={(e) => fieldmaker(e, _key)}
                    className=" border px-3 py-2 m-1 rounded-sm"
                  >
                    <input
                      type="text"
                      placeholder="Create Channel ..."
                      onChange={(e) => setFieldname(e.target.value)}
                      autoFocus
                      className="w-full outline-none border-none"
                      />
                      </form>
                    ) : null} */}
                        </>
                      );
                    })
 
                    }
              </>
            );
          })}
    </div>
  );
};

export default Fieldpart;
