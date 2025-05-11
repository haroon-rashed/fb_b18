import React from "react";
import { FaGlobe, FaRegComment, FaThumbsUp, FaUser } from "react-icons/fa";
import { GoDot, GoDotFill } from "react-icons/go";
import { FiThumbsUp } from "react-icons/fi";
import { PiShareFat } from "react-icons/pi";
import moment from "moment";

const GetPosts = ({ background, caption, _id, user_id, createdAt }) => {
  return (
    <>
      <div className="shadow-lg xl:w-[70%] mx-auto lg:w-[80%] md:w-[90%] w-[95%] bg-white rounded-md my-2">
        <div className="flex p-3 justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-3">
              <div className="w-[45px] h-[45px] bg-gray-200 border-gray-300 rounded-full border flex justify-center items-center">
                <FaUser size={25} className="text-gray-600" />
              </div>
            </div>
            <div className="">
              <h6 className="font-semibold text-sm">RAC Photography</h6>
              <div className="flex items-center gap-1">
                <div className="text-sm font-semibold text-gray-500">
                  {moment().diff(moment(createdAt), "hours") < 24
                    ? moment(createdAt).fromNow()
                    : moment(createdAt).format("MMM D, YYYY")}
                </div>
                <div className="text-sm h-[2px] w-[2px] rounded-full font-semibold bg-gray-500"></div>
                <div className="text-sm font-semibold text-gray-500">
                  <FaGlobe />
                </div>
              </div>
            </div>
          </div>
        </div>
        {(background.startColor == "#ffffff" || background.image != "") && (
          <p className="text-gray-900  p-3 my-2 capitalize ">{caption}</p>
        )}

        <div
          className={
            background.startColor != "#ffffff" || background.image != ""
              ? "h-[400px] relative"
              : "h-0"
          }
          style={{
            background: background.image
              ? `url(${background?.image})`
              : `linear-gradient(${background?.startColor},${background?.endColor})`,
            backgroundSize: "contain",
            backgroundPosition: "center center",
          }}
        >
          {(background.startColor != "#ffffff" || background.image != "") && (
            <p className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 my-2 text-white capitalize text-4xl">
              {caption}
            </p>
          )}
        </div>
        <div className="flex gap-2 p-3">
          <div className="flex"></div>
          <p className="text-gray-600 m-0">You and 14 others</p>
        </div>
        <hr className="bg-gray-300 h-[1px] border border-0" />
        <div className="flex justify-between items-center p-3">
          <div className="flex gap-2 justify-center items-center w-full">
            <FiThumbsUp className="text-gray-600" />
            <h6 className="font-semibold text-sm text-gray-600">Like</h6>
          </div>
          <div className="flex gap-2 justify-center items-center w-full">
            <FaRegComment className="text-gray-600" />
            <h6 className="font-semibold text-sm text-gray-600">Comment</h6>
          </div>
          <div className="flex gap-2 justify-center items-center w-full">
            <PiShareFat className="text-gray-600" />
            <h6 className="font-semibold text-sm text-gray-600">Share</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetPosts;
