import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getLikedSongsv2 = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: { session }, } = await supabase.auth.getSession();

  if (!session?.user?.id) {
    console.error("User session not found.");
    return [];
  }

  const { data, error } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching liked songs:", error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({ ...item.songs, })) as Song[];
};

const getLikedSongsv3 = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: { session }, } = await supabase.auth.getSession();

  if (!session?.user?.id) {
    console.error("User session not found.");
    return [];
  }

  const { data, error } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching liked songs:", error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({ ...item.songs, })) as Song[];
};

const getLikedSongsv4 = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: { session }, } = await supabase.auth.getSession();

  if (!session?.user?.id) {
    console.error("User session not found.");
    return [];
  }

  const { data, error } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching liked songs:", error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({ ...item.songs, })) as Song[];
};

const getLikedSongsv5 = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: { session }, } = await supabase.auth.getSession();

  if (!session?.user?.id) {
    console.error("User session not found.");
    return [];
  }

  const { data, error } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching liked songs:", error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({ ...item.songs, })) as Song[];
};

const getLikedSongsv6 = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: { session }, } = await supabase.auth.getSession();

  if (!session?.user?.id) {
    console.error("User session not found.");
    return [];
  }

  const { data, error } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching liked songs:", error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({ ...item.songs, })) as Song[];
};

export { getLikedSongsv2, getLikedSongsv3, getLikedSongsv4, getLikedSongsv5, getLikedSongsv6 };
