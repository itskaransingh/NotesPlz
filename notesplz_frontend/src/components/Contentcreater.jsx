import React, { useEffect } from "react";
import { ImBin } from "react-icons/im";
import { BiArrowBack } from "react-icons/bi";
import { BsCardImage } from "react-icons/bs";
import { MdOutlineUploadFile } from "react-icons/md";
import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { client } from "../client";
import {  useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { docQuery } from "../utils/sanityqueries";


const Contentcreater = ({parentidff,setparentidff,controlsauth,setAlldocs,settoggle}) => {
  const [isfile, setisfile] = useState(true);
  const [uploadeddoc, setUploadeddoc] = useState(null);
  const [uploadedimg, setUploadedimg] = useState(null);
  const [isbothfilled, setIsbothfilled] = useState(false);
  const [isallfieldsfilled, setIsallfieldsfilled] = useState(true)
  const [title, settitle] = useState('')
  const [caption, setCaption] = useState('')
  

const {portalid} = useParams()
const navigate = useNavigate()


  const filefetching = (e) => {
    const { type, name } = e.target.files[0];
    client.assets
      .upload("file", e.target.files[0], { contentType: type, filename: name })
      .then((res) => {
        setUploadeddoc(res)
        console.log(res);
  });
  };


  const imgfetching = (e) => {
    const { type, name } = e.target.files[0];
    client.assets
      .upload("image", e.target.files[0], { contentType: type, filename: name })
      .then((res) => {
        setUploadedimg(res)
        console.log(res);
  });
  };


const docupload = () =>{
    if(uploadeddoc != null && uploadedimg != null){
        setIsbothfilled(true)
        setTimeout(()=>{setIsbothfilled(false)},5000)
    }
    else if(uploadeddoc != null && caption != '' && title != ''){
      console.log(uploadeddoc);
           const doc = {
            _key:uuidv4(),
            _type:'doc',
            // _id:uploadeddoc._id,
            title,
            caption,
            file:{
                _type:'file',
                asset:{
                    _type:'reference',
                    _ref:uploadeddoc?._id
                },
              },
            paw:portalid,
            pid:parentidff
           }
           client.create(doc).then((resp)=>{
            client.patch(portalid).setIfMissing({docs:[]}).insert('after','docs[-1]',[{
              _key:uuidv4(),
              _ref: resp?._id,
              _type:'docked',
            }]).commit().then((res)=>{
              client.fetch(docQuery(parentidff,res?._id)).then((resp)=>{
                setAlldocs(resp)
              })
            })
             navigate('../')
            console.log(resp)
    })
    }
    else if(uploadedimg != null && caption != '' && title != ''){
      const doc = {
        _key:uuidv4(),
        _type:'doc',
        // _id:uploadeddoc._id,
        title,
        caption,
        image:{
            _type:'image',
            asset:{
                _type:'reference',
                _ref:uploadedimg?._id
            },
          },
        paw:portalid,
        pid:parentidff
       }
       client.create(doc).then((resp)=>{
        client.patch(portalid).setIfMissing({docs:[]}).insert('after','docs[-1]',[{
          _key:uuidv4(),
          _ref: resp?._id,
          _type:'docked',
        }]).commit().then((res)=>{
          client.fetch(docQuery(parentidff,res?._id)).then((resp)=>{
            setAlldocs(resp)
          })
        })
        navigate('../')

        console.log(resp)
})

    }
    else{
        setIsallfieldsfilled(false)
        setTimeout(()=>{setIsallfieldsfilled(true)},3000)
    }
}

  return (
    <div className="flex-[0.7]">
      <div className="flex flex-col justify-center items-center my-5">
        <div className="flex flex-row justify-between w-[90%] items-center mb-5"> 
          <div onClick={()=>{navigate('../')}}>
          <BiArrowBack fontSize={25}/>
          </div>
        <div className="flex justify-center items-center   ">
          <div
            onClick={() => {
              setisfile(true);
            }}
            className={
              !isfile
                ? "bg-gray-600 flex justify-center border-r-2 text-white w-20 px-3 py-1 font-medium rounded-l-md "
                : "bg-black shadow-xl flex justify-center border-r-2 text-white w-20 px-3 py-1 font-medium rounded-l-md"
            }
          >
            Docs
          </div>
          <div
            onClick={() => {
              setisfile(false);
            }}
            className={
              !isfile
                ? "bg-black text-white px-3 py-1 font-medium rounded-r-md"
                : "bg-gray-600 text-white px-3 py-1 font-medium rounded-r-md"
            }
          >
            Images
          </div>
          </div>
        </div>
          {!isallfieldsfilled && <div className="text-red-500 text-xl pb-2 font-semibold">Plz Fill All Fields</div>}
          {isbothfilled && <div className="text-red-500 text-center pb-2 text-xl font-semibold">You Can Upload Only One Type Of Document At A Time</div>}
        <div className="flex justify-center items-center h-96 md:cursor-pointer md:w-[65%] border-2 w-[90%] rounded-lg bg-white">
          {" "}
          {isfile ? (
            uploadeddoc == null ? (
              <label htmlFor="img" className="w-full md:cursor-pointer ">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col justify-center items-center  ">
                    <div className="text-gray-500">
                      <MdOutlineUploadFile fontSize={100} />
                    </div>
                    <div className="font-semibold text-gray-500">
                      Upload File
                    </div>
                    <div>PDF (Recommended)</div>
                  </div>
                  <div className="text-gray-600 font-semibold text-center">
                    Upload Files Of Type PDF, XLS
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="application/pdf,application/vnd.ms-excel"
                    onChange={filefetching}
                    name=""
                    id="img"
                  />
                </div>
              </label>
            ) : (
              <div className="w-full flex-col py-3 h-full flex justify-center items-center ">
                <div className="border-2 border-black h-[90%] w-auto">
                  <iframe
                    src={`${uploadeddoc?.url}#toolbar=0`}
                    alt="pdf"
                    className="w-full h-full "
                  />
               </div>
               
                    <div
                      className="flex justify-center  items-center   rounded-md h-10 w-[88%] hover:opacity-100 md:cursor-pointer  bg-gray-500  opacity-80 text-black"
                    onClick={() => setUploadeddoc(null)}
                    >
                      <ImBin fontSize={20} />
                    </div>
                
              </div>
            )
          ) : (
            uploadedimg == null ? (
              <label htmlFor="img" className="w-full md:cursor-pointer">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col justify-center items-center  ">
                    <div className="text-gray-500">
                      <BsCardImage fontSize={100} />
                    </div>
                    <div className="font-semibold text-gray-500">Upload Image</div>
                  </div>
                  <div className="text-gray-600 font-semibold text-center">
                    Upload Image Of Type JPG,PNG,SVG
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={imgfetching}
                    name=""
                    id="img"
                  />
                </div>
              </label>
            ) : (
              <div className="w-full  h-full flex justify-center items-center ">
                <div className="border-2 relative border-black h-[90%] w-auto">
                <img
                  src={uploadedimg?.url}
                  alt=""
                  className="w-full h-full "
                />
                 <div className="absolute bottom-0 right-0 ">
                <div className="flex justify-center items-center mr-3 mb-3 h-10 w-10 hover:opacity-100 cursor-pointer  bg-gray-500 rounded-full opacity-80 text-black" onClick={()=>(
                  setUploadedimg(null)
                )}>
                <ImBin fontSize={20} />
                  </div>  
                  </div>
                </div>
                
              </div>
            )
         
      )
    }
        </div>
        <div className="flex flex-col md:w-[65%]  w-[90%] mt-2 gap-2">
        <label htmlFor="title" className="text-lg font-semibold">
          Title
        </label>
        <input
          type="text"
          name=""
          id="title"
          onChange={(e) => settitle(e.target.value)}
          className="text-lg p-2 outline-none border rounded-lg"
        />
      </div>
        <div className="flex flex-col md:w-[65%]  w-[90%] my-9 gap-2">
          <label htmlFor="caption" className="text-lg font-semibold">
            Caption
          </label>
          <input
            type="text"
            name=""
            id="caption"
            onChange={(e) => setCaption(e.target.value)}
            className="text-lg p-2 outline-none rounded-lg border"
          />
        </div>
{ controlsauth &&  <div onClick={()=>{docupload()}} className="bg-slate-700 active:bg-slate-800 w-[90%] flex justify-center items-center py-3 rounded-lg shadow-2xl">
          <AiOutlineCloudUpload color="lightblue" fontSize={35} />
        </div>}
      </div>
    </div>
  );
};

export default Contentcreater;
