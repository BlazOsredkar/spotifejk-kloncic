import Header from "@/components/Header";
import AccountContent from "./components/AccountContent";
import { getFamilyMembers } from "@/server/getFamilyMembers";
import FamilyMembers from "./components/FamilyMembers";

const Account = async () => {
  const familyMembers = await getFamilyMembers();
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Account settings
          </h1>
        </div>
      </Header>
      <AccountContent />
      <FamilyMembers familyMembers={familyMembers} />
    </div>
  );
};

export default Account;
