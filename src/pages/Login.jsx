import React, { useState } from "react";
import { BsCodeSlash } from "react-icons/bs";
import { TextInput, Loading, CustomButton } from "../components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BgImage } from "../assets";
import ResetPassword from "./ResetPassword";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });


  const onSubmit = async(data) => {

  }



  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="bg-bgColor w-full h-[100vh] flex items-center justify-center p-6">
      <div className="w-full md:w-2/3 h-fit lg:h-full 2x1:h-5/6 py-8 lg:py-0 flex bg-primary rounded-x1 overflow-hidden shadow-x1">
        {/* Left */}
        <div className="w-full lg:w=1/2 h-full p-10 2x1:px-20 flex flex-col justify-center">
          <div className="w-full flex gap-2 items-center mb-6">
            <div className="p-2 bg-[#89169b] rounded text-white">
              <BsCodeSlash />
            </div>
            <span className="text-2xl" font-semibold style={{color:"fuchsia"}}>
              We Code
            </span>
          </div>
          <p className="text-ascent-1 text-base font-semibold">Log in</p>
          <span className="text-sm mt-2 text-ascent-2">welcomeBack</span>
          <form className="py-8 flex flex-col gap-5" 
          onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name="email"
              placeholder="WeCode@example.com"
              lable="Email"
              type="email"
              register={register("email", {
                required: "Email is Required",
              })}
              styles="w-full rounded-full"
              labelStyle="ml-2"
              error={errors.email ? errors.email.message : ""}
            />
            <TextInput
              name="password"
              placeholder="********"
              type="password"
              styles="w-full rounded-full"
              labelStyle="ml-2"
              register={register("password", {
                required: "PassWord Is Required",
              })}
              error={errors.password ? errors.password?.message : ""}
            />

            <Link
            style={{color:"fuchsia"}}
              to="/resetpassword"
              className="text-sm text-right text-purple font-semibold"
            >
              Forgot PassWord
            </Link>{" "}
            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status == "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                }mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}
            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm front-medium text-white outline-none`}
                title="Login"
              />
            )}
          </form>

          <p className="text-ascent-2 text-sm text-center">
            Dont have an Account?
            <Link
              to="/register"
              className="text-[#a735cd] font-semibold ml-2 cursor-pointer"
            >
              Create an Account
            </Link>
          </p>
        </div>
        {/* Right */}
        <div>
{/*         <div style={{height:20}}>
  <ResetPassword />
</div> */}
          
        </div>
      </div>
    </div>
  );
}

export default Login;
