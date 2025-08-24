import { supabaseAdmin } from '@/lib/supabase'


export const fetchUser = async (userEmail:string) => {
    try {
      const {data:users, error} = await supabaseAdmin
          .from("users")
          .select("*")
          .eq("email", userEmail)
          .limit(1);

      if(error)   throw error;

      return users[0];
    }
    catch (error) {
        throw error;
    }
}

export const fetchUserSubscription = async (userId:string) => {
    if(!userId || userId.length < 1) return;

    try {
      const {data:subscriptions, error} = await supabaseAdmin
          .from("subscriptions")
          .select("*")
          .eq("user_id", userId)
          .limit(1);

      if(error)   throw error;

      return subscriptions[0];
    }
    catch (error) {
        console.log(error);
    }
}

export const setSubscriptionStatus = async (subscriptionId:string, newStatus:string) => {
    if(!subscriptionId || !newStatus) return;

    try {
      const {data:subscriptions, error} = await supabaseAdmin
          .from("subscriptions")
          .update({status:newStatus})
          .eq("id", subscriptionId);

      if(error)   throw error;

      return subscriptions;
    }
    catch (error) {
        console.log(error);
    }
}

export const fetchDownsellVariant = async (userId:string, subscriptionId:string) => {
    if(!userId || !subscriptionId) return;

    try {
      const {data:cancellations, error} = await supabaseAdmin
          .from("cancellations")
          .select("*")
          .eq("user_id", userId)
          .eq("subscription_id", subscriptionId)
          .limit(1);

      if(error)   throw error;

      return cancellations[0];
    }
    catch (error) {
        console.log(error);
    }
}

export const insertCancellationEntry = async (cancellation:object) => {
    if(!cancellation) return;

    try {
      const {data:cancellations, error} = await supabaseAdmin
          .from("cancellations")
          .insert(cancellation)
          .select();

      if(error)   throw error;

      return cancellations;
    }
    catch (error) {
        console.log(error);
    }
}

export const setCancellation = async (cancellation: { id: string, reason?:string, accepted_downsell:boolean, has_job?:boolean, visa_help?:boolean }) => {
    if(!cancellation || !cancellation.id) return;

    try {
      const {data:cancellations, error} = await supabaseAdmin
          .from("cancellations")
          .update(cancellation)
          .eq("id", cancellation.id)
          .select();

      if(error)   throw error;

      return cancellations;
    }
    catch (error) {
        console.log(error);
    }
}