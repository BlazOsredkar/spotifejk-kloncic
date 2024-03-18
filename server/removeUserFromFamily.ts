"use server";

import { getUserByID, removeMemberFromFamily } from "@/libs/supabaseAdmin";
import { Subscription } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function removeUserFromFamily(userId: string) {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: subData, error: subError } = await supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .in("status", ["trialing", "active"])
    .is("parent_id", null)
    .single();

  if (subError) {
    console.error(subError);
    return;
  }
  const subscription = subData as Subscription;

  if (!userId) {
    console.error("No id provided");
    return;
  }

  const user = await getUserByID(userId);

  await removeMemberFromFamily(subscription.id, user.id);

  revalidatePath("/account");
}
