"use client";

import Button from "@/components/Button";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import AddUsersToFam from "./AddUsersToFam";
import useAddToFamModal from "@/hooks/useAddToFamModal";
import { metadata } from "@/app/layout";

const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, subscription, user } = useUser();
  const addToFamModal = useAddToFamModal();
  const maxMembers = useMemo<number>(() => {
    return (subscription?.prices?.products?.metadata?.members || 0) as number;
  }, [subscription?.prices?.products?.metadata]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: "/api/create-portal-link",
      });
      window.location.assign(url);
    } catch (error) {
      if (error) {
        toast.error((error as Error).message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="mb-7 px-6">
      <div className="text-lg mb-4 border border-#18a030-400 inline-block p-4 rounded-md" style={{ marginTop: '20px' }}>
  <h1 className="text-3xl font-bold mb-4">{user?.email ?? "User"}</h1>
  <p className="text-lg mb-4">
      Name: {user?.user_metadata?.full_name ?? "Full name"}
  </p>
  <p className="text-lg mb-4">ID: {user?.id || "User ID"}</p>
</div>

      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p>No active subscriptions</p>
          <Button onClick={subscribeModal.onOpen} className="w-[300px]">
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the{" "}
            <b>{subscription?.prices?.products?.name}</b> plan.
          </p>
          <Button
            className="w-[300px]"
            onClick={redirectToCustomerPortal}
            disabled={loading || isLoading}
          >
            Open customer portal
          </Button>
          {(subscription?.child_count || 0) < maxMembers &&
            !subscription?.parent_id && (
              <Button onClick={addToFamModal.onOpen} className="w-[300px]">
                Add users to subscription
              </Button>
            )}
        </div>
      )}
    </div>
  );
};

export default AccountContent;
