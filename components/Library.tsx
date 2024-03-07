"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

const Library: React.FC = () => {
  const onClick = () => {
    // do something
  };
  return (
    <div className="flex flex-col">
      <div
        className="
            flex
            items-center
            justify-between
            px-5
            py-4
        "
      >
        <div
          className="
            inline-flex
            items-center
            gap-x-2
        "
        >
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-md font-medium text-neutral-400">Your library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 px-3 mt-4">List of songs!</div>
    </div>
  );
};

export default Library;
