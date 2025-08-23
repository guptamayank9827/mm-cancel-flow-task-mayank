"use client";

import SkylineImage from '@/components/images/SkylineImage';
import Title from '@/components/Title';

type StartCancelProps = {
    onJobChange: (jobStatus: boolean|null) => void;
    onClose: () => void;
};


export default function StartCancel(props:StartCancelProps) {

    const handleJobChange = (choice:boolean) => {
        props.onJobChange(choice);
    };

    return (
        <div className="grid gap-6 p-4 md:grid-cols-[3fr_2fr] md:gap-8 md:p-3">
            <div className="flex flex-col order-2 md:order-1">

                <Title
                    title={`
                        Hey mate,
                        <br />
                        <span className="block">Quick one before you go.</span>
                        <i>Have you found a job yet?</i>
                    `}
                    subtitle={`
                        Whatever your answer, we just want to help you take the next step.
                        With visa support, or by hearing how we can do better.
                    `}
                />

                <div className="mt-2 space-y-3">
                    <hr className="my-6 border-gray-200" />

                    <button
                        onClick={() => handleJobChange(true)}
                        className="w-full text-mid rounded-lg border border-gray-400 bg-white px-4 py-3 text-sm text-gray-900 cursor-pointer hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8952fc]/20 focus:border-[#8952fc]"
                    >
                        Yes, I&apos;ve found a job
                    </button>
                    <button
                        onClick={() => handleJobChange(false)}
                        className="w-full text-mid rounded-lg border border-gray-400 bg-white px-4 py-3 text-sm text-gray-900 cursor-pointer hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8952fc]/20 focus:border-[#8952fc]"
                    >
                        Not yet - I&apos;m still looking
                    </button>
                </div>
            </div>

            <SkylineImage
                classes="relative h-50 md:h-auto rounded-lg overflow-hidden order-1 md:order-2"
            />
        </div>
    );
}