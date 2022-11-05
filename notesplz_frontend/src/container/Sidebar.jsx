import React, { useEffect, useState } from "react";
import { client } from "../client";
import { v4 as uuidv4 } from "uuid";
import {
  AiTwotoneSetting,
  AiOutlineFolderAdd,
  AiFillFolderAdd,
} from "react-icons/ai";
import { portalQuery } from "../utils/sanityqueries";
import Channel from "../components/Channel";

const Sidebar = () => {
  const [filecreatinginid, setfilecreatinginid] = useState("0");
  const [initialchannelname, setInitialchannelname] = useState("");
  const [portal, setPortal] = useState({});

  useEffect(() => {
    client.fetch(portalQuery).then((res) => setPortal(res[0]));
  }, []);
  // console.log(portal);

  const fiia = (id) => {
    return filecreatinginid == id;
  };

  const initailchannelcreater = (e) => {
    // e.preventDefault();
    setfilecreatinginid("");
    client
      .patch(portal?._id)
      .setIfMissing({ fields: [] })
      .insert("after", "fields[-1]",[{
        _key:uuidv4(),
        title:initialchannelname,   
      }]).commit().then((res)=>{setPortal(res);})
    console.log(initialchannelname);
  };

  return (
    <div>
      <div className="flex flex-col ">
        <div className="flex justify-between border-b-4 border-black py-3 px-2 items-center">
          <div className="break-words font-bold">11th commerce b.k birla</div>
          <div>
            <AiTwotoneSetting fontSize={20} />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div
            id="0"
            className="flex justify-between px-2.5 py-2 border-b-2  items-center"
          >
            <div className="font-semibold">Channels</div>
            <div
              onClick={() => {
                !fiia("0") ? setfilecreatinginid("0") : setfilecreatinginid("");
              }}
            >
              {fiia("0") ? (
                <AiFillFolderAdd fontSize={20} />
              ) : (
                <AiOutlineFolderAdd fontSize={20} />
              )}
            </div>
          </div>
          {fiia("0") && (
            <form
              onSubmit={initailchannelcreater}
              className=" border px-3 py-0.5 m-1 rounded-sm"
            >
              <input
                type="text"
                placeholder="Create Channel ..."
                onChange={(e) => setInitialchannelname(e.target.value)}
                autoFocus
                className="w-full outline-none border-none"
              />
            </form>
          )}
        </div>
        <nav>
          {portal?.fields?.map((field, i) => {
            return (
              <Channel
                f={field}
                fiia={fiia}
                portal={portal}
                setfilecreatinginid={setfilecreatinginid}
                setPortal={setPortal}
              />
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
