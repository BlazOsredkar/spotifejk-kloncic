"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerContext } from "react";
import { cookies } from "next/headers";
import { Subscription } from "@/types";
import { revalidatePath } from "next/cache";
import {
  getFamilyMembersSub,
  getUserByID,
  insertSubscription,
} from "@/libs/supabaseAdmin";
import { getFamilyMembers } from "./getFamilyMembers";

export async function addUserToFamily(formData: FormData) {
  // TODO
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

  const child_count = subscription.child_count || 0;

  const max_child_count = (subscription.prices?.products?.metadata?.members ||
    child_count) as number;

  if (child_count >= max_child_count) {
    return {
      error: "You have reached the maximum number of users",
    };
  }

  const userID = formData.get("id") as string;

  if (!userID) {
    return {
      error: "No id provided",
    };
  }

  const user = await getUserByID(userID);

  if (user.id === subscription.user_id) {
    return {
      error: "You can 't add yourself to the subscription",
    };
  }

  const user_ids_in_family = (await getFamilyMembersSub(subscription.id)).map(
    (sub) => sub.user_id
  );

  if (user_ids_in_family.includes(user.id)) {
    return {
      error: "User is already in the subscription",
    };
  }

  // @ts-ignore
  const subscriptionData: Subscription = {
    user_id: user.id,
    parent_id: subscription.id,
    status: subscription.status,
    price_id: subscription.price_id,
    quantity: subscription.quantity,
    cancel_at_period_end: subscription.cancel_at_period_end,
    current_period_start: subscription.current_period_start,
    current_period_end: subscription.current_period_end,
    ended_at: subscription.ended_at,
    cancel_at: subscription.cancel_at,
    canceled_at: subscription.canceled_at,
    trial_start: subscription.trial_start,
    trial_end: subscription.trial_end,
  };

  const newSubscription = await insertSubscription(subscriptionData);
  revalidatePath("/account");
  return {
    success: true,
  };
}
