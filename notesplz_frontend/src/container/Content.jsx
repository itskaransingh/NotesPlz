import React, { useEffect } from "react";
import bg from "../assets/download.png";
import {  AiOutlineCloudUpload } from "react-icons/ai";
import { client } from "../client";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { docQuery } from "../utils/sanityqueries";
import Contentcard from "../components/Contentcard";
import Loader from "../components/Loader";

const Content = ({ setAlldocs, controlsauth, alldocs }) => {
  const navigate = useNavigate();
const [loading, setLoading] = useState(false)
  const { portalid, pid } = useParams();
  console.log(pid);
  
  useEffect(() => {
    setLoading(true)
    client.fetch(docQuery(pid, portalid)).then((res) => {
      setAlldocs(res);
      setLoading(false)
    });
    scrollTo(0, 100);
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
             {loading && <div className='text-4xl '>
            <Loader beat white />
            </div>}
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
