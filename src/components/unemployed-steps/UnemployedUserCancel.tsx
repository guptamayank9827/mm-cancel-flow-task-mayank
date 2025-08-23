'use client';

import UnemployedUserStep1 from "@/components/unemployed-steps/UnemployedUserStep1";
import UnemployedUserStep2 from "@/components/unemployed-steps/UnemployedUserStep2";
import UnemployedUserStep3 from "@/components/unemployed-steps/UnemployedUserStep3";
import UnemployedUserSuccess from "@/components/unemployed-steps/UnemployedUserSuccess";

import SkylineImage from '@/components/images/SkylineImage';
import BackIcon from "@/components/icons/BackIcon";


type UnemployedUserCancelProps = {
    step: number;
    totalSteps: number;
    downSellVariant: string|null;
    downSellAccepted: boolean;
    onBack: () => void;
    onSubmit: () => void;
    onAccept: () => void;
};

export default function UnemployedUserCancel(props:UnemployedUserCancelProps) {

    const getCurrentStep = () => {
        switch (props.step) {
            case 0:
                return (<UnemployedUserStep1 downSellVariant={props.downSellVariant} onSubmit={() => props.onSubmit()} onAccept={() => props.onAccept()} />);

            case 1:
                return (<UnemployedUserStep2 downSellVariant={props.downSellVariant} onSubmit={() => props.onSubmit()} onAccept={() => props.onAccept()} />);

            case 2:
                return (<UnemployedUserStep3 onSubmit={() => props.onSubmit()} />);

            case 3:
                return (<UnemployedUserSuccess downSellAccepted={props.downSellAccepted} />);
        }
    };

    return(
        <>

            <button
                onClick={props.onBack}
                className="inline-flex md:hidden mt-2 items-center justify-center ml-2 text-sm rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
                aria-label="Back to jobs"
            >
                <BackIcon className="h-4 mr-1" />
                Back
            </button>

            <div className="grid gap-6 p-4 md:grid-cols-2 md:gap-8 md:p-3">
                {getCurrentStep()}
                <SkylineImage />
            </div>
        </>
    );
}

