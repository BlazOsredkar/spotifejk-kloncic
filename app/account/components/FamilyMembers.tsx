import Client from 'client';
import Button from "@/components/Button";
import { deleteUserFromGroup } from "@/server/deleteUserFromGroup";
import { GroupMember } from "@/types";

interface GroupMembersProps {
  members?: {
    id: string;
    fullName: string;
    avatarUrl: string;
  }[];
}

const GroupMembers: React.FC<GroupMembersProps> = ({ members }) => {
    
  if (!members) {
    return (
      <></>
    );
  }
  return (
    <div className="mb-7 px-6">
      {members.map((member) => (
        <div key={member.id} className="flex flex-col gap-y-4">
          <h1 className="text-white text-2xl font-semibold">
            Group Members
          </h1>
          <p>{member.fullName || "No name"}</p>
          <Button
            onClick={() => deleteUserFromGroup(member.id)}
            className="w-[300px]"
          >
            Remove Member
          </Button>
        </div>
      ))}
    </div>
  );
};

export default GroupMembers;
