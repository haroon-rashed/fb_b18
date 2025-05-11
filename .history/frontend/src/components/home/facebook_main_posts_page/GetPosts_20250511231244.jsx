import React, { useEffect, useState } from "react";
import { FaGlobe, FaRegComment, FaThumbsUp, FaUser } from "react-icons/fa";
import { GoDot, GoDotFill } from "react-icons/go";
import { FiThumbsUp } from "react-icons/fi";
import { PiShareFat } from "react-icons/pi";
import moment from "moment";
import EmojiReactions from "../Feeds/EmojiReactions";
import { useDispatch } from "react-redux";
import { getReactionsData } from "../../../features/posts/postSlice";
import axios from "axios";
import { emojiMap } from "./emojis";

const GetPosts = ({
  background = {
    startColor: '#ffffff',
    endColor: '#ffffff',
    image: ''
  },
  caption,
  _id,
  user_id,
  createdAt,
  postImage,
}) => {
  const [likes, setLikes] = useState([]);

  const getLikes = async () => {
    let response = await axios.get(`http://localhost:5174/api/posts/get-reactions/${_id}`);
    console.log(response.data);
    setLikes(response.data);
  };

  useEffect(() => {
    getLikes();
  }, []);

  // Determine caption position based on conditions
  const showCaptionAbove = postImage || (background.startColor === "#ffffff" && !background.image);
  const showCaptionCentered = !postImage && (background.image || background.startColor !== "#ffffff");

  return (
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

      {/* Show caption above if postImage exists or it's default background */}
      {showCaptionAbove && (
        <p className="text-gray-900 p-3 my-2 capitalize">{caption}</p>
      )}

      {/* Image container - only show if there's a background or post image */}
      {(background.image || postImage || background.startColor !== "#ffffff") && (
        <div
          className="h-[400px] relative"
          style={{
            background: postImage 
              ? `url(${postImage})`
              : background.image
                ? `url(${background.image})`
                : `linear-gradient(${background.startColor},${background.endColor})`,
            backgroundSize: "contain",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Show caption centered if there's a background image or color (and no postImage) */}
          {showCaptionCentered && (
            <p className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 my-2 text-white capitalize text-4xl">
              {caption}
            </p>
          )}
        </div>
      )}

      {/* Rest of the component remains unchanged */}
      <div className="flex gap-2 p-3">
        <div className="flex"></div>
        <p className="text-gray-600 flex gap-1 m-0">
          <div className="flex items-center">
            {(() => {
              const seen = new Set();
              const reactions = [];

              likes?.forEach((item) => {
                if (!seen.has(item?.type)) {
                  seen.add(item?.type);
                  reactions.push(item?.type);
                }
              });

              return reactions.map((type, index) => {
                const emoji = emojiMap[type];
                if (!emoji) return null;

                return (
                  <span
                    key={type}
                    className={`relative z-${50 - index} -ml-2 animate-shake`}
                    style={{ animationDuration: '0.5s' }}
                  >
                    <picture>
                      <source srcSet={emoji.webp} type="image/webp" />
                      <img
                        src={emoji.gif}
                        alt={emoji.alt}
                        width="22"
                        height="22"
                        className="rounded-full"
                      />
                    </picture>
                  </span>
                );
              });
            })()}
          </div>
          {likes?.length}
        </p>
      </div>
      <hr className="bg-gray-300 h-[1px] border border-0" />
      <div className="flex justify-between items-center p-3">
        <EmojiReactions post_id={_id} likes={likes} />

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
  );
};

export default GetPosts;