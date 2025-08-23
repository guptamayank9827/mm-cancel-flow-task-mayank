'use client';

import EmployedUserStep1 from '@/components/employed-steps/EmployedUserStep1';
import EmployedUserStep2 from '@/components/employed-steps/EmployedUserStep2';
import EmployedUserStep3 from '@/components/employed-steps/EmployedUserStep3';
import EmployedUserSuccess from '@/components/employed-steps/EmployedUserSuccess';

import SkylineImage from '@/components/images/SkylineImage';
import BackIcon from "@/components/icons/BackIcon";


type EmployedUserCancelProps = {
    step: number;
    totalSteps: number;
    onBack: () => void;
    onSubmit: () => void;
};

export default function EmployedUserCancel(props:EmployedUserCancelProps) {

    const getEmployedStep = () => {
        switch (props.step) {
            case 0:
                return (<EmployedUserStep1 onSubmit={() => props.onSubmit()} />);

            case 1:
                return (<EmployedUserStep2 onSubmit={() => props.onSubmit()} />);

            case 2:
                return (<EmployedUserStep3 onSubmit={() => props.onSubmit()} />);

            case 3:
                return (<EmployedUserSuccess />);
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
                {getEmployedStep()}
                <SkylineImage />
            </div>
        </>
    );
}

