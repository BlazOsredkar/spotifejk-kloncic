import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return null;
  }

  const getImageUrl = async () => {
    const { data: imageData, error } = await supabaseClient.storage
      .from("images")
      .getPublicUrl(song.image_path);

    if (error) {
      console.error("Error loading image:", error.message);
      return null;
    }

    return imageData?.publicUrl;
  };

  return getImageUrl();
};

export default useLoadImage;
