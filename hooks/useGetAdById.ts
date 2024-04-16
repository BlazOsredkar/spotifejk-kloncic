import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useGetAdById = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ad, setAd] = useState<Song | null>(null);
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
        .eq("ad", true)
        .eq("id", id)
        .single();
      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }
      setAd(data);
      setIsLoading(false);
    };
    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(() => ({ isLoading, ad }), [isLoading, ad]);
};


export default useGetAdById;