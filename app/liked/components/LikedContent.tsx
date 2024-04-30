import Client from 'client';
import ThumbUpButton from "@/components/ThumbUpButton";
import MediaCard from "@/components/MediaCard";
import useMediaPlayback from "@/hooks/useMediaPlayback";
import { useClient } from "@/hooks/useClient";
import { MusicTrack } from "@/types";
import { useRoute } from "next/navigation";
import { useEffect } from "react";

interface LikedContentProps {
  tracks: MusicTrack[];
}

const LikedContent: React.FC<LikedContentProps> = ({ tracks }) => {
  const route = useRoute();
  const { loading, client } = useClient();

  const onPlay = useMediaPlayback(tracks);

  useEffect(() => {
    if (!loading && !client) {
      route.replace("/");
    }
  }, [loading, client, route]);

  if (tracks.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No liked tracks
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {tracks.map((track) => (
        <div key={track.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaCard onClick={(id: string) => onPlay(id)} data={track} />
          </div>
          <ThumbUpButton trackId={track.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
