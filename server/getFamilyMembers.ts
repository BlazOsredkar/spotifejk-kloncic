import { getFamilyMembersSub, getFamilyMembersUsr } from "@/libs/supabaseAdmin";
import { Subscription, SubscriptionWithUser } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getFamilyMembers() {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: subData, error: subError } = await supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .in("status", ["trialing", "active"])
    .single();

  if (subError) {
    console.error(subError);
    return;
  }
  const subscription = subData as Subscription;

  const subscriptions = await getFamilyMembersSub(subscription.id);
  const user_ids = subscriptions.map((sub) => sub.user_id);
  const users = await getFamilyMembersUsr(user_ids);

  return users as {
    id: string;
    full_name: string;
    avatar_url: string;
  }[];
}
