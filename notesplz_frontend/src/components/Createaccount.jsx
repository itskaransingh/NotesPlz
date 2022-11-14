import React, { useState } from "react";
import { useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { client } from "../../../../picstack/picstack_frontend/src/client";
import vid from "../assets/Pexels Videos 3541.mp4";
import { loginQuery, unauthQuery, userls } from "../utils/sanityqueries";

const Createaccount = ({ setIsbacktologin, isbacktologin }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [usernavailable, setusernavailable] = useState(false);
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);
  const [loginuser, setLoginuser] = useState(null);
  const [loginftrue, setLoginftrue] = useState(true);
  const [isallfields, setIsallfields] = useState(true);
  const [adminlink, setAdminlink] = useState(false);

  const navigate = useNavigate();
  const user = userls();

  console.log(useLocation());
  const location = useLocation();

  useEffect(() => {
    if (user == null) {
      setLogin(false);
    }
    scrollTo(0, 100);
  }, []);

  useEffect(() => {
    if (location.hash != "")
      console.log(location.hash.slice(15)),
      setAdminlink(true);
    scrollTo(0, 100);
  }, [location.hash]);

  useEffect(() => {
    if (username !== null) {
      client.fetch(unauthQuery(username)).then((res) => {
        res.length == 0 ? setusernavailable(true) : setusernavailable(false);
      });
    }
  }, [username]);

  useEffect(() => {
    if (user && login && !isbacktologin) {
      client.fetch(loginQuery(user?.username, user?.password)).then((res) => {
        setLoginuser(res[0]);
      });
    }
  }, [user]);

  useEffect(() => {
    // console.log('runninng');
    if (loginuser != null && !isbacktologin) {
      !adminlink
        ? navigate(`/userpaw/${loginuser?._id}`, { replace: true }) 
        :navigate(`/admin/${location.hash.slice(15)}`, { replace: true })
    }
  }, [loginuser]);



  const loginhandler = () => {
    client.fetch(loginQuery(username, password)).then((res) => {
      if (res[0] != undefined) {
        console.log(res[0]);
        setLoginuser(res[0]);
        localStorage.setItem("user", JSON.stringify(res[0]));
       !adminlink? navigate(`/userpaw/${res[0]?._id}`,{replace:true})
       :navigate(`/admin/${location.hash.slice(15)}`, { replace: true })
       
      } else {
        setLoginftrue(false);
        setTimeout(() => {
          setLoginftrue(true);
        }, 3000);
      }
    });
  };

  const createuserhandler = () => {
    if (
      fname != "" &&
      lname != "" &&
      username != "" &&
      password != "" &&
      usernavailable
    ) {
      const doc = {
        _type: "users",
        fname,
        lname,
        username,
        password,
        isadmin: adminlink,
      };
      client.create(doc).then((res) => {
        localStorage.setItem("user", JSON.stringify(res));
      });
      setIsallfields(true);
      setFname("");
      setUsername("");
      setLname("");
      setPassword("");
      !adminlink
        ? navigate("/createportal", { replace: true })
        : navigate(`/admin/${location.hash.slice(15)}`, { replace: true });
    } else {
      setIsallfields(false);
      setInterval(() => setIsallfields(true), 3000);
    }
    // console.log(JSON.parse(localStorage.getItem('user')))
  };

  return (
    <div className="relative">
      <div className="w-screen h-screen relative">
        <video
          src={vid}
          className="w-full h-full object-cover"
          autoPlay
          loop
          controls={false}
        />
        <div className="absolute bg-blackOverlay flex flex-col justify-center  box-border items-center top-0 bottom-0 right-0 left-0">
          <div className=" flex justify-center items-center box-border gap-2 flex-col w-3/4">
            <div className="text-yellow-300 font-bold text-4xl pb-5">
              NotesPlz
            </div>
            {!loginftrue && (
              <div className="text-red-500 font-semibold text-lg text-center ">
                Wrong Username Or Password
              </div>
            )}
            {!isallfields && (
              <div className="text-red-500 font-bold text-2xl">
                Plz Fill All The Fields
              </div>
            )}
            {!login && (
              <div className="flex  w-full gap-1 overflow-hidden mx-auto box-border">
                <div className="flex flex-col w-2/4">
                  <label
                    htmlFor="name"
                    className="text-base text-white font-semibold"
                  >
                    Your First Name
                  </label>
                  <input
                    type="text"
                    name=""
                    id="name"
                    onChange={(e) => {
                      setFname(e.target.value);
                    }}
                    required
                    className="border-none outline-none px-1  py-0.5 rounded-sm text-lg"
                  />
                </div>
                <div className="flex flex-col w-2/4">
                  <label
                    htmlFor="lname"
                    className="text-base text-white font-semibold"
                  >
                    Your Last name
                  </label>
                  <input
                    type="text"
                    name=""
                    onChange={(e) => {
                      setLname(e.target.value);
                    }}
                    id="lname"
                    required
                    className="border-none outline-none px-1  py-0.5 rounded-sm text-lg"
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col w-full">
              <label
                htmlFor="uname"
                className="text-base text-white font-semibold"
              >
                {login ? "UserName" : "Create UserName"}
              </label>
              <input
                type="text"
                name=""
                id="uname"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="border-none outline-none px-1  py-0.5 rounded-sm text-lg"
                required
              />
              {!login && username != "" ? (
                usernavailable ? (
                  <div className="text-green-600 font-bold">
                    UserName Is Available
                  </div>
                ) : (
                  <div className="text-red-600 font-bold ">
                    This UserName Is Taken
                  </div>
                )
              ) : null}
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="pass"
                className="text-base text-white font-semibold"
              >
                {login ? "Password" : "Create Password"}
              </label>
              <input
                type="text"
                name=""
                id="pass"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="border-none outline-none px-1  py-0.5 rounded-sm text-lg"
                required
              />
            </div>
            {!login ? (
              <button
                onClick={() => createuserhandler()}
                className="bg-blue-800 w-full py-2 text-white font-bold rounded-md"
              >
                Create Account
              </button>
            ) : (
              <button
                onClick={() => loginhandler()}
                className="bg-blue-800 w-full py-2 text-white font-bold rounded-md"
              >
                Login
              </button>
            )}
            <div className="text-white flex gap-1 ">
              {!login ? "Already Have Account?" : "Don't Have Account?"}{" "}
              {!login ? (
                <div
                  onClick={() => {
                    setLogin(true);
                  }}
                  className="md:cursor-pointer text-blue-500 underline font-semibold"
                >
                  Login
                </div>
              ) : (
                <div
                  onClick={() => {
                    setLogin(false);
                  }}
                  className="md:cursor-pointer text-blue-500 underline font-semibold"
                >
                  Create Account
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createaccount;
