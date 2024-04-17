"use client";

import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useGetSongById from "@/hooks/useGetSongById";

import PlayerContent from "./PlayerContent";
import { useState } from "react";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId!);
  const [songAfterAdId, setSongAfterAdId] = useState<string | null>(null);

  //load all song that are not ads
  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div
      className="
        fixed 
        bottom-0 
        bg-black 
        w-full 
        py-2 
        h-[100px] 
        px-4
        items-center
      "
    >
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} songAfterAdId={songAfterAdId} setSongAfterAdId={setSongAfterAdId} />
    </div>
  );
};

export default Player;
