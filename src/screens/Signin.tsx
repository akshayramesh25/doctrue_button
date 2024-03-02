import React, { useEffect, useState } from "react";
import { Logo, Visibility, VisibilityOff } from "../assets/icons/Icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useData } from "../lib/Context";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const { handleLogin, hospData } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (hospData) {
      navigate("/tvscreen");
    }
  }, [hospData, navigate]);

  return (
    <div className="flex flex-row w-full h-screen">
      <ToastContainer />
      <div className="w-1/2 max-h-screen hidden md:flex">
        <img
          src={require("../assets/images/signin.png")}
          alt="Sign in"
          className="object-cover w-full max-h-screen"
        />
      </div>
      <div className="rounded-2xl border-[1px] border-white bg-white md:pt-20 px-10 lg:px-[156px] flex flex-col justify-center items-center w-full md:w-1/2">
        <div className="mx-36">
          <Logo />
        </div>
        <form
          className="mt-28 flex flex-col w-full"
          onSubmit={(e) => handleLogin({ email, password }, e)}
        >
          <p className="text-dark text-xl md:text-2xl font-bold text-left mb-11">
            Sign In for DocTrue
          </p>
          <p className="text-dark text-xs md:text-sm mb-2">Email Address</p>
          <input
            className="rounded-lg px-3 py-2 border-[0.5px] border-sbBorder w-full mb-4 focus:outline-none"
            placeholder="Enter Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            minLength={0}
            id="email"
            required
          />
          <p className="text-dark text-xs md:text-sm mb-2">Password</p>
          <div className="flex justify-between items-center rounded-lg px-3 py-2 border-[0.5px] border-sbBorder w-full mb-9 bg-white">
            <input
              className="border-0 p-0 focus:ring-0 w-full mr-5 focus:outline-none"
              placeholder="8+ characters"
              type={visible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              id="password"
              required
            />
            <span
              onClick={() => setVisible(!visible)}
              className="cursor-pointer"
            >
              {visible ? <VisibilityOff /> : <Visibility />}
            </span>
          </div>
          <button
            type="submit"
            disabled={email.length === 0 && password.length === 0}
            className={`rounded-lg w-full text-sm font-semibold ${
              email.length !== 0 && password.length !== 0
                ? "bg-sbTextHover text-white"
                : "bg-signinButton text-signinText"
            }  p-4 mb-36`}
            // onClick={(e) => handleLogin({ email, password }, e)}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
