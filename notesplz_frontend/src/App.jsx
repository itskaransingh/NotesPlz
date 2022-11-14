import { Route, Routes } from "react-router-dom";
import Home from "./container/Home";
import Createaccount from './components/Createaccount'
import Createportal from "./components/Createportal";
import Userpaw from "./components/Userpaw";
import { useState } from "react";
import NotFound from "./components/NotFound";
import Addadmin from "./components/Addadmin";


function App() {
const [isbacktologin, setIsbacktologin] = useState(false)
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={ <Createaccount setIsbacktologin={setIsbacktologin} isbacktologin={isbacktologin}/>} />  
        <Route exact path="/userpaw/:userid" element={ <Userpaw  setIsbacktologin={setIsbacktologin} isbacktologin={isbacktologin}/>} />  
        <Route exact path="/createportal" element={ <Createportal />} />  
        <Route  path="/portal/:portalid/*" element={ <Home />} />  
        <Route exact path="/admin/:portalid" element={ <Addadmin />} />  
        <Route path="*" element={<NotFound />} />
       </Routes>
    </div>
  );
}

export default App;
