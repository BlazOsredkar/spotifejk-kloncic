import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useGetSongById = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [song, setSong] = useState<Song | null>(null);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        // .eq("ad", false)
        .eq("id", id)
        .single();
      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }
      setSong(data);
      setIsLoading(false);
    };
    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(() => ({ isLoading, song }), [isLoading, song]);
};

export default useGetSongById;
