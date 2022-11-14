import React, { useEffect, useState } from "react";
import { client } from "../client";
import { v4 as uuidv4 } from "uuid";
import {
  AiTwotoneSetting,
  AiFillFileAdd,
  AiOutlineFileAdd,
  AiOutlineFolderAdd,
  AiFillFolderAdd,
} from "react-icons/ai";
import Channel from "../components/Channel";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Sidebar = ({
  portal,
  setPortal,
  parentidff,
  setContenttoggle,
  setCct,
  setparentidff,
  settoggle,
  controlsauth,
}) => {
  const [filecreatinginid, setfilecreatinginid] = useState("0");
  const [initialchannelname, setInitialchannelname] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // console.log(portal);

  const fiia = (id) => {
    return filecreatinginid == id;
  };


  const initailchannelcreater = (e) => {
    // e.preventDefault();
    setLoading(true);
    setfilecreatinginid("");
    client
      .patch(portal?._id)
      .setIfMissing({ fields: [] })
      .insert("after", "fields[-1]", [
        {
          _id: uuidv4(),
          _key: uuidv4(),
          pid: "0",
          title: initialchannelname,
        },
      ])
      .commit()
      .then((res) => {
        setPortal(res);
        setLoading(false);
      });
    console.log(portal);
  };

  return (
    <div className="">
      <div className="flex flex-col ">
        <div className="flex justify-between border-b-4 border-black py-3 px-2 items-center">
          <div className="break-words text-xl font-bold">{portal?.pname}</div>
        { controlsauth && <div
            onClick={() => {
              navigate("settings"), settoggle(false);
            }}
          >
            <AiTwotoneSetting fontSize={20} />
          </div>}
        </div>
        <div className="flex flex-col w-full">
          <div
            id="0"
            className="flex justify-between px-2.5 py-2 border-b-2  items-center"
          >
            <div className="font-semibold">Channels</div>
          { controlsauth && <div
              onClick={() => {
                !fiia("0") ? setfilecreatinginid("0") : setfilecreatinginid("");
              }}
            >
              {fiia("0") ? (
                <AiFillFolderAdd fontSize={20} />
              ) : (
                <AiOutlineFolderAdd fontSize={20} />
              )}
            </div>}
          </div>
          {fiia("0") && controlsauth && (
            <form
              onSubmit={initailchannelcreater}
              className=" border  dark:border-none px-3 py-0.5 m-1 dark:bg-[#000000] rounded-sm"
            >
              <input
                type="text"
                placeholder="Create Channel ..."
                onChange={(e) => setInitialchannelname(e.target.value)}
                className="w-full dark:bg-[#000000]  outline-none border-none"
              />
            </form>
          )}
        </div>
        <nav className="overflow-y-auto min-h-screen pb-5">
          {portal?.fields
            ?.filter((f) => f?.pid === "0")
            .map((field, i) => {
              return (
                <Channel
          controlsauth={controlsauth}

                  parentidff={parentidff}
                  setparentidff={setparentidff}
                  key={i}
                  f={field}
                  fiia={fiia}
                  portal={portal}
                  setContenttoggle={setContenttoggle}
                  setCct={setCct}
                  setfilecreatinginid={setfilecreatinginid}
                  setPortal={setPortal}
                  settoggle={settoggle}
                />
              );
            })}
          {loading && (
            <div className="flex w-full px-3 py-4 border-b-2   justify-center items-center">
              <Loader bar />
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
