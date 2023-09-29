import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { LiaEditSolid } from "react-icons/lia";
import { UpdateProfile } from "../redux/userSlice";
import { BsPersonFillAdd } from "react-icons/bs";
import { CiLocationOn ,CiTwitter,CiLinkedin} from "react-icons/ci";
import { IoCodeWorkingSharp } from "react-icons/io5";
import {CgWebsite} from "react-icons/cg"
import {FaHashnode} from "react-icons/fa6"
import {PiGithubLogoLight} from "react-icons/pi"
import moment from "moment";

const ProfileCard = ({ user }) => {
  const { user: data, edit } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="w-full bg-transparent flex flex-col items-center shadow-sm  px-6 py-4">
        <div className="w-full flex items-center justify-between border-b pb-5 border-[#ff58cd]">
          <Link to={"/profile/" + user?._id} className="flex gap-2">
            <img
              src={user?.profileUrl ?? NoProfile}
              className="w-14 h-14 object-cover"
            />
            <div className="flex flex-col justify-center">
              <p className="text-lg font-medium text-ascent-1">
                {user?.firstName} {user?.lastName}
              </p>
              <span className="text-ascent-2">
                {user?.profession ?? "Profession: -- "}
              </span>
            </div>
          </Link>
          <div className="">
            {user?._id === data?._id ? (
              <LiaEditSolid
                size={22}
                className="text-[#fff] cursor-pointer"
                onClick={() => dispatch(UpdateProfile(true))}
              />
            ) : (
              <button
                onClick={() => {}}
                className="bg-[#fff] text-sm text-white p-1"
              >
                <BsPersonFillAdd size={20} className="text-[#ff58cd]" />
              </button>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 py-4 border-b border-[#ff58cd]">
          <div className="flex gap-2 items-center text-ascent-2">
            <CiLocationOn className="text-xl text-ascent-1" />
            <span>{user?.location ?? "Add Location"}</span>
          </div>
          <div className="flex gap-2 items-center text-ascent-2">
            <IoCodeWorkingSharp className="text-xl text-ascent-2" />
            <span>{user?.profession ?? "Job?"}</span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 py-4 border-b border-[#ff58cd]">
          <p className="text-md text-ascent-2 font-semibold">
            {user?.friends?.length} friends
          </p>
          <div className="flex items-center justify-between">
            <span className="text-ascent-1">view: </span>
            <span className="text-ascent-2" text-lg>
              {user?.views.length}
            </span>
          </div>
          <span className="text-base text-white">
            {user?.verified ? "Verified" : "Not Verified"}
          </span>

          <div className="flex item-center justify-between">
            <span className="text-ascent-2">Joined</span>
            <span className="text-ascent-2 text-base">
              {moment(user?.createAt).fromNow()}
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 py-4 pb-6">
          <p className="text-ascent-2 text-lg ">Social</p>

<div className="flex gap-2 items-center text-ascent-2">
<CiTwitter/>
<span>Twitter</span>
</div>

<div className="flex gap-2 items-center text-ascent-2">
<PiGithubLogoLight/> 
<span>Github</span>
</div>

<div className="flex gap-2 items-center text-ascent-2">
<FaHashnode/>
<span>Hashnode</span>
</div>

<div className="flex gap-2 items-center text-ascent-2">
<CiLinkedin/> 
<span>LinkedIn</span>
</div>


<div className="flex gap-2 items-center text-ascent-2">
<CgWebsite/> 
<span>Website</span>
</div>







        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
