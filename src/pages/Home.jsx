import React, { useState } from "react";
import { CustomButton, Loading, TextInput, TopBar } from "../components";
import { useSelector } from "react-redux";
import { ProfileCard } from "../components";
import { FriendsCard } from "../components";
import {PostCard} from "../components"
import { suggest, requests, posts } from "../assets/data";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { BiImage, BiSolidVideos } from "react-icons/bi";
import { BsFiletypeGif } from "react-icons/bs";


function Home() {
  const { user } = useSelector((state) => state.user);
  const [friendRequest, setFriendRequest] = useState(requests);
  const [suggestedFriends, setSuggestedFriends] = useState(suggest);
  const [posting, setPosting] = useState(false);
  const [Loading, setLoading] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handlePostSubmit = async (data) => {};
  return (
    <div className=" w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
      <TopBar />

      <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
        {/*
         left 
         */}
        <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-auto">
          <ProfileCard user={user} />
          <FriendsCard friends={user?.friends} />
        </div>
        {/* 
        center
         */}
        <div className="flex-1 h-full  flex flex-col  gap-6 overflow-y-auto">
          <form
            onSubmit={handleSubmit(handlePostSubmit)}
            className="  px-4 "
          >
            <div className="w-full flex items-center gap-2 py-4 border-b border-[#ff58cd] ">
              <img
                src={user?.profileUrl ?? NoProfile}
                alt="User Image"
                className="w-14 h-14 object-cover"
              />
              <TextInput
                stayles="w-full  py-5"
                placeholder="New Code? Share here ..."
                name="description"
                register={register("description", {
                  required: "Ask Something",
                })}
                error={errors.description ? errors.description.message : ""}
              />
            </div>
            {errMsg?.message && (
              <span
                role="alert"
                className={`text-sm ${
                  errMsg?.status === "failed"
                    ? "text-[#58ff6b]"
                    : "text-[#ff5858]"
                }mt-0.5`}
              >
                {errMsg?.messsage}
              </span>
            )}
            <div className="flex items-center justify-between py-4">
              <label
                htmlFor="imgUpload"
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
              >
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  id="imgUpload"
                  data-max-size="5120"
                  accept=".jpg, .png , .jpeg"
                />
                <BiImage />
                <span>Image</span>
              </label>
              <label
                htmlFor="vgifUpload"
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
              >
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  id="vgifUpload"
                  data-max-size="5120"
                  accept=".gif"
                />
                <BsFiletypeGif />
                <span>Gif</span>
              </label>
              <label
                htmlFor="videoUpload"
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
              >
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  id="videoUpload"
                  data-max-size="5120"
                  accept=".mp4, .wav"
                />
                <BiSolidVideos />
                <span>Video</span>
              </label>
              <dir>
                {posting ? (
                  <Loading />
                ) : (
                  <CustomButton
                    type="submit"
                    title="Post"
                    containerStyles="bg-[#fff] text-black py-1 px-6  font-semiboald text-sm"
                  />
                )}
              </dir>
            </div>
          </form>
          {Loading ? (
            <Loading />
          ) : posts?.length > 0 ? (
            posts?.map((post) => (<PostCard key={post?._id} post={post} 
            user={user}
            deletePost={()=> {}}
            likePost={()=> {}}
            />))
          ) : (
            <div className="flex w-full h-full items-center justify-center">
              <p className="text-lg text-ascent-2">No Post Avalibale</p>
            </div>
          )}
        </div>

        {/* 
        right
         */}
        <div className=" bg-transparent hidden w-1/4 h-full lg:flex flex-col gap-8">
          {/* friend Request */}
          <div className="w-full bg transparent shadow-sm px-6 py-5">
            <div className="flex items-center justify-between text-xl text-ascent-2 bp-2 border-[#ff58cd]">
              <span>Friend Request</span>
              <span>{friendRequest?.length}</span>
            </div>
            <div className="w-full flex flex-col gap-4 pt-4">
              {friendRequest?.map(({ _id, requestFrom: from }) => (
                <div key={_id} className="flex items-center justify-between">
                  <Link
                    to={"/profile/" + from._id}
                    className="w-full flex gap-4 items-center cursor-pointer"
                  >
                    <img
                      src={from?.profileUrl ?? NoProfile}
                      alt={from?.firstName}
                      className="w-10 h-10 object-cover "
                    />
                    <div className="flex-1">
                      <p className="text-base font-medium text-ascent-2 ">
                        {from?.firstName} {from?.lastName}
                      </p>
                      <span className="text-sm text-ascent-2">
                        {from?.profession ?? "__"}
                      </span>
                    </div>
                  </Link>
                  <div className="flex gap-1">
                    <CustomButton
                      title="Accept"
                      containerStyles="bg-transparent text-xs text-white px-1.5 py-1"
                    />
                    <CustomButton
                      title="Deny"
                      containerStyles="bg-transparent text-xs text-white px-1.5 py-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Sugest Friends */}
          <div className="w-full bg-transparent shadow-sm px-5 py-5">
            <div className="flex items-center justify-between text-lg text-ascent-2 border-b border-[#ff58cd]">
              <span>Suggest Friends</span>
            </div>
            <div className="w-full flex flex-col gap-4 pt-4">
              {suggestedFriends?.map((friend) => (
                <div
                  className="flex items-center justify-between"
                  key={friend._id}
                >
                  <Link
                    to={"/profile/"}
                    className="w-full flex gap-4 items-center cursor-pointer"
                  >
                    <img
                      src={friend?.profileUrl ?? NoProfile}
                      alt={friend?.firstName}
                      className="w-10 h-10 object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-base font-sm text-ascent-2">
                        {friend?.firstName} {friend?.lastName}
                      </p>
                      <span className="text-sm text-ascent-2">
                        {friend?.profession ?? "--"}
                      </span>
                    </div>
                  </Link>
                  <div className="flex gap-1">
                    <button
                      className=" text-sm text-white p-1"
                      onClick={() => {}}
                    >
                      <AiOutlineUserAdd size={20} className="text-[#ff58cd]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
