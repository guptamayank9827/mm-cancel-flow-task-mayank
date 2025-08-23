import { create } from "zustand";
import { z } from "zod";

export const CancelFlowSchema = z.object({
    employed: z.enum(["yes", "no"]).nullable().default(null),
    foundViaMM: z.enum(["yes", "no"]).nullable().default(null),
    hasLawyer: z.enum(["yes", "no"]).nullable().default(null),
    flowCompletedEmployed: z.boolean().default(false)
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
        flowCompletedEmployed: false
    },
    setState: (newState) => {
        const merged = { ...useCancelFlowStore.getState().state, ...newState };
        CancelFlowSchema.parse(merged);
        set({ state: merged });
    },
}));