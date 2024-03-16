"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
    songId: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {

    const router = useRouter();
    const { supabaseClient } = useSessionContext();

    const authModal = useAuthModal();
    const { user } = useUser();

    return ( 
        <button>
            Like
        </button>
     );
}
 
export default LikeButton;