import React, { useEffect } from "react";
import bg from "../assets/download.png";
import {  AiOutlineCloudUpload } from "react-icons/ai";
import { client, urlfor } from "../client";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { docQuery } from "../utils/sanityqueries";
import Contentcard from "../components/Contentcard";

const Content = ({ setAlldocs, controlsauth, alldocs }) => {
  const navigate = useNavigate();
  const { portalid, pid } = useParams();
  console.log(pid);
  useEffect(() => {
    client.fetch(docQuery(pid, portalid)).then((res) => {
      console.log(res);
      setAlldocs(res);
    });
    scrollTo(0, 100);
  }, [pid]);

  // useEffect(()=>{
  //      client.fetch(controlsauthQuery(portalid)).then((res)=>{
  //       console.log(res);
  //      })
  // },[])

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
    <div className=" h-[84.6vh] relative overflow-y-hidden">
      <div className="h-full bg-gray-700">
        <img className="h-full  object-cover" src={bg} alt="" />
      </div>
      <div className="absolute bottom-0 right-0 left-0 top-0 flex flex-col  ">
        <div className="h-[100%] overflow-y-auto">
          <div className="flex justify-start pt-5 gap-7 overflow-y-auto items-center md:justify-end min-h-full w-full flex-col">
            {alldocs?.length != 0 &&
              alldocs?.map((d) => (
               <Contentcard d={d} controlsauth={controlsauth} />
              )) }
          </div>
        </div>
      {controlsauth &&  <div
          className="h-20 overflow-hidden sticky bottom-0 rounded-t-full "
          onClick={() => {
            navigate("create");
          }}
        >
          <div className="flex-row flex justify-center rounded-t-full items-center gap-2 h-20 bg-[#707579] active:bg-[#504c4c] shadow-xl bottom-0">
            <AiOutlineCloudUpload fontSize={40} />
            <div className="text-2xl font-medium">Upload</div>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Content;
