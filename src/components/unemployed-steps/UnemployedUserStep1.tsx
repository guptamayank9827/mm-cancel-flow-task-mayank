'use client';

import Title from "@/components/Title";
import { useCancelFlowStore } from "@/store/CancelFlow";

type UnemployedUserStep1Props = {
    downSellVariant: string|null;
    monthlyPricing: number;
    onSubmit: () => void;
    onAccept: () => void;
};

export default function UnemployedUserStep1(props:UnemployedUserStep1Props) {
    const { state } = useCancelFlowStore();

    const discount = 10;
    const currentPricing = (state.subscription?.monthly_price ?? 2500) / 100;
    const downsellPricing = props.downSellVariant === "B" ? currentPricing - discount : currentPricing;


    const moveToNextStep = () => {
        props.onSubmit();
    }

    const handleOffer = () => {
        props.onAccept();
    };

    return(
        <div className="flex flex-col">

            <Title
                title={`We built this to help you land the job, this makes it a little easier.`}
                subtitle={`We've been there and we&apos;re here to help you`}
            />

            <hr className="md:hidden mt-2 mb-2 border-gray-200" />

            {props.downSellVariant === "B" &&
                <div className="bg-purple-100 border border-purple-300 rounded-xl p-3 mb-3 md:text-center">
                    <div className="text-3xl md:text-xl font-semibold mb-1 text-black">
                        Here&apos;s ${discount} off until you find a job.
                    </div>
                    <div className="flex items-center md:justify-center gap-4 mb-2">
                        <div className="text-2xl font-bold text-purple-500">
                            ${downsellPricing}/month
                        </div>
                        <div className="text-black line-through">
                            ${currentPricing}/month
                        </div>
                    </div>
                    <button
                        className="w-full rounded-lg px-4 py-3 text-sm font-medium bg-[#43c463] text-white hover:bg-[#36a94e] transition-colors mb-2"
                        onClick={handleOffer}
                    >
                        Get ${discount} off
                    </button>
                    <div className="text-[10px] md:text-xs text-center text-black italic">
                        You won&apos;t be charged until your next billing date.
                    </div>
                </div>
            }

            <hr className="md:hidden mt-2 mb-2 border-gray-200" />

            <div className="mt-5">
                <button
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-2 text-xl text-gray-700 font-semibold bg-white hover:bg-gray-100 transition"
                    onClick={moveToNextStep}
                >
                    No thanks
                </button>
            </div>

        </div>
    );
}