import { create } from "zustand";
import { z } from "zod";

export const CancelFlowSchema = z.object({
    employed: z.enum(["yes", "no"]).nullable().default(null),
    foundViaMM: z.enum(["yes", "no"]).nullable().default(null),
    hasLawyer: z.enum(["yes", "no"]).nullable().default(null),
    flowCompletedEmployed: z.boolean().default(false),
    flowCompletedUnemployed: z.boolean().default(false),
    downsell_variant: z.enum(["A", "B"]).nullable().default(null),
    reason: z.string().nullable(),
    downsell_accepted: z.boolean().default(false),

    user: z.object({
        id: z.string(),
        email: z.string()
    }).nullable(),

    subscription: z.object({
        id: z.string(),
        user_id: z.string(),
        monthly_price: z.number(),
        status: z.enum(["active", "pending_cancellation", "cancelled"])
    }).nullable(),

    cancellation: z.object({
        id: z.string(),
        user_id: z.string(),
        subscription_id: z.string(),
    }).nullable()
});

export type CancelFlowState = z.infer<typeof CancelFlowSchema>;

export const useCancelFlowStore = create<{
    state: CancelFlowState;
    setState: (newState: Partial<CancelFlowState>) => void;
}>((set) => ({
    state: {
        employed: null,
        foundViaMM: null,
        hasLawyer: null,
        flowCompletedEmployed: false,
        flowCompletedUnemployed: false,
        downsell_variant: null,
        reason: null,
        downsell_accepted: false,

        user: null,
        subscription: null,
        cancellation: null
    },
    setState: (newState) => {
        const merged = { ...useCancelFlowStore.getState().state, ...newState };
        CancelFlowSchema.parse(merged);
        set({ state: merged });
    },
}));