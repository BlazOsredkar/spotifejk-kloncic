import { Song } from "@/types";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSong = (song: Song ) => {
    const SupabaseClient = useSupabaseClient();

    if(!song) {
        return "";
    }

    const { data: songData} = SupabaseClient
    .storage
    .from("songs")
    .getPublicUrl(song.song_path);

    return songData.publicUrl;
}

export default useLoadSong;
