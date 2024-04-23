import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getAdIds = async (): Promise<string[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("ad", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return (data as Song[]).map((song) => song.id) || [];
};

export default getAdIds;
