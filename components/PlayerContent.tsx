"use client";

// @ts-ignore
import useSound from "use-sound";
import { useEffect, useMemo, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";
import MusicSlider from "./MusicSlider";
import MusicTime from "./MusicTime";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
  songAfterAdId: string | null;
  setSongAfterAdId: (id: string | null) => void;
  ad_ids: string[];
}

const PlayerContent: React.FC<PlayerContentProps> = ({
  song,
  songUrl,
  songAfterAdId,
  setSongAfterAdId,
  ad_ids,
}) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(
    localStorage.getItem("volume")
      ? parseFloat(localStorage.getItem("volume")!)
      : 1
  );
  const [listened, setListened] = useState(
    localStorage.getItem("listened")
      ? parseInt(localStorage.getItem("listened")!)
      : 0
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [seekPosition, setSeekPosition] = useState(0); // State to track the seek position
  const [musicProgress, setMusicProgress] = useState(0);
  const subscribeModal = useSubscribeModal();
  const { user, subscription } = useUser();

  useEffect(() => {
    localStorage.setItem("volume", volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem("listened", listened.toString());
  }, [listened]);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = (end: boolean = false) => {
    if (player.ids.length === 0) {
      return;
    }
    if (end !== true && songAfterAdId !== null) {
      toast.error("You need to listen to the ad first");
      return;
    }

    let currentIndex = player.ids.findIndex((id) => id === player.activeId);
    if (songAfterAdId) {
      currentIndex = player.ids.findIndex((id) => id === songAfterAdId);
      setSongAfterAdId(null);
    }
    console.log("Curent index" + currentIndex);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }
    if (!subscription) {
      listened: localStorage.setItem("listened", (listened + 1).toString());
    }

    if (listened >= 2 && !subscription) {
      localStorage.setItem("listened", "0");
      //play the ad
      //continue playing the songs
      // player.setId(nextSong);
      console.log("Playing ad: " + nextSong);
      setSongAfterAdId(player.activeId!);
      const randomAd = ad_ids[Math.floor(Math.random() * ad_ids.length)];
      player.setId(randomAd);
    } else {
      player.setId(nextSong);
    }
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    if (songAfterAdId !== null) {
      toast.error("You need to listen to the ad first");
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: localStorage.getItem("volume")
      ? parseFloat(localStorage.getItem("volume")!)
      : 1,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      //add a +1 to the listened state
      if (!subscription) {
        listened: localStorage.setItem("listened", (listened + 1).toString());
      }
      onPlayNext(true);
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  useEffect(() => {
    const updateProgress = () => {
      if (sound) {
        // Get the current position of the music and update the musicProgress state
        setMusicProgress(sound.seek());
      }
    };

    // Update the music progress every 100 milliseconds
    const interval = setInterval(updateProgress, 100);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [sound]);

  const handleSeek = (value: number) => {
    setSeekPosition(value);
    console.log(value);
    if (sound) {
      //play from the seek position
      console.log(sound.duration());
      sound.seek(value);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div
        className="
            flex
            md:hidden
            row-span-2
            w-full
            justify-end
            items-center
          "
      >
        <div
          onClick={handlePlay}
          className="
              h-10
              w-10
              flex
              items-center
              justify-center
              rounded-full
              bg-white
              p-1
              cursor-pointer
            "
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div
        className="
            hidden
            h-full
            md:flex
            justify-center
            items-center
            row-span-1
            w-full

            gap-x-6
            flex-col
          "
      >
        <div className="flex gap-x-4 w-full items-center">
          <MusicTime currentTime={musicProgress} />
          <MusicSlider
            value={musicProgress}
            onChange={handleSeek}
            duration={sound?.duration() || 1}
          />
        </div>
        <div className="flex gap-x-4 items-center pb-4">
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={30}
            className="
              text-neutral-400
              cursor-pointer
              hover:text-white
              transition
            "
          />
          <div
            onClick={handlePlay}
            className="
              flex
              items-center
              justify-center
              h-10
              w-10
              rounded-full
              bg-white
              p-1
              cursor-pointer
            "
          >
            <Icon size={30} className="text-black" />
          </div>
          <AiFillStepForward
            onClick={() => onPlayNext()}
            size={30}
            className="
              text-neutral-400
              cursor-pointer
              hover:text-white
              transition
            "
          />
        </div>
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
