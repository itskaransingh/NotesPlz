import Sidebar from "./container/Sidebar";
import Content from "./container/Content";
import { AiOutlineMenuUnfold, AiOutlineUser } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [toggle, settoggle] = useState(false);
  return (
    <div className="App">
      <div className="flex  md:flex-row flex-col">
        <div className="flex-[0.3] md:block hidden">
          <Sidebar />
        </div>
        <div className="md:hidden flex flex-col ">
          <div className=" justify-between flex items-center py-2 px-2 bg-teal-300">
            <div onClick={() => settoggle(true)}>
              <AiOutlineMenuUnfold fontSize={20} />
            </div>
            <div>NotesPlz</div>
            <div>
              <AiOutlineUser fontSize={20} />
            </div>
          </div>
          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ translateX: -200 }}
                animate={{ translateX: 0 }}
                exit={{ translateX: -700 }}
                className="h-screen flex justify-between box-border fixed z-50 w-[100%] items-center "
              >
                <div className=" bg-white h-full w-[82%] overflow-y-auto overflow-x-hidden shadow-2xl">
                  <Sidebar/>
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
                    <MdCancel  fontSize={40} />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div>
          <Content />
        </div>
      </div>
    </div>
  );
}

export default App;
