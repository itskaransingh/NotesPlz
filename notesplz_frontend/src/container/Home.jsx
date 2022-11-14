import Sidebar from "./Sidebar";
import Content from "./Content";
import { AiOutlineMenuUnfold, AiOutlineUser } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { portalQuery, userls } from "../utils/sanityqueries";
import { client } from "../client";
import { Route, Routes, useParams } from "react-router-dom";
import Contentcreater from "../components/Contentcreater";
import Landingpage from "../components/Landingpage";
import Portalsettings from "../components/Portalsettings";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";

const Home = () => {
  const [portal, setPortal] = useState({});
  const [toggle, settoggle] = useState(false);
  const [admindata, setAdmindata] = useState([]);
  const [parentidff, setparentidff] = useState("");
  const { portalid } = useParams();
  const [scfa, setScfa] = useState(false)
  const [isdark, setIsdark] = useState(true)
  const [alldocs, setAlldocs] = useState([]);

const user = userls()

  // console.log(portalid);
  useEffect(() => {
    client.fetch(portalQuery(portalid)).then((res) => {setPortal(res[0]);
      const auth =( res[0]?.admins?.filter((d)=> d?._ref == user?._id ).length == 1 )
      console.log(auth)
      setScfa(auth)
    });
  }, [portalid]);
  // useEffect(() => {
  //   client.fetch(portalQuery(portalid)).then((res) => setPortal(res[0]));
  //   console.log(parentidff);
  // }, [parentidff]);

useEffect(()=>{
  localStorage.theme='dark'; 
  localStorage.theme == 'dark' ? setIsdark(true) : setIsdark(false)
},[])

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

// Whenever the user explicitly chooses light mode
// localStorage.theme = 'light'

// Whenever the user explicitly chooses dark mode
// localStorage.theme = 'dark'

// Whenever the user explicitly chooses to respect the OS preference
// localStorage.removeItem('theme')




// console.log(controlsauth())

  return (
    <div>
      {" "}
      <div className="flex  md:flex-row flex-col ">
        <div className="flex-[0.3] md:block hidden">
          <Sidebar
          controlsauth={scfa}
            parentidff={parentidff}
            setparentidff={setparentidff}
            portal={portal}
            setPortal={setPortal}
            settoggle={settoggle}
          />
        </div>
        <div className="md:hidden flex flex-col ">
          <div className=" justify-between flex items-center h-14 sticky top-0 px-2 bg-teal-300 dark:bg-[#0F0F0F]">
            <div className="dark:text-[#AAAAAA]" onClick={() => settoggle(true)}>
              <AiOutlineMenuUnfold fontSize={30} />
            </div>
            <div className="text-2xl dark:text-yellow-500">NotesPlz</div>
            <div className="w-10 flex justify-center dark:text-[#AAAAAA]" onClick={(e)=>{localStorage.theme == 'dark'?(localStorage.theme='light',setIsdark(false)):(localStorage.theme='dark',setIsdark(true))}}>
              {
                isdark ? <BsFillMoonStarsFill fontSize={25}/> : <FaSun fontSize={30}/>
              }
            </div>
          </div>
          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ translateX: -200 }}
                animate={{ translateX: 0 }}
                exit={{ translateX: -700 }}
                className="h-screen  flex justify-between box-border dark:text-[#FFFFFF] fixed z-50 w-[100%] items-center "
              >
                <div className=" bg-white dark:bg-[#181818] h-full w-[82%]  overflow-x-hidden shadow-2xl">
                  <Sidebar
          controlsauth={scfa}
                    parentidff={parentidff}
                    setparentidff={setparentidff}
                    portal={portal}
                    setPortal={setPortal}
                    settoggle={settoggle}
                  />
                </div>
                <div className="mx-auto">
                  <motion.div
                    onClick={() => settoggle(false)}
                    initial={{ rotate: 360 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 360 }}
                    whileTap={{ transitionDuration: 0.1 }}
                    transition={{
                      duration: 1,
                      ease: "easeInOut",
                      repeatDelay: 1,
                    }}
                  >
                    <MdCancel fontSize={40} />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-[0.7]">
          <Routes>
            <Route index element={<Landingpage controlsauth={scfa}/>} />
            <Route path="docs/:pid">
              <Route
                index
                element={
                  <Content
          controlsauth={scfa}

                    parentidff={parentidff}
                    setAlldocs={setAlldocs}
                    alldocs={alldocs}
                  />
                }
              />
              <Route
                path="create"
                element={
                  <Contentcreater
          controlsauth={scfa}

                    parentidff={parentidff}
                    setparentidff={setparentidff}
                    settoggle={settoggle}
                    setAlldocs={setAlldocs}
                    alldocs={alldocs}
                  />
                }
              />
            </Route>
            <Route path="settings" element={<Portalsettings portal={portal}  setPortal={setPortal} admindata={admindata} setAdmindata={setAdmindata} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
