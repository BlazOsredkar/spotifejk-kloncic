"use client";

import Button from "@/components/Button";
import { removeUserFromFamily } from "@/server/removeUserFromFamily";
import { SubscriptionWithUser } from "@/types";

interface FamilyMembersProps {
  familyMembers?: {
    id: string;
    full_name: string;
    avatar_url: string;
  }[];
}

const FamilyMembers: React.FC<FamilyMembersProps> = ({ familyMembers }) => {
    
  if (!familyMembers) {
    return (
      <></>
    );
  }
  return (
    <div className="mb-7 px-6">
      {familyMembers.map((member) => (
        <div key={member.id} className="flex flex-col gap-y-4">
          <h1 className="text-white text-2xl font-semibold">
            Added members to subscription
          </h1>
          <p>{member.full_name || "No name"}</p>
          <Button
            onClick={() => removeUserFromFamily(member.id)}
            className="w-[300px]"
          >
            Remove Member
          </Button>
        </div>
      ))}
    </div>
  );
};

export default FamilyMembers;
