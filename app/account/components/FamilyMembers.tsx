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
    <div>
      {familyMembers.map((member) => (
        <div key={member.id}>
          <h1>Subscription Members</h1>
          <p>{member.full_name || "No name"}</p>
          <Button onClick={() => removeUserFromFamily(member.id)}>
            Remove Member
          </Button>
        </div>
      ))}
    </div>
  );
};

export default FamilyMembers;
