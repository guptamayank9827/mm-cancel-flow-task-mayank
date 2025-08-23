'use client';

import Title from "@/components/Title";

type UnemployedUserStep1Props = {
    downSellVariant: string|null;
    onSubmit: () => void;
    onAccept: () => void;
};

export default function UnemployedUserStep1(props:UnemployedUserStep1Props) {

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

            <div className="bg-purple-100 border border-purple-300 rounded-xl p-3 mb-3 md:text-center">
                <div className="text-3xl md:text-xl font-semibold mb-1 text-black">
                    Here&apos;s $10 off until you find a job.
                </div>
                <div className="flex items-center md:justify-center gap-4 mb-2">
                    <div className="text-lg font-bold text-purple-500">
                        15/month
                    </div>
                    <div className="text-black line-through">
                        25/month
                    </div>
                </div>
                <button
                    className="w-full rounded-lg px-4 py-3 text-sm font-medium bg-[#43c463] text-white hover:bg-[#36a94e] transition-colors mb-2"
                    onClick={handleOffer}
                >
                    Get $10 off
                </button>
                <div className="text-[10px] md:text-xs text-center text-black italic">
                    You won&apos;t be charged until your next billing date.
                </div>
            </div>

            <hr className="md:hidden mt-2 mb-2 border-gray-200" />

            <div className="mt-5">
                <button
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-2 text-gray-700 font-semibold bg-white hover:bg-gray-100 transition"
                    onClick={moveToNextStep}
                >
                    No thanks
                </button>
            </div>

        </div>
    );
}