import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCodeSlash } from "react-icons/bs";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { MdOutlineDarkMode } from "react-icons/md";
import { ImSun } from "react-icons/im";
import { IoMdNotificationsOutline } from "react-icons/io";
import { SetTheme } from "../redux/theme";
import { Logout } from "../redux/userSlice";

function TopBar() {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";
    dispatch(SetTheme(themeValue));
  };

  const handleSearch = async (data) => {};

  return (
    <div className="topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-transparent ">
      <Link to="/" className="flex gap-2 items-center">
        <div className="p-1 md:p-2 bg-[#a40083] rounded text-white">
          <BsCodeSlash />
        </div>
        <span className="text-xl md:text-2xl text-[#a40083] font-semibold">
          We Code
        </span>
      </Link>
      <form
        className="hidden md:flex items-center justify-center"
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextInput
          placeholder="Search...."
          styles="w-[18rem] lg:w-[38rem] border-[#ff58cd] rounded-1-full py-2.5"
          register={register("search")}
        />
        <CustomButton
          title="search"
          type="submit"
          containerStyles="bg-[#ff58cd] text-white  px-6 py-2.5 mt-2 "
        />
      </form>

      {/* Icons */}

      <div className="flex gap-4 items-center text-ascent-1 text-md md:text-x1">
        <button onClick={() => handleTheme()}>
          {theme ? <MdOutlineDarkMode /> : <ImSun />}
        </button>
        <div className="hidden lg:flex">
          <IoMdNotificationsOutline />
        </div>
        <div>
          <CustomButton
            onClick={() => dispatch(Logout())}
            title="Log Out"
            containerStyles="text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#ff58cd] "
          />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
