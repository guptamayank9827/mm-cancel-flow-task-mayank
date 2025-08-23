"use client";

import ProgressBar from "@/components/ProgressBar";
import BackIcon from "@/components/icons/BackIcon";
import CloseIcon from "@/components/icons/CloseIcon";


type HeaderProps = {
    step: number;
    totalSteps: number;
    onClose: () => void;
    onBack: () => void;
};

export default function Header(props:HeaderProps) {
    const title = `Subscription ${props.step === props.totalSteps ? 'Cancelled':'Cancellation'}`;

    const handleClose = () => {
        props.onClose();
    };

    const handleBack = () => {
        props.onBack();
    };

    return (
        <div className="py-4 border-b border-gray-200">
            <div className="flex items-center">

                {props.step >= 0 && props.step < props.totalSteps &&
                    <button
                        onClick={handleBack}
                        className="hidden sm:inline-flex items-center justify-center ml-2 text-sm rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
                        aria-label="Back to jobs"
                    >
                        <BackIcon className="h-4 mr-1" />
                        Back
                    </button>
                }

                <div className="text-lg text-gray-700 flex flex-wrap flex-1 justify-start md:justify-center ml-4 md:ml-0">
                    <span className="inline">{title}</span>

                    {props.step >= 0 &&
                        <ProgressBar
                            step={props.step}
                            totalSteps={props.totalSteps}
                            classname="md:ml-8"
                        />
                    }
                </div>

                <div className="flex space-x-3 mr-2">           
                    <button
                        aria-label='close'
                        onClick={handleClose}
                        className="text-gray-700 hover:bg-gray-50"
                    >
                        <CloseIcon className="cursor-pointer" />
                    </button>
                </div>
            </div>
        </div>
    );
}