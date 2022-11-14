import React, { useEffect } from "react";
import bg from "../assets/download.png";
import { AiFillFilePdf, AiOutlineCloudUpload } from "react-icons/ai";
import { client } from "../client";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {  docQuery } from "../utils/sanityqueries";

const Content = ({  setAlldocs, alldocs, }) => {
 const navigate = useNavigate()
  const { portalid,pid } = useParams();
  console.log(pid);
  useEffect(() => {
    client.fetch(docQuery(pid, portalid)).then((res) => {
      console.log(res);
      setAlldocs(res);
    });
    scrollTo(0,100)
  }, [pid]);

  // useEffect(()=>{
  //      client.fetch(controlsauthQuery(portalid)).then((res)=>{
  //       console.log(res);
  //      })
  // },[])

  


  return (
    <div className=" h-[84.6vh] relative overflow-y-hidden">
      <div className="h-full bg-gray-700">
        <img className="h-full  object-cover" src={bg} alt="" />
      </div>
      <div className="absolute bottom-0 right-0 left-0 top-0 flex flex-col  ">
        <div className="h-[100%] overflow-y-auto">
          <div className="flex justify-start pt-5 gap-7 overflow-y-auto items-center md:justify-end min-h-full w-full flex-col">
            {alldocs?.length != 0 &&
              alldocs?.map((d) => (
                <a
                  href={d?.image?.asset?.url ?? d?.file?.asset?.url}
                  target="_blank"
                  className="h-[60vh] lg:cursor-pointer cursor-default flex flex-col rounded-xl  overflow-hidden  w-[80%] shadow-2xl"
                >
                  {d?.file != null ? (
                    <div className=" h-[70%] w-full overflow-hidden">
                      <div className="bg-gray-600 h-full flex justify-center items-center w-full">
                        <AiFillFilePdf fontSize={150} />
                      </div>
                    </div>
                  ) : (
                    <div className=" h-[70%] w-full  overflow-hidden">
                      <div className="bg-gray-600 h-full flex justify-center items-center w-full">
                        <img src={d?.image?.asset?.url} alt="img" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                  <div className="text-white bg-slate-800 px-4 py-2 rounded-b-xl  font-semibold">
                    <div className="text-2xl ">{d?.title}</div>
                    <div className="text-lg text-gray-300">{d?.caption}</div>
                  </div>
                </a>
              ))}
          </div>
        </div>
        <div
          className="h-20 overflow-hidden sticky bottom-0 rounded-t-full "
          onClick={() => {
            navigate('create');
          }}
        >
          <div className="flex-row flex justify-center rounded-t-full items-center gap-2 h-20 bg-[#707579] active:bg-[#504c4c] shadow-xl bottom-0">
            <AiOutlineCloudUpload fontSize={40} />
            <div className="text-2xl font-medium">Upload</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
