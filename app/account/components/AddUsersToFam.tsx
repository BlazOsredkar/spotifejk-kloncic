"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import useAddToFamModal from "@/hooks/useAddToFamModal";
import { useUser } from "@/hooks/useUser";
import { addUserToFamily } from "@/server/addUserToFamily";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

const AddUsersToFam = () => {
  
  const { isLoading, subscription, user } = useUser();
  const addToFamModal = useAddToFamModal();

  const maxMembers = useMemo<number>(() => {
    return (subscription?.prices?.products?.metadata?.members || 0) as number;
  }, [subscription?.prices?.products?.metadata]);

  const onChange = (open: boolean) => {
    if (!open) {
      addToFamModal.onClose();
    }
  };

  const handleFormAction = async (data: FormData) => {
    const response = await addUserToFamily(data);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("User added to family");
    }
    addToFamModal.onClose();
  };

  

  return (
    <div>
      <Modal
        title="Add users to your subscription"
        description={`You can add up to ${maxMembers} users to your subscription. They will have access to all the same features as you.`}
        isOpen={addToFamModal.isOpen}
        onChange={onChange}
      >
        <form action={handleFormAction} className="flex flex-col gap-y-4">
          <div>
            <div className="pb-1">Add a user by user ID</div>
            <Input
              type="text"
              disabled={isLoading}
              placeholder="ID"
              name="id"
            />
          </div>
          <Button disabled={isLoading} type="submit">
            Add now
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AddUsersToFam;
